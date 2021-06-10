const makeDb = require("../db");
const makePessoaList = require("./pessoa-list");
const makePessoaEndpointHandler = require("./pessoa-endpoint");

const database = makeDb();
const pessoaList = makePessoaList({
  database,
});
const contactsEndpointHandler = makePessoaEndpointHandler({
  pessoaList,
});

module.exports = contactsEndpointHandler;
