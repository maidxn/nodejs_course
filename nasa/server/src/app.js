const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')

const api = require('./routes/api')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(morgan('combined'))


// app.use(express.json())
// console.log(__dirname)
app.use(express.static(path.join(__dirname, '..', 'public')))
// console.log(path.join(__dirname, '..', 'public'))
// console.log(path.join(__dirname, "..", "public", "index.html"))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})


app.use('/v1', api)
 
module.exports = app 