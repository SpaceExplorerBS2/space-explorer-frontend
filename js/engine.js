let bgCanvas = document.getElementById('backgroundCanvas');
let planetCanvas = document.getElementById('planetCanvas');
let spaceshipCanvas = document.getElementById('spaceShipCanvas');

bgCanvas.width = planetCanvas.width = spaceshipCanvas.width = window.innerWidth;
bgCanvas.height = planetCanvas.height = spaceshipCanvas.height = window.innerHeight;

// Contexts for the two canvases
let bgContext = bgCanvas.getContext('2d');
let planetContext = planetCanvas.getContext('2d');
let spaceshipContext = spaceshipCanvas.getContext('2d');

let rotationAngle = 0;
let currentPlanet = fetchPlanet("");

// Initialize white dots for animation
let dots = [];
for (let i = 0; i < 100; i++) {
    dots.push({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
    });
}

const getCurrentPlayerPosition = (playerId) => {
    const player = getPlayer(playerId);
    const currentPlanet = fetchPlanet(player.currentPlanetId);

    return {
        x: currentPlanet.x,
        y: currentPlanet.y,
        radius: currentPlanet.radius
    };
}




// Generate planets
const getAllPlanets = (canvas) => {
    let planets = [];
    let fetchedPlanets = fetchAllPlanets();

    for (let i = 0; i < fetchedPlanets.length; i++) {
        let planet = fetchedPlanets[i];
        planets.push({
            id: planet.planetId,
            name: planet.name,
            x: planet.x ?? Math.random() * (canvas.width - 150),
            y: planet.y ?? Math.random() * (canvas.height - 150),
            radius: planet.radius ?? Math.random() * 15 + 5,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        });
    }
    return planets;
};
const allPlanets = getAllPlanets(planetCanvas);


const drawSpaceship = (x, y) => {
    spaceshipContext.clearRect(0,0,spaceshipCanvas.width,spaceshipCanvas.height);

    spaceshipContext.beginPath();
    spaceshipContext.strokeStyle = 'red';
    spaceshipContext.rect(x-40, y-40, 80, 80);
    spaceshipContext.stroke();
};

const drawSpaceshipAtCurrentPlanet = () => {
    const currentPlanet = fetchPlanet("");
    drawSpaceship(currentPlanet.x, currentPlanet.y);
}

// Draw planets on the static canvas
const drawPlanets = () => {
    allPlanets.forEach((planet) => {
        planetContext.fillStyle = planet.color;
        planetContext.beginPath();
        planetContext.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        planetContext.fill();
    });
};

// Animate the dots on the background canvas
const animateDots = () => {
    bgContext.fillStyle = 'black';
    bgContext.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    bgContext.fillStyle = 'white';
    dots.forEach((dot) => {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > bgCanvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > bgCanvas.height) dot.dy *= -1;

        bgContext.fillRect(dot.x, dot.y, 2, 2);
    });

    requestAnimationFrame(animateDots);
};

// Handle hover and click events
planetCanvas.addEventListener('mousemove', (event) => {
    let x = event.clientX;
    let y = event.clientY;

    planetContext.clearRect(0, 0, planetCanvas.width, planetCanvas.height);
    drawPlanets();

    allPlanets.forEach((planet) => {
        let distance = Math.sqrt(Math.pow(planet.x - x, 2) + Math.pow(planet.y - y, 2));
        if (distance < planet.radius) {
            planetContext.fillStyle = 'black';
            planetContext.fillRect(planet.x + 20, planet.y - 60, 150, 70);

            planetContext.fillStyle = 'white';
            planetContext.fillText(`x: ${planet.x.toFixed(0)}`, planet.x + 25, planet.y - 40);
            planetContext.fillText(`y: ${planet.y.toFixed(0)}`, planet.x + 25, planet.y - 25);
            planetContext.fillText(`radius: ${planet.radius.toFixed(0)}`, planet.x + 25, planet.y - 10);
        }
    });
});

planetCanvas.addEventListener('click', (event) => {
    let x = event.clientX;
    let y = event.clientY;

    allPlanets.forEach((planet) => {
        let distance = Math.sqrt(Math.pow(planet.x - x, 2) + Math.pow(planet.y - y, 2));
        if (distance < planet.radius) {
            // display popup where player can choose between mining and attacking
            let popup = document.getElementById('popup');
            document.getElementById('currentPlanet').innerText = `${planet.name}`;
            popup.style.display = 'block';
            document.getElementById('popupButtonMine').style.display = 'block';
            document.getElementById('popupButtonAttack').style.display = 'block';
        }
        else {
            let popup = document.getElementById('popup');
            popup.style.display = 'none';
        }
    });
});

function drawGameOverlay(resources = {gold: 0, crystals: 0}, selectedPlanet = null) {
    let gameOverlay = document.getElementById('gameOverlay');
    gameOverlay.width = window.innerWidth;
    gameOverlay.height = 100; // Fixed height for the overlay

    let ctx = gameOverlay.getContext('2d');
    ctx.clearRect(0, 64, gameOverlay.width, gameOverlay.height);

    // Draw background for the overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 64, gameOverlay.width, gameOverlay.height);

    // Draw resource information
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText(`Gold: ${resources.gold}`, 20, 40);
    ctx.fillText(`Crystals: ${resources.crystals}`, 20, 70);

    // Display selected planet information
    if (selectedPlanet) {
        ctx.fillText(`Selected Planet:`, 200, 40);
        ctx.fillText(`x: ${selectedPlanet.x.toFixed(0)}`, 200, 60);
        ctx.fillText(`y: ${selectedPlanet.y.toFixed(0)}`, 200, 80);
        ctx.fillText(`Radius: ${selectedPlanet.radius.toFixed(0)}`, 200, 100);
    } else {
        ctx.fillText(`No planet selected`, 200, 40);
    }
}


drawSpaceshipAtCurrentPlanet();
drawPlanets();
animateDots();
drawGameOverlay();
