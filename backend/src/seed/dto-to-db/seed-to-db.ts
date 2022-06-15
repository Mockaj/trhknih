import prisma from "../../client";
import { Result } from "@badrap/result";
import type SeedFileStructure from "../../types/data-transfer-objects";


const seedDb = async (
  yamlParsed: SeedFileStructure
): Promise<Result<boolean>> => {
  try {
    await prisma.$transaction([
      ...yamlParsed.tags.map((tag) => {
        return prisma.tag.create({
          data: {
            ...tag,
          },
        });
      }),

      ...yamlParsed.authors.map((author) => {
        return prisma.author.create({
          data: {
            ...author,
          },
        });
      }),
      
      ...yamlParsed.publishers.map((publisher) => {
        return prisma.publisher.create({
          data: {
            ...publisher,
          },
        });
      }),
      
      ...yamlParsed.books.map((book) => {
        return prisma.book.create({
          data: {
            id: book.id,
            isbn: book.isbn,
            title: book.title,
            subtitle: book.subtitle ?? null,
            numberOfPages: book.numberOfPages,
            publishedDate: book.publishedDate,
            notes: book.notes ?? null,
            photo: book.photo,
            publisher: {
              connect: {
                id: book.publisherId,
              },
            },
          },
        });
      }),

      ...yamlParsed.bookAuthors.map((bookAuthor) => {
        return prisma.bookAuthor.create({
          data: {
            book: {
              connect: {
                id: bookAuthor.bookId,
              },
            },
            author: {
              connect: {
                id: bookAuthor.authorId,
              },
            },
          },
        });
      }),

      ...yamlParsed.users.map((user) => {
        return prisma.user.create({
          data: {
            id: user.id,
          },
        });
      }),

      ...yamlParsed.offers.map((offer) => {
        return prisma.offer.create({
          data: {
            id: offer.id,
            price: offer.price,
            bookCondition: offer.bookCondition,
            createTime: new Date(offer.createTime),
            seller: {
              connect: {
                id: offer.sellerId,
              },
            },
            book: {
              connect: {
                id: offer.bookId,
              },
            },
            tags: {
              connect: offer.tags.map((tag) => {
                return {
                  id: tag.tagId,
                }
              }),
            },
          },
        });
      }),

      ...yamlParsed.addresses.map((address) => {
        return prisma.address.create({
          data: {
            ...address,
          },
        });
      }),

      ...yamlParsed.orders.map((order) => {
        return prisma.order.create({
          data: {
            customer: {
              connect: {
                id: order.customerId,
              },
            },
            offer: {
              connect: {
                id: order.offerId,
              },
            },
            address: {
              connect: {
                id: order.addressId,
              },
            },
            phoneNumber: order.phoneNumber,
            createTime: new Date(order.createTime),
            sent: order.sent ?? false,
            finished: order.finished ?? false,
          },
        });
      }),
    ]);
    
    return Result.ok(true);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default seedDb;