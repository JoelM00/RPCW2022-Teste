const mongoose = require('mongoose')
var Ligacao = require('../models/ligacao')

module.exports.listar = () => {
    return Ligacao
        .find()
        .exec()
}

module.exports.getByOrigem = (origem) => {
    return Ligacao
        .find({origem: origem},{_id: 0, id: 1, destino: 1})
        .exec()
}


module.exports.getByDist = (dist) => {
    return Ligacao
        .find({distância: {$gte: dist}},{_id: 0, id: 1, origem: 1, destino: 1, distância: 1 })
        .exec()
}