import { Order } from "@prisma/client";
import { Request, Response } from "express";
import { array, boolean, date, object, string, ValidationError } from "yup";
import prisma from "../client";
import { httpStatusCode } from "./httpStatusCodes";

export const list = async (req: Request, res: Response) => {
  try {
    const customerId = req.query["customerId"]?.toString().trim();

    const orders = await prisma.order
      .findMany({
        include: {
          customer: {
            select: {
              id: true,
            },
          },
          address: true,
          offer: {
            include: {
              seller: {
                select: {
                  id: true,
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
              tags: true,
            },
          },
        },
      })
      .then((orders) =>
        orders.filter(
          (x) => customerId == undefined || customerId === x.customerId
        )
      );

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: orders,
      message: `Found ${orders.length} items`,
    });
  } catch (error) {
    return res.status(httpStatusCode.serverError).send({
      status: "error",
      data: {},
      message: "Something went wrong.",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const orderId = req.params["id"] || "";

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        customer: {
          select: {
            id: true,
          },
        },
        address: true,
        offer: {
          include: {
            seller: {
              select: {
                id: true,
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
            tags: true,
          },
        },
      },
    });

    if (order == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `No order found with id = '${orderId}'.`,
      });
    }

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: order,
      message: "Order successfully found.",
    });
  } catch (error) {
    return res.status(httpStatusCode.serverError).send({
      status: "error",
      data: {},
      message: "Something went wrong.",
    });
  }
};

const requestSchema = array().of(object({
  phoneNumber: string().required(),
  created: date().default(new Date()),
  finished: boolean().default(false),
  offerId: string().required().uuid(),
  customerId: string().required(),
  address: object({
    firstName: string().required(),
    lastName: string().required(),
    street: string().default(""),
    houseNumber: string().required(),
    city: string().required(),
    postalCode: string().required(),
  }).required(),
})).required();

export const add = async (req: Request, res: Response) => {
  try {
    const data = await requestSchema.validate(req.body);
    const orders: Order[] = [];

    for (var i = 0; i < data.length; i++) {
      const item = data[i];

      if (item) {
        var address = await prisma.address.findFirst({
          where: item.address,
        });

        if (address == null) {
          address = await prisma.address.create({
            data: item.address,
          });

          if (address == null) {
            return res.status(httpStatusCode.serverError).send({
              status: "error",
              data: [],
              message: "Something went wrong",
            });
          }
        }
        console.log({data: {
          phoneNumber: item.phoneNumber,
          createTime: item.created,
          finished: item.finished,
          addressId: address.id,
          offerId: item.offerId,
          customerId: item.customerId,
        }})
        const order = await prisma.order.create({
          data: {
            phoneNumber: item.phoneNumber,
            createTime: item.created,
            finished: item.finished,
            addressId: address.id,
            offerId: item.offerId,
            customerId: item.customerId,
          },

          include: {
            customer: {
              select: {
                id: true,
              },
            },
            offer: {
              include: {
                seller: {
                  select: {
                    id: true,
                  }
                },
                tags: true,
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
            },
            address: true,
          },
        });
        orders.push(order);
      }
    }
    return res.status(httpStatusCode.created).send({
      status: "success",
      data: orders,
      message: `Successfully created ${orders.length} orders.`,
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
  sent: boolean(),
  finished: boolean(),
});
export const update = async (req: Request, res: Response) => {
  try {
    const orderId = req.params["id"] || "";
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `Order with id ${orderId} does not exist.`,
      });
    }

    const data = await updateSchema.validate(req.body);

    if (!order.sent && data.finished) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: {},
        message: "Order cannot be finished before the book was sent.",
      });
    }

    const updated = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        sent: data.sent ?? order.sent,
        finished: data.finished ?? order.finished,
      },
      include: {
        address: true,
      },
    });

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: updated,
      message: "Order updated.",
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
    const orderId = req.params["id"] || "";

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        offer: true,
      },
    });

    if (order == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `No order found with id = '${orderId}'.`,
      });
    }

    if (order.finished) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: {},
        message: "Cannot delete finished order.",
      });
    }

    const deleted = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: deleted,
      message: "Order deleted.",
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
