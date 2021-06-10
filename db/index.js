const PessoaModel = require("../pessoas/pessoa-model");
const Logger = require("../helpers/logger");
const logger = new Logger();
const connection = require("./connection");

module.exports = function makeDb() {
  return Object.freeze({
    add,
    findByItems,
    getItems,
    remove,
    replace,
    update,
  });

  function formatParams(searchParams) {
    let items = Object.keys(searchParams);
    let values = Object.values(searchParams);

    searchParams = {};
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const value = values[index];
      searchParams[item] = { $regex: value };
    }

    return searchParams;
  }

  async function add(pessoaInfo) {
    try {
      pessoa = new PessoaModel(pessoaInfo);

      await pessoa.save();
    } catch (error) {
      throw error;
    }
  }
  async function findByItems(max, params) {
    try {
      params = formatParams(params);
      return await PessoaModel.findOne(params);
    } catch (error) {
      throw error;
    }
  }
  async function getItems(max) {
    try {
      return await PessoaModel.find();
    } catch (error) {
      throw error;
    }
  }
  async function remove(conditions) {
    try {
      conditions = formatParams(conditions);
      const result = await PessoaModel.deleteOne(conditions);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function replace(pessoa, conditions) {
    try {
      conditions = formatParams(conditions);
      const result = await PessoaModel.replaceOne(conditions, pessoa);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function update(pessoa, conditions) {
    try {
      conditions = formatParams(conditions);
      const result = await PessoaModel.updateOne(conditions, pessoa);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
