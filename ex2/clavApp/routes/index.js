var express = require('express');
var router = express.Router();

var axios = require('axios')

var token

router.get('/token', function(req, res, next) {
  axios.post("http://clav-api.di.uminho.pt/v2/users/login",{
    "username": "rpcw2022@gmail.com",
    "password": "2022"
  })
  .then(dados => {
    token = dados.data.token
    console.log(token)
    res.status(200).jsonp("obtido")
  })
  .catch(err => {
    console.log(err)
  })
});


router.get('/', function(req, res, next) {
  var tem = false
  if (token != undefined) {
    tem = true
  }
  res.render('index',{token: tem});
});

router.get('/classes', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token="+token)
  .then(dados => {
    res.render('classes', {classes: dados.data});
  })
  .catch(err => {
    console.log(err)
  })
});

router.get('/indices', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token="+token)
  .then(dados => {
    res.render('indices', {indices: dados.data});
  })
  .catch(err => {
    console.log(err)
  })
});


router.get('/classes/:id', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id+"?token="+token)
  .then(classe => {
    axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id+"/descendencia?token="+token)
    .then(filhos => {
      res.render('classe', {classe: classe.data, filhos: filhos.data});
    })
  })
  .catch(err => {
    console.log(err)
  })
});



module.exports = router;
