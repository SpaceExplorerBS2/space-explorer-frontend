let canvas = document.getElementById('gameCanvas');

let pointContext = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

pointContext.fillStyle = 'black';
pointContext.fillRect(0, 0, canvas.width, canvas.height);
pointContext.fillStyle = 'white';

// animate those dots to smoothly move around
let dots = [];
for (let i = 0; i < 100; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1
    });
}

const getAllPlanets = (canvas) => {

    let planets = [];
    for (let i = 0; i < 10; i++) {
        planets.push({
            x: Math.random() * (canvas.width - 150),
            y: Math.random() * (canvas.height - 150),
            radius: Math.random() * 15 + 5,
            // generate random color
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
    }

    return planets;
}

const allPlanets = getAllPlanets(canvas);


function draw() {
    // only animate the white dots, not the planets
    pointContext.fillStyle = 'black';
    pointContext.fillRect(0, 0, canvas.width, canvas.height);
    pointContext.fillStyle = 'white';
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        dot.x += dot.dx;
        dot.y += dot.dy;
        if (dot.x < 0 || dot.x > canvas.width) {
            dot.dx = -dot.dx;
        }
        if (dot.y < 0 || dot.y > canvas.height) {
            dot.dy = -dot.dy;
        }
        pointContext.fillRect(dot.x, dot.y, 2, 2);
    }

    // draw the planets
    let planetContext = canvas.getContext('2d');
    for (let i = 0; i < allPlanets.length; i++) {
        let planet = allPlanets[i];
        planetContext.fillStyle = planet.color;
        planetContext.beginPath();
        planetContext.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        planetContext.fill();
    }


}

setInterval(draw, 1000 / 60);


let planetContext = canvas.getContext('2d');

for (let i = 0; i < allPlanets.length; i++) {
    let planet = allPlanets[i];
    // on hover over the planet, show the planet's details
    // also show when mouse stopped moving
    // also show when mouse is clicked
    canvas.addEventListener('click', (event) => {
        let x = event.clientX;
        let y = event.clientY;
        let distance = Math.sqrt(Math.pow(planet.x - x, 2) + Math.pow(planet.y - y, 2));
        if (distance < planet.radius) {
            planetContext.fillStyle = 'black';
            planetContext.fillRect(planet.x, planet.y, 100, 100);
            planetContext.fillStyle = 'white';
            planetContext.fillText(`x: ${planet.x}`, planet.x, planet.y);
            planetContext.fillText(`y: ${planet.y}`, planet.x, planet.y + 20);
            planetContext.fillText(`radius: ${planet.radius}`, planet.x, planet.y + 40);
            planetContext.fillText(`color: ${planet.color}`, planet.x, planet.y + 60);
        }
    });
}

