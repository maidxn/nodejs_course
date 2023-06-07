const express = require('express')

// cluster.schedulingPolicy = cluster.SCHED_RR


const app = express()

function delay(duration){
    const startTime = Date.now()
    while(Date.now() - startTime < duration){
}}

app.get('/', (req, res) => {
    res.send(`<h1>Bakugo Katsuki is the No.1 Hero</h1> ${process.pid}`)
})

app.get('/timer', (req, res) => {
    delay(4000)
    res.send(`I'm comming back, losers ~~ ${process.pid}`)
})

console.log("Server is running")
console.log('I\'m the worker, sell my soul for the capitalist')
app.listen(1128)


