const heros = require('../models/hero.model')

function getHeros(req, res){
    res.json(heros);
}

function getOneHero(req, res){
    console.log('Get one hero')
}

module.exports = {
    getHeros,
    getOneHero
}

