const particles = [];

function generateParticle(x, y) {
    let particle;
    if (particles.length < 500) {
        particle = document.createElement("div");
        particle.setAttribute("class", "particle");
        particle.style.position = "fixed";
        particle.style.backgroundColor = "rgb(255, 0, 0)";
        document.body.appendChild(particle);
    } else {
        particle = particles.shift();
    }
    particle.style.top = y + "px";
    particle.style.left = x + "px";
    particle.style.width = "5px";
    particle.style.height = "5px";
    particle.x = x;
    particle.y = y;
    if (isNaN(particle.x)) {
        debugger;
    }
    particle.vx = (Math.random() * 2 - 1) * 10;
    particle.vy = (Math.random() * 2 - 1) * 10;
    particles.push(particle);
}

function updateParticles() {
    particles.forEach(particle => {

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        if (isNaN(particle.x)) {
            debugger;
        }
        particle.style.top = particle.y + "px";
        particle.style.left = particle.x + "px";
    });
}
