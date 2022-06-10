import { Request, Response } from "express";
import prisma from "../client";
import { httpStatusCode } from "./httpStatusCodes";

export const list = async (_: Request, res: Response)  => {
  try {
    var tags = await prisma.tag.findMany({
      include: {
        Offers: {
          include: {
            order: true,
          },
        },
      }
    });

    tags = tags.filter(x => x.Offers?.length > 0).filter(x => x.Offers.map(o => o.order == null).reduce((a, b) => a || b));

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: tags.map(x => x.name),
      message: `Found ${tags.length} items`,
    });
  } catch (error) {
    return res.status(httpStatusCode.serverError).send({
      status: "error",
      data: {},
      message: "Something went wrong.",
    });
  }
};