import type { Request, Response } from "express";
import { object, ValidationError, array, string, number, date } from "yup";
import prisma from "../client";
import { queryHelper } from "../helpers";
import { httpStatusCode } from "./httpStatusCodes";
import { Author, Offer } from "@prisma/client";

export const list = async (req: Request, res: Response) => {
  try {
    const bestsellers = queryHelper.parseBooleanQuery(req.query["bestsellers"]?.toString());
    if (bestsellers == null) {
      return res.status(httpStatusCode.badRequest).send({
        status: "error",
        data: {},
        message: "Query parameter 'bestsellers' has not valid format.",
      });
    }

    const freeBooks = queryHelper.parseBooleanQuery(req.query["freeBooks"]?.toString());
    if (freeBooks == null) {
      return res.status(httpStatusCode.badRequest).send({
        status: "error",
        data: {},
        message: "Query parameter 'freeBooks' has not valid format.",
      });
    }

    const newlyAdded = queryHelper.parseBooleanQuery(req.query["newlyAdded"]?.toString());
    if (newlyAdded == null) {
      return res.status(httpStatusCode.badRequest).send({
        status: "error",
        data: {},
        message: "Query parameter 'newlyAdded' has not valid format.",
      });
    }

    const tags: string[] | undefined = req.query["tags"] == undefined ? undefined : JSON.parse(JSON.stringify(req.query["tags"]));
    const isbn = req.query["isbn"]?.toString().trim();
    const author = req.query["author"]?.toString().trim();
    const bookName = req.query["bookName"]?.toString().trim();
    const page = +(req.query["page"]?.toString().trim() || 1);

    var offers = await prisma.offer.findMany({
      where: {
        order: null,
      },
      include: {
        seller: {
          select: {
            username: true,
            email: true,
          },
        },
        book: {
          include: {
            publisher: true,
            fromAutors: {
              include: {
                author: true,
              }
            },
            offered: {
              include: {
                order: true,
              },
            },
          }
        },
        tags: true,
      },
    });

    if (tags != undefined && tags.length > 0) {
      offers = offers.filter(offer => {
        var included = false;
        for (let i = 0; i < offer.tags.length; i++) {
          const element = offer.tags[i];
          if (element != undefined && tags.includes(element.name)) {
            return true;
          }
        }
        return included;
      });
    }

    if (isbn || author || bookName) {
      offers = offers.filter(offer =>
        (isbn && offer.book.isbn.toLowerCase().includes(isbn.toLowerCase())) ||
        (author && offer.book.fromAutors.map(x => x.author.name.toLowerCase().includes(author.toLowerCase())).reduce((a, b) => a || b)) ||
        (bookName && offer.book.title.toLowerCase().includes(bookName.toLowerCase())));
    } 
    if (bestsellers) {
      offers = offers.sort((a, b) => {
        const offerDiff = a.book.offered.filter(x => x.order).length - b.book.offered.filter(x => x.order).length;
        if (offerDiff > -5 && offerDiff < 5) {
          return a.price - b.price;
        } else if (offerDiff > 0) {
          return -1;
        } else if (offerDiff < 0) {
          return 1;
        }
        return a.price - b.price;
      });
    } else if (freeBooks) {
      offers = offers.filter(offer => offer.price == 0);
    } else if (newlyAdded) {
      offers.sort((a, b) => {
        if (a.createTime > b.createTime) {
          return -1;
        } else if (a.createTime < b.createTime) {
          return 1;
        }
        return 0;
      });
    }

    const pages = Math.ceil(offers.length / 50);
    if (page > 0) {
      offers = offers.slice((page - 1) * 50, page * 50);
    }

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: {
        offers: offers,
        pages: pages,
        currentPage: page,
      },
      message: `Found ${offers.length} items`,
    });
  } catch (error) {
    return res.status(httpStatusCode.serverError).send({
      data: {},
      status: "server error",
      message: "Something went wrong.",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const offerId = req.params["id"] || "";
    const offer = await prisma.offer.findFirst({
      where: {
        id: offerId,
      },
      include: {
        seller: true,
        book: {
          include: {
            fromAutors: {
              include: {
                author: true,
              },
            },
            publisher: true,
          },
        },
        tags: true,
        order: true,
      }
    });

    if (offer == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `No offer found with id = '${offerId}'.`,
      });
    }

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: offer,
      message: "Offer successfully found.",
    });
  } catch (error) {
    return res.status(httpStatusCode.serverError).send({
      data: {},
      status: "server error",
      message: "Something went wrong.",
    });
  }
};

const requestSchema = array().of(
  object({
    book: object({
      authors: array().of(
        object({
          name: string().required(),
        }),
      ).required(),
      cover: object({
        large: string(),
        medium: string().required(),
        small: string(),
      }).required(),
      key: string(),
      notes: string().default(""),
      number_of_pages: number().required(),
      publish_date: string().required(),
      publish_places: array().of(
        object({
          name: string().required(),
        })
      ),
      publishers: array().of(
        object({
          name: string().required(),
        })
      ).required(),
      subjects: array().of(
        object({
          name: string().required(),
        }),
      ).required(),
      subtitle: string(),
      title: string().required(),
      url: string(),
    }).required(),
    price: number().required().min(0),
    bookCondition: string(),
    userId: string().required().uuid(),
    created: date().default(new Date()),
    isbn: string().required(),
  }),
).required();

