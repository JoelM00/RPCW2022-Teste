var mongoose = require('mongoose')

var cidadeSchema = new mongoose.Schema({
    _id: String,
    id: String,
    nome: String,
    populacao: Number,
    descricao: String,
    distrito: String,
})

module.exports = mongoose.model('cidades',cidadeSchema)
