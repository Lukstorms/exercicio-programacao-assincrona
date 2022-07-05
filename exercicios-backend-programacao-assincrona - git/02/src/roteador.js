const express = require('express');
const controlador = require('./controladores/controlador')

const rotas = express();

rotas.get('/pokemon', controlador.listar);
rotas.get('/pokemon/:idOuNome', controlador.detalhar);

module.exports = rotas