const mongoose = require("mongoose");
const { Schema } = mongoose;

const pessoaSchema = new Schema({
  nome: {
    type: String,
    require: true,
  },
  telefone: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("pessoa", pessoaSchema);
