const fs = require("fs");
const path = require('path')
const { parse } = require("csv-parse")

const planets = require('./planets.mongo');
const array = []

async function clearData(){
  return await planets.deleteMany({})
}


function isHabitable(planet) {
  return planet["koi_disposition"] === "CONFIRMED"
  && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "..", "..", "data" , "kepler_data.csv"))
    .pipe(
      parse({
        comment: "#",
        columns: true,
      })
    )
    .on("data", async(data) => {
      if (isHabitable(data)) {
        savePlanet(data)
        // console.log(data.kepler_name)
        // array.push(data)
      }
    })
    .on("error", (err) => {
      console.log(err);
      reject(err)
    })
    .on("end", async () => {
      const numberPlanets = (await getAllPlanets()).length
      // const numberPlanets = array.length
      console.log(`${numberPlanets} planets are found`)
      console.log("Done with the data");
      resolve()
    })
})
}

async function getAllPlanets(){
  return await planets.find({})
}

async function savePlanet(planet){
  // try{
  //   console.log(`Planet name: ${planet.kepler_name}`)
  //   planets.create({keplerName: planet.kepler_name})
  // }catch(err) {
  //   console.log(`Couldn't save a planet ${err}`)                                       
  // }

  try {
    console.log(`The current planet: ${planet.kepler_name}`)
    await planets.updateOne({
      keplerName: planet.kepler_name
    }, {
      keplerName: planet.kepler_name
    }, {
      upsert: true
    })
  } catch(err){
    console.log(`Couldn't save a planet ${err}`)
  }
  
}

module.exports = {
    clearData,
    loadPlanetsData,
    getAllPlanets
}
