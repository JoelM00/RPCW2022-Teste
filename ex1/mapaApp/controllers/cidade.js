const mongoose = require('mongoose')
var Cidade = require('../models/cidade')

module.exports.listar = () => {
    return Cidade
        .find()
        .exec()
}

module.exports.get = (id) => {
    return Cidade
        .findOne({id: id})
        .exec()
}

module.exports.getDistritos = () => {
    return Cidade
        .find({},{_id: 0, distrito: 1})
        .exec()
}

module.exports.getByDistrito = (dist) => {
    return Cidade
        .find({distrito: dist},{_id: 0, id: 1, nome: 1})
        .exec()
}

module.exports.getNomes = () => {
    return Cidade
        .find({},{_id: 0, nome: 1})
        .exec()
}

module.exports.getByDistrito = (distrito) => {
    return Cidade
        .find({distrito: distrito},{_id: 0, id: 1, nome: 1})
        .sort({id: 1})
        .exec()
}

module.exports.listarEspecifico = () => {
    return Cidade
        .find({},{_id: 0, id: 1, nome: 1, distrito: 1})
        .exec()
}
