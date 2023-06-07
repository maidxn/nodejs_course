const axios = require('axios')

const launches = require('./launches.mongo')
const planets = require('./planets.mongo')

// const launches = new Map()

// let latestFlighNumber = 1128
const START_FLIGHT_NUMBER = 420

const launch =  {
    mission: 'Bakugo Katsuki',
    rocket: 'BK',
    launchDate: new Date('April 20, 2024'),
    target: 'Kepler-442 b',
    flightNumber: 1128,
    customers: ['UAHS'],
    upcoming: true,
    success: true,
}

saveLaunch(launch)

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function populateLaunches() {
    console.log("Get launch data")
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options:{
            pagination: false,
            populate: [
               {path: 'rocket',
                    select: {
                        name: 1
                    }
                }, 
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    })

    const launchDocs = response.data.docs 
    for (const launchDoc of launchDocs){

        const payloads = launchDoc['payloads']
        const customers = payloads.flatMap((payload) => {
            return payload['customers']
        })

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'], 
            customers
        }

        console.log(`${launch.flightNumber} ${launch.mission}`)
        
        await saveLaunch(launch)
    }
}

async function findLaunch(filter){
    return await launches.findOne(filter)
}

async function loadLaunchesData(){

    const firstLaunch = await findLaunch({
        flightNumber: 1, 
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    })

    if (firstLaunch) {
        console.log("Hey, look at me O.O")
    } else {
        await populateLaunches()
    }
    
    
}

// launches.set(launch.flightNumber, launch)

async function existsLaunchWithId(launchId){
    return await findLaunch({
        flightNumber: launchId
    })
}

async function getLatestFlightNumber(){
    const latestLaunch= await launches
        .findOne()
        .sort('-flightNumber')
    if (!latestLaunch){
        return START_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber
}

async function getAllLaunches(){
    return await launches
    .find({}, {'_id': 0, '__v': 0})
}

async function saveLaunch(launch){
    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber, 
    }, launch, {
        upsert: true,
    })
    
}

async function addNewLaunch(launch){
    const latestFlightNumber = await getLatestFlightNumber() + 1
    const addLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['nodejs', 'Greate Explosion Murder God Dynamight'],
        flightNumber: latestFlightNumber
    })
    await saveLaunch(addLaunch)
}

// function addNewLaunch(launch){
//     latestFlighNumber++
//     launches.set(
//         latestFlighNumber, Object.assign(launch, {
//         flightNumber: latestFlighNumber,
//         upcoming: true,
//         success: true,
//         customers: ['nodejs', 'Greate Explosion Murder God Dynamight']

//     }))
// }

async function abortLaunchById(launchId){
    const aborted = await launches.updateOne({
        flightNumber: launchId}, {
            upcoming: false,
            success: false
        },
    )
    return aborted.modifiedCount === 1
}

module.exports = {
    loadLaunchesData,
    existsLaunchWithId,
    getAllLaunches, 
    addNewLaunch, 
    abortLaunchById
}