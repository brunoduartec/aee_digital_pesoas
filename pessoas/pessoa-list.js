const makePessoa = require("./pessoa");
const { UniqueConstraintError } = require("../helpers/errors");

module.exports = function makePessoaList({ database }) {
  return Object.freeze({
    add,
    findByItems,
    getItems,
    remove,
    replace,
    update,
  });

  async function add(pessoaInfo) {
    let pessoa = makePessoa(pessoaInfo);
    return await database.add(pessoa);
  }
  async function findByItems({ max, searchParams }) {
    let pessoa = await database.findByItems(max, searchParams);

    if (pessoa) {
      return makePessoa(pessoa);
    } else {
      return;
    }
  }
  async function getItems({ max }) {
    console.log("----GET ITEMS");
    let items = await database.getItems(max);

    let pessoas = [];
    items.forEach((item) => {
      let pessoa = makePessoa(item);
      pessoas.push(pessoa);
    });

    return pessoas;
  }
  async function remove(searchParams) {
    return await database.remove(searchParams);
  }
  async function replace({ searchParams, pessoa }) {
    return await database.replace(pessoa, searchParams);
  }
  async function update({ searchParams, pessoa }) {
    return await database.update(pessoa, searchParams);
  }
};
