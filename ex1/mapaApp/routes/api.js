var express = require('express');
var router = express.Router();

var Cidade = require('../controllers/cidade')
var Ligacao = require('../controllers/ligacao')


router.get('/cidades', function(req, res, next) {

  if (req.query.distrito != undefined) {

    Cidade.getByDistrito(req.query.distrito)
    .then(dados => res.status(200).jsonp(dados))
    .catch(err => res.status(404).jsonp(err))

  } else {
    Cidade.listarEspecifico()
    .then(dados => res.status(200).jsonp(dados))
    .catch(err => res.status(404).jsonp(err))
  }
});


router.get('/distritos', function(req, res, next) {
  Cidade.listar()
  .then(dados => {
    
    distritos = {}

    dados.forEach(c => {
      if (distritos[c.distrito] == undefined) {

        Cidade.getByDistrito(c.distrito)
        .then(cidades => {
          distritos[c.distrito] = {nome: c.distrito, cidades: cidades}
        })
      }
    })

    //ALERTA - arranjar maneira de fazer await
    setTimeout(() => {
      res.status(200).jsonp(distritos)
    }, 200);
    
  })
  .catch(err => res.status(404).jsonp(err))
});

router.get('/cidades/nomes', function(req, res, next) {
  Cidade.getNomes()
  .then(dados => {
    
    lista = []
    dados.forEach(n => {
      lista.push(n.nome)
    })

    //Tem em considerecao os acentos
    ordenados = lista.sort((a, b) => {
      return a.localeCompare(b)
    })
    
    res.status(200).jsonp(ordenados)
  })
  .catch(err => res.status(404).jsonp(err))
});

router.get('/cidades/:id', function(req, res, next) {
  Cidade.get(req.params.id)
  .then(dados => res.status(200).jsonp(dados))
  .catch(err => res.status(404).jsonp(err))
});

router.get('/ligacoes', function(req, res, next) {
  if (req.query.origem != undefined) {

    Ligacao.getByOrigem(req.query.origem)
    .then(dados => {

      var ligacoes = []

      //Async n funciona n sei pk
      dados.forEach(async l => {
        await Cidade.get(l.destino)
        .then(cidade => {
          ligacoes.push({id: l.id, destino: l.destino, nomeDestino: cidade.nome})
        })
      })
        
    //ALERTA - arranjar maneira de fazer await
    setTimeout(() => {
      res.status(200).jsonp(ligacoes)
    }, 100);

    })
    .catch(err => res.status(404).jsonp(err))

  } else if (req.query.dist != undefined) {

    Ligacao.getByDist(req.query.dist)
    .then(dados => {

      var ligacoes = []

      dados.forEach(l => {
        Cidade.get(l.origem)
        .then(or => {
          Cidade.get(l.destino)
          .then(de => {
            ligacoes.push({id: l.id, origem: l.origem, nomeO: or.nome, destino: l.destino, nomeD: de.nome})
          })
        })
      })

           
      //ALERTA - arranjar maneira de fazer await
      setTimeout(() => {
        res.status(200).jsonp(ligacoes)
      }, 500);

    })
    .catch(err => res.status(404).jsonp(err))

  } else {
    res.status(200).jsonp("Rota invalida")
  }
});



module.exports = router;
