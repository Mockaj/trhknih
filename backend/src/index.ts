import express, { Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { offers, orders, tags, users } from "./resources";
import { httpStatusCode } from "./resources/httpStatusCodes";

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(function(_: Request, res: Response, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

api.use(express.static("public"));

const checkJwt = auth({
  audience: "https://readee.com/api",
  issuer: "https://readee.eu.auth0.com/",
  jwksUri: "https://readee.eu.auth0.com/.well-known/jwks.json",
});

api.get("/", (_: Request, res: Response) => res.status(httpStatusCode.ok).send({
  status: "success",
  data: {},
  message: "Welcome to Readee API, you must be authorized to access the rest of our API.",
}));

api.get("/api/offers", offers.list);
api.get("/api/offers/:id", offers.show);
api.get("/api/tags", tags.list);

api.use(checkJwt);

// Resource users
api.get("/api/users", users.list);
api.get("/api/users/:id", users.show);
api.post("/api/users", users.add);
api.post("/api/login", users.login);
api.put("/api/users/:id", users.update);
api.put("/api/changePassword/:id", users.changePassword);

// Resource offers
api.post("/api/offers", offers.add);
api.put("/api/offers/:id", offers.update);
api.delete("/api/offers/:id", offers.remove);

// Resource orders
api.get("/api/orders", orders.list);
api.get("/api/orders/:id", orders.show);
api.post("/api/orders", orders.add);
api.put("/api/orders/:id", orders.update);
api.delete("/api/orders/:id", orders.remove);

api.listen(process.env["PORT"], () => console.log(`API listening on port ${process.env["PORT"]}`));