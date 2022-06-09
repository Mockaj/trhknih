import { Request, Response } from "express";
import prisma from "../client";
import { httpStatusCode } from "./httpStatusCodes";

export const list = async (_: Request, res: Response)  => {
  try {
    var tags = await prisma.tag.findMany({
      include: {
        Offers: true,
      }
    });

    tags = tags.filter(x => x.Offers?.length > 0);

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