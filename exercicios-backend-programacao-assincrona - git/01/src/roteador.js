const express = require('express')
const controlador = require('./controladores/controlador')

const rotas = express();

rotas.get('/produtos', controlador.listarProdutos);
rotas.get('/produtos/:idProduto', controlador.detalharProduto);
rotas.get('/produtos/:idProduto/frete/:cep', controlador.valorDoFrete)

module.exports = rotas