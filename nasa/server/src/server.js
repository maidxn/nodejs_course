const http = require('http')

const app = require('./app')
 
const { loadPlanetsData } = require('./models/planets.model')
const { loadLaunchData } = require('./models/launches.model')

// const PORT = process.env.PORT || 420;
const PORT = 1234


const server = http.createServer(app)

async function startServer() {
    await loadPlanetsData()

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

startServer()

