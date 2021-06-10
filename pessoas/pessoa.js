const requiredParam = require("../helpers/required-param");

const { InvalidPropertyError } = require("../helpers/errors");

module.exports = function makeRegional(
  pessoaInfo = requiredParam("pessoaInfo")
) {
  validate(pessoaInfo);
  const normalPessoa = normalize(pessoaInfo);
  return Object.freeze(normalPessoa);

  function validate({ nome = requiredParam("nome"), telefone } = {}) {
    validateName("nome", nome);
    validateName("TELEFONE", telefone);

    return {
      nome,
      telefone,
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `O nome ${nome} tem que ter mais de 2 caracteres`
      );
    }
  }

  //metodo usado para caso queiramos deixa alguma coisa tudo minusculo por exemplo
  function normalize({ nome, telefone }) {
    return {
      nome,
      telefone,
    };
  }
};
