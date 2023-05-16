const express = require('express')

const heroComtroller = require('../controllers/hero.controller')

const herosRouter = express.Router()

herosRouter.use((req, res, next) => {
    console.log("HI")
    console.log('IP Address:', req.ip)
    next()
})

herosRouter.get('/', heroComtroller.getHeros)

module.exports = herosRouter
