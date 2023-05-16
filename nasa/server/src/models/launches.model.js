const launches = new Map()

let latestFlighNumber = 1128

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

launches.set(launch.flightNumber, launch)

function existsLaunchWithId(launchId){
    return launches.has(launchId)
}

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(launch){
    latestFlighNumber++
    launches.set(
        latestFlighNumber, Object.assign(launch, {
        flightNumber: latestFlighNumber,
        upcoming: true,
        success: true,
        customers: ['nodejs', 'Greate Explosion Murder God Dynamight']

    }))
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches, 
    addNewLaunch, 
    abortLaunchById
}