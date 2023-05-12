const express = require('express')

const heroComtroller = require('./controllers/hero.controller')

const app = express();

const PORT = 4000;

const herosRouter = express.Router()

herosRouter.get('/heros', heroComtroller.getHeros)


app.use((req, res, next) => {
    const start = Date.now()
    console.log(`${req.method} ${req.url}`)
    next()
    // 
    const time = Date.now() - start
    console.log(`Time in middleware ${time}`)
})

app.use(express.json())

app.post('/heros', (req, res) => {
    if (!req.body.name){
        return res.status(400).json({
            error: 'Hero\'s name is none'
        })
    }
    const newHero = {
    id: heros.length,
    name: req.body.name, 
    quirk: req.body.quirk
    }
    heros.push(newHero)
    res.json(heros)
})

app.get('/', (req, res) =>{
    res.send({
       name: 'Bakugo Katsuki',
       hero_name: 'Great Explosion Murder God Dynamight'

    })
})


app.get('/heros/:id', (req, res) => {
    const index = Number(req.params.id)
    const hero = heros[index]
    if (hero) {
        res.json(hero)
    } else {
        res.status(404).json({
            error: "Out of range"})
        }
})

app.get('/hero', (req, res) => {
    res.send('<h1>Great Explosion Murder God Dynamight is also the best</h1>')
})

app.post('/hero', (req, res) => {
    console.log("Bakugo Katsuki is the best")
})


app.listen(PORT, () => {
    console.log(`Port ${PORT} is waiting for you`)
})