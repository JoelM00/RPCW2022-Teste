var mongoose = require('mongoose')

var ligacaoSchema = new mongoose.Schema({
    _id: String,
    id: String,
    origem: String,
    destino: String,
    distância: Number,
})

module.exports = mongoose.model('ligacoes',ligacaoSchema)
