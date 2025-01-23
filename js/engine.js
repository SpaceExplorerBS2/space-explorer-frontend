// Canvas references
const bgCanvas = document.getElementById('backgroundCanvas');
const planetCanvas = document.getElementById('planetCanvas');
const spaceshipCanvas = document.getElementById('spaceShipCanvas');


const bgContext = bgCanvas.getContext('2d');
const planetContext = planetCanvas.getContext('2d');
const spaceshipContext = spaceshipCanvas.getContext('2d');

// Set canvas dimensions
bgCanvas.width = planetCanvas.width = spaceshipCanvas.width = window.innerWidth;
bgCanvas.height = planetCanvas.height = spaceshipCanvas.height = window.innerHeight;

// Spaceship object
let spaceship = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    width: 40,
    height: 40,
    dx: 0,
    dy: 0,
    speed: 2,
};

// Asteroids for collision detection
let asteroids = [];
for (let i = 0; i < 20; i++) {
    asteroids.push({
        x: Math.random() * 5000 - 2500,
        y: Math.random() * 5000 - 2500,
        radius: Math.random() * 20 + 10,
    });
}

// Camera
let camera = {
    x: 0,
    y: 0,
    width: bgCanvas.width,
    height: bgCanvas.height,
};

let backgroundDots = Array.from({ length: 100 }, () => ({
    x: Math.random() * bgCanvas.width,
    y: Math.random() * bgCanvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
}));

const drawBackground = () => {
    bgContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    backgroundDots.forEach((dot) => {
        bgContext.fillStyle = 'white';
        bgContext.beginPath();
        bgContext.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        bgContext.fill();

        // Update dot position
        dot.x += dot.dx;
        dot.y += dot.dy;

        // Wrap dots around the canvas edges
        if (dot.x < 0) dot.x = bgCanvas.width;
        if (dot.x > bgCanvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = bgCanvas.height;
        if (dot.y > bgCanvas.height) dot.y = 0;
    });
};

// Draw planets
const drawPlanets = async () => {

    const planets = await fetchAllPlanets();

    planets.forEach((planet) => {
        planetContext.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        planetContext.beginPath();
        planetContext.arc(
            planet.x - camera.x,
            planet.y - camera.y,
            planet.radius,
            0,
            Math.PI * 2
        );
        planetContext.fill();
    });
};

const drawSpaceship = () => {
    spaceshipContext.clearRect(0, 0, spaceshipCanvas.width, spaceshipCanvas.height);

    spaceshipContext.fillStyle = 'green';
    spaceshipContext.fillRect(
        spaceship.x - spaceship.width / 2 - camera.x,
        spaceship.y - spaceship.height / 2 - camera.y,
        spaceship.width,
        spaceship.height
    );
};

const drawAsteroids = () => {
    planetContext.clearRect(0, 0, planetCanvas.width, planetCanvas.height);

    asteroids.forEach((asteroid) => {
        planetContext.fillStyle = 'brown';
        planetContext.beginPath();
        planetContext.arc(
            asteroid.x - camera.x,
            asteroid.y - camera.y,
            asteroid.radius,
            0,
            Math.PI * 2
        );
        planetContext.fill();
    });
};

const handleSpaceshipMovement = () => {
    spaceship.x += spaceship.dx;
    spaceship.y += spaceship.dy;

    // Camera follows the spaceship
    camera.x = spaceship.x - camera.width / 2;
    camera.y = spaceship.y - camera.height / 2;

};

const checkCollision = () => {
    asteroids.forEach((asteroid) => {
        let dx = spaceship.x - asteroid.x;
        let dy = spaceship.y - asteroid.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < asteroid.radius + spaceship.width / 2) {
            console.log('Collision detected!');
            // Handle collision (e.g., stop spaceship, decrease health, etc.)
            spaceship.dx = 0;
            spaceship.dy = 0;
        }
    });
};

const animate = () => {
    handleSpaceshipMovement();
    checkCollision();
    drawBackground();
    drawSpaceship();
    drawAsteroids();
    drawPlanets();
    requestAnimationFrame(animate);
};

// Keydown events for movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') spaceship.dy = -spaceship.speed;
    if (event.key === 'ArrowDown') spaceship.dy = spaceship.speed;
    if (event.key === 'ArrowLeft') spaceship.dx = -spaceship.speed;
    if (event.key === 'ArrowRight') spaceship.dx = spaceship.speed;
});

// Keyup events to stop movement
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') spaceship.dy = 0;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') spaceship.dx = 0;
});

// Initialize and start animation
animate();
