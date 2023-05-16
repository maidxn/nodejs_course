const heros = require('../models/hero.model')
const path = require('path')

function getHeros(req, res){
    img_path = path.join(__dirname, '..', 'public','images', 'with_droupout_aug.PNG')
    res.sendFile(img_path)
    // res.json(heros);
}

function getOneHero(req, res){
    console.log('Get one hero')
}

module.exports = {
    getHeros,
    getOneHero
}

