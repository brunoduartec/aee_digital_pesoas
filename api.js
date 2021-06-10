const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const handlePessoaRequest = require("./pessoas");

const adaptRequest = require("./helpers/adapt-request");
const app = express();
app.options("*", cors()); // include before other routes

const Connection = require("./db/connection")();

app.use((req, res, next) => {
  console.log("Acessou o Middleware!");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  app.use(cors());
  next();
});

app.use(bodyParser.json());

app.use("/api/v1/healthcheck", require("./healthcheck"));

app.get("/", function (req, res) {
  const package = require("./package.json");
  const versionInfo = {
    name: package.name,
    version: package.version,
    description: package.description,
  };
  res.json(versionInfo);
});

app.all("/api/v1/pessoas", pessoasController);
app.use("/api/v1/pessoas/:id", pessoasController);

function pessoasController(req, res) {
  const httpRequest = adaptRequest(req);
  handlePessoaRequest(httpRequest)
    .then(({ headers, statusCode, data }) => {
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).end();
    });
}

module.exports = function () {
  return app;
};
