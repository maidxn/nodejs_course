const { getAllLaunches,
addNewLaunch, 
existsLaunchWithId, abortLaunchById} = require('../../models/launches.model')

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches())
}

async function httpAddNewLaunche(req, res){
    const launch = req.body

    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate){
        return res.status(400).json({
            error: 'Beep...bop...missing...U, Data!!!'
        })
    }

    launch.launchDate = new Date(launch.launchDate)

    if (isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'This is not a valid date'
        })
    }

    await addNewLaunch(launch)
    console.log(launch)
    return res.status(201).json(launch)
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)

    const checkedLaunch = await existsLaunchWithId(launchId)

    if(!checkedLaunch){
        return res.status(404).json({
            error: 'Launch had not lived'
        })
    }
    const aborted = await abortLaunchById(launchId)
    if (!aborted){
        return res.status(400).json({
            error: "Wrong miss"
        })
    }
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches, 
    httpAddNewLaunche, 
    httpAbortLaunch
}