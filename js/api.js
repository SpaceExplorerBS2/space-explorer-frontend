const fs = require('fs');

const createPlayer = (name) => {

}

const fetchPlayer = (id, name = null) => {

}

const fetchPlanet = (id, name = null) => {
    const filePath = 'api/planet.json';
    const fileContent = fs.readFileSync(filePath);
    const planetInfo = JSON.parse(fileContent);
    return planetInfo;
}

c

const execMove = (playerId, currentPlanetId, newPlanetId) => {

}

const execGather = (playerId, planetId) => {

}


