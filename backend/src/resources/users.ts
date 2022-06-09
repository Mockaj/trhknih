import { Request, Response } from "express";
import prisma from "../client";
import { httpStatusCode } from "./httpStatusCodes";
import { object, string, ValidationError } from "yup";

const bcrypt = require('bcrypt');
const saltRounds = 10;

export const list = async (req: Request, res: Response) => {
  try {
    const username = req.query["username"]?.toString().trim();
    const email = req.query["email"]?.toString().trim();

    const users = await prisma.user.findMany({
      select: {
        username: true,
        email: true,
      },
    }).then(users => users.filter(user => 
      (username == undefined || username === user.username) &&
      (email == undefined || email === user.email)
    ));

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: users,
      message: `Found ${users.length} items`,
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
    const userId = req.params["id"] || "";
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
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
                    username: true,
                    email: true,
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
                customer: true,
                address: true,
              },
            },
          },
        },
      }
    });

    if (user == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: `No user found with id = '${userId}'.`,
      });
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
  username: string().required(),
  email: string().email().required(),
  password: string().required().min(3).max(30),
  name: string().default(""),
});

export const add = async (req: Request, res: Response) => {
  try {
    var data = await requestSchema.validate(req.body);
    var existing = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (existing != null) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: {},
        message: "Username already used.",
      });
    }

    existing = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existing != null) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: {},
        message: "Email already used.",
      });
    }

    const password = data.password;
    data = {...data, password: bcrypt.hashSync(password, saltRounds)};

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
  username: string().required(),
  email: string().required(),
});

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.params["id"] || "";
    const data = updateSchema.validate(req.body);
    const updated = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: updated,
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

const changePasswordSchema = object({
  password: string().required().min(3).max(30),
  newPassword: string().required().min(3).max(30),
});

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.params["id"] || "";
    const data = await changePasswordSchema.validate(req.body);
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

    if (!bcrypt.compareSync(data.password, existing.password)) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: {},
        message: "Wrong password.",
      });
    }

    const updated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: bcrypt.hashSync(data.password, saltRounds),
      },
      select: {
        username: true,
        email: true,
        id: true,
      },
    });

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: updated,
      message: "Password changed.",
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

const loginSchema = object({
  password: string().required().min(3).max(30),
  login: string().required(),
});

export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginSchema.validate(req.body);

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: data.login,
            },
          },
          {
            email: {
              equals: data.login,
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      }
    });

    if (user == null) {
      return res.status(httpStatusCode.notFound).send({
        status: "not found",
        data: {},
        message: "Wrong login.",
      });
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      return res.status(httpStatusCode.badRequest).send({
        status: "bad request",
        data: {},
        message: "Wrong password.",
      });
    }

    return res.status(httpStatusCode.ok).send({
      status: "success",
      data: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      message: "User logged in",
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