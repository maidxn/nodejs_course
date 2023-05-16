const express = require('express')

const { httpGetAllPlanets } = require('./planets.controller')

const planetsRouter = express.Router()

const planetsController = require('./planets.controller')
planetsRouter.get('/planets', httpGetAllPlanets);

module.exports = planetsRouter