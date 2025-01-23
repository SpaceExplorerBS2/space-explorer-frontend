const createPlayer = (name) => {

}

const fetchPlayer = (id, name = null) => {

}

const fetchPlanet = (id, name = null) => {
    const planetInfo = {
        "planetId": "1",
        "x": 500,
        "y": 500,
        "name": "Zorax",
        "resources ": {
            "iron": 50,
            "gold": 20
        },
        " hazards ": [" asteroid_field "]
    };

    return planetInfo;
}
const fetchAllPlanets = () => {
    const planets = [{
        "planetId": "1",
        "x": 500,
        "y": 500,
        "name": "Zorax",
        "resources ": {
            "iron": 50,
            "gold": 20
        },
        " hazards ": [" asteroid_field "]
    }];

    return planets;
}

const execMove = (playerId, currentPlanetId, newPlanetId) => {

}

const execGather = (playerId, planetId) => {

}


