const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const resolve = require("./graphql/resolve");
const schema = require("./graphql/schema");
const mongoose = require("mongoose");
const userSchema = require("./graphql/userSchema");
const userResolve = require("./graphql/userResolve");
const jwt = require("jsonwebtoken");

const DB_URL =
  "mongodb+srv://Nivesh:m23T0N7D3iouwfgb@cluster0.y3svk.mongodb.net/Todos?retryWrites=true&w=majority";

const app = express();

app.use(
  "/user",
  graphqlHTTP({
    schema: userSchema,
    rootValue: userResolve,
    graphiql: true,
  })
);


app.use(
  "/todo",
  authentication,
  graphqlHTTP({
    schema: schema,
    rootValue: resolve,
    graphiql: true,
  })
);

function authentication(req, res, next) {
  const authHeader = req.headers["authentication"];
  console.log("Auth Header " + authHeader);
  if (typeof authHeader === "undefined") {
    res.sendStatus(401);
    return;
  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    console.log(user);

    req.user = user;
    // res.sendStatus(201);
    next();
  });
}

mongoose
  .connect(DB_URL)
  .then((res) => {
    app.listen(8000, () => {
      console.log("server started on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