export const add = async (req: Request, res: Response) => {
  try {
    const data = await requestSchema.validate(req.body);
    const offers: Offer[] = [];

    for (var i = 0; i < data.length; i++) {
      const item = data[0];
      if (item != undefined) {
        var existingBook = await prisma.book.findFirst({
          where: {
            isbn: item.isbn,
          },
        });

        if (existingBook == null) {
          if (item.book.publishers[0]) {
            var existingPublisher = await prisma.publisher.findFirst({
              where: {
                name: item.book.publishers[0].name,
              }
            });

            if (existingPublisher == null) {
              existingPublisher = await prisma.publisher.create({
                data: {
                  name: item.book.publishers[0].name,
                },
              });
            }

            var authors: Author[] = [];
            for (var j = 0; j < item.book.authors.length; j++) {
              const author = item.book.authors[j];
              if (author != undefined) {
                var existingAuthor = await prisma.author.findFirst({
                  where: {
                    name: author.name,
                  },
                });
                if (existingAuthor == null) {
                  existingAuthor = await prisma.author.create({
                    data: {
                      name: author.name,
                    },
                  });
                }
                authors.push(existingAuthor);
              }
            }

            existingBook = await prisma.book.create({
              data: {
                isbn: item.isbn,
                title: item.book.title,
                subtitle: item.book.subtitle || null,
                numberOfPages: item.book.number_of_pages,
                publishedDate: item.book.publish_date,
                notes: item.book.notes,
                photo: item.book.cover.medium,
                publisherId: existingPublisher.id,
                fromAutors: {
                  createMany: {
                    data: authors.map(x => ({ bookId: existingBook?.id, authorId: x.id })),
                  },
                },
              },
            });

            if (existingBook == null) {
              return res.status(httpStatusCode.serverError).send({
                status: "error",
                data: [],
                message: "Something went wrong.",
              });
            }
          }
        }

        const tags = item.book.subjects.map(x => x.name);
        var existingTags = await prisma.tag.findMany({
          where: {
            name: {
              in: tags,
            },
          },
        });

        const tagsToCreate = tags.filter(x => !existingTags.map(t => t.name).includes(x));
        await prisma.tag.createMany({
          data: tagsToCreate.map(x => ({
            name: x,
          })),
        });
        existingTags = await prisma.tag.findMany({
          where: {
            name: {
              in: tags,
            },
          },
        });

        const offer = await prisma.offer.create({
          data: {
            createTime: item.created,
            bookCondition: item.bookCondition || "",
            bookId: existingBook!.id,
            price: item.price,
            sellerId: item.userId,
            tags: {
              connect: existingTags,
            }
          },
          include: {
            tags: true,
            seller: {
              select: {
                username: true,
                email: true,
              },
            },
            book: {
              include: {
                fromAutors: {
                  include: {
                    author: true,
                  },
                },
                publisher: true,
              },
            },
          },
        });
        offers.push(offer);
      }
    }

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: offers,
      message: `Successfully created ${offers.length} offers.`,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: error.errors,
        message: error.message,
      });
    }

    return res.status(httpStatusCode.serverError).send({
      status: "error",
      data: error,
      message: "Something went wrong.",
    });
  }
};

const updateSchema = object({
  price: number().required(),
  bookCondition: string().required(),
});

export const update = async (req: Request, res: Response) => {
  try {
    const offerId = req.params["id"] || "";
    const data = await updateSchema.validate(req.body);

    const existing = await prisma.offer.findUnique({
      where: {
        id: offerId,
      },
    });

    if (existing == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `Offer with id: ${offerId} does not exist.`,
      });
    }

    const updated = await prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        price: data.price,
        bookCondition: data.bookCondition,
      },
    });

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: updated,
      message: "Offer updated.",
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: error.errors,
        message: error.message,
      });
    }

    return res.status(httpStatusCode.serverError).send({
      status: "error",
      data: error,
      message: "Something went wrong.",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const offerId = req.params["id"] || "";

    const offer = await prisma.offer.findUnique({
      where: {
        id: offerId,
      },
      include: {
        order: true,
      },
    });

    if (offer == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `Offer with id ${offerId} does not exist.`,
      });
    }

    if (offer.order != null) {
      if (offer.order.sent) {
        return res.status(httpStatusCode.badRequest).send({
          status: "bad request",
          data: {},
          message: "Cannot delete offer if the book is on its way.",
        });
      }

      await prisma.order.delete({
        where: {
          id: offer.order.id,
        },
      });
    }

    const deleted = await prisma.offer.delete({
      where: {
        id: offerId,
      },
    });

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: deleted,
      message: "Offer deleted.",
    });
  } catch (error) {
    return res.status(httpStatusCode.serverError).send({
      status: "error",
      data: error,
      message: "Something went wrong.",
    });
  }
};