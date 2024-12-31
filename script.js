const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

class Firework {
    constructor(x, y, colors) {
        this.x = x;
        this.y = y;
        this.colors = colors;
        this.particles = [];
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this.x, this.y, this.colors));
        }
    }

    update() {
        this.particles.forEach(p => p.update());
    }

    draw() {
        this.particles.forEach(p => p.draw());
    }
}

class Particle {
    constructor(x, y, colors) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
        this.alpha = 1;
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFFF33", "#FF33FF"];
    fireworks.push(new Firework(x, y, colors));
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles[0].alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

setInterval(launchFirework, 500);
animate();
