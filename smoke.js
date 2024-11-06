const canvas = document.getElementById('smoke_canvas');
const ctx = canvas.getContext('2d');

let smoke_mouse = { x: 0, y: 0 };
let width, height;
let particles = [];

function init() {
    resize();
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 29 + 1;  //  start at a random size.
        this.speedX = Math.random() * 2 - 1;  // Random horizontal speed.
        this.speedY = Math.random() * -2 - 1;  // Random vertical speed.
        this.color = this.getRandomColor();
        this.life = 100 + Math.random() * 100;  // lifespan .
    }

    // Randomize fire colors (red, orange, yellow, light brown)
    getRandomColor() {
        const colors = [
            'rgba(255, 69, 0, 1)',      // Red
            'rgba(255, 140, 0, 1)',     // Orange
            'rgba(255, 215, 0, 1)',     // Yellow
            'rgba(139, 69, 19, 1)',     // Brown 
            'rgba(255, 165, 0, 1)'      // Light orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.99; 
        this.life--;  

        if (this.size < 0.1) this.life = 0;  
        
        this.speedX += (Math.random() - 0.5) * 0.2;
        this.speedY += (Math.random() - 0.5) * 0.2;

       
        if (this.life > 50) {
            this.speedY *= 0.98;  
        } else {
            this.speedY *= 1.02;  
        }
    }

    draw() {
        ctx.globalAlpha = this.life / 200;  // Fade out 
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

  
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

       
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

   
    requestAnimationFrame(animate);
}

function handleMouseMove(e) {
    smoke_mouse.x = e.clientX;
    smoke_mouse.y = e.clientY;

    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(smoke_mouse.x, smoke_mouse.y));
    }
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', handleMouseMove);

init();
