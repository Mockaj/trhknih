import { Request, Response } from "express";
import prisma from "../client";
import { httpStatusCode } from "./httpStatusCodes";
import { object, string, ValidationError } from "yup";
import axios from "axios";


export const show = async (req: Request, res: Response) => {
  try {
    const userId = req.params["id"] || "";
    const token = await axios.post(
      'https://readee.eu.auth0.com/oauth/token',
      {
        "client_id":"TfztdIfzI3dFBSfANqZrmZx1Stt1D7hZ",
        "client_secret":"YijV4Ra40dtFpawUo5SwGyao4_zq1hEZNdMXXSk1x0gd4ZtDl70IfeWbhQtLw9C7",
        "audience":"https://readee.eu.auth0.com/api/v2/",
        "grant_type":"client_credentials"
      },
      {headers: { 'content-type': 'application/json' }}
      );
    const response = await axios.get(`https://readee.eu.auth0.com/api/v2/users/${userId}`,
    {headers: { "authorization": `Bearer ${token.data.access_token}` }}
    );
    if (response.status == 404) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `No user found with id = '${userId}'.`,
      });
    }
    if (response.status != 200) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `Internal server error.`,
      });
    }
    const responseData = response.data;
    const serverData = {
      id: responseData.user_id,
      username: responseData.username,
      email: responseData.email,
    }
    
    const userPrisma = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        orders: {
          include: {
            address: true,
            offer: {
              include: {
                book: {
                  include: {
                    publisher: true,
                    fromAutors: {
                      include: {
                        author: true,
                      },
                    },
                  },
                },
                tags: true,
                seller: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          }
        },
        offers: {
          include: {
            book: {
              include: {
                publisher: true,
                fromAutors: {
                  include: {
                    author: true,
                  },
                },
              },
            },
            tags: true,
            order: {
              include: {
                customer: {
                  select: {
                    id: true,
                  }
                },
                address: true,
              },
            },
          },
        },
      }
    });
    const user = {
      auth: serverData,
      data: userPrisma
    }
    

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: user,
      message: "User successfully found.",
    });
  } catch (error) {
    return res.status(httpStatusCode.serverError).send({
      status: "error",
      data: {},
      message: "Something went wrong.",
    });
  }
};

const requestSchema = object({
  id: string().required(),
});

export const add = async (req: Request, res: Response) => {
  try {
    var data = await requestSchema.validate(req.body);
    var existing = await prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });

    if (existing != null) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: {},
        message: "User already exist.",
      });
    }

    const user = await prisma.user.create({
      data
    });

    return res.status(httpStatusCode.created).send({
      status: "success",
      data: user,
      message: "User created.",
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
      data: {},
      message: "Something went wrong.",
    });
  }
};

const updateSchema = object({
  username: string(),
  email: string(),
  password: string().min(3).max(30)
});

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.params["id"] || "";
    const data = await updateSchema.validate(req.body);
    const existing = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (existing == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `User with id: ${userId} does not exist.`,
      });
    }

    const token = await axios.post(
      'https://readee.eu.auth0.com/oauth/token',
      {
        "client_id":"TfztdIfzI3dFBSfANqZrmZx1Stt1D7hZ",
        "client_secret":"YijV4Ra40dtFpawUo5SwGyao4_zq1hEZNdMXXSk1x0gd4ZtDl70IfeWbhQtLw9C7",
        "audience":"https://readee.eu.auth0.com/api/v2/",
        "grant_type":"client_credentials"
      },
      {headers: { 'content-type': 'application/json' }}
      );
    
    const updated = await axios.patch(`https://readee.eu.auth0.com/api/v2/users/${userId}`,
    {
      password: data.password,
      username: data.username,
      email: data.email
    },
    {headers: { "authorization": `Bearer ${token.data.access_token}` }}
    );

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: updated.data,
      message: "User updated",
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
      data: {},
      message: "Something went wrong.",
    });
  }
};
