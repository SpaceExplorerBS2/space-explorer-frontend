const API_URL = "https://api-space-explorer.programar.io/"
const createPlayer = (name) => {

}

const fetchPlayer = (id, name = null) => {

}

const fetchPlanet = (id, name = null) => {
    const planetInfo = {
        "planetId": "1",
        "x": 500,
        "y": 500,
        "radius":30,
        "name": "Zorax",
        "resources ": {
            "iron": 50,
            "gold": 20
        },
        " hazards ": [" asteroid_field "]
    };

    return planetInfo;
}
const fetchAllPlanets = async () => {
    return await fetch(API_URL + "planets").then(response => response.json());
}

const execMove = (playerId, newPlanetId) => {
    const move = {
        " playerId " : " 12345 " ,
        " destinationPlanetId " : " planet456 "
    }
}

const getPlayer = (id) => {
    const player = {
        "playerId" : " 12345 " ,
        "name" : "CaptainX" ,
        "inventory" : {
        "fuel" : 100 ,
            "iron" : 0 ,
            "gold" : 0
    } ,
        "currentPlanetId" : "planet123"

    }

    return player;
}

const execGather = (playerId, planetId) => {

}


