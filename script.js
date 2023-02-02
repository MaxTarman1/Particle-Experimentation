const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
const MaxRange = Infinity;
const MinRange = 0;
var width = window.innerWidth;
var height = window.innerHeight;
window.addEventListener('resize', function () {
  height = window.innerHeight;
  width = window.innerWidth;
});
class particle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.vy = 0;
    this.vx = 0;
  }
  draw() {
    circle(this.x, this.y, 10, this.c);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy = 0;
    this.vx = 0;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > width) {
      this.x = width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > height) {
      this.y = height;
    }
  }
}
class rule {
  constructor(colorfrom, attraction, colorto) {
    this.cf = colorfrom;
    this.ct = colorto;
    this.a = attraction;
  }
  evaluatePositions(current, other, d) {
    console.log('evaluating');
    let fx, fy, dx, dy, f;
    dx = current.x - other.x;
    dy = current.y - other.y;
    f = (this.a * -1) / d;
    fx += f * dx;
    fy += f * dy;
    current.vx += fx;
    current.vy += fy;
    if (this.ct == other.c) {
      other.vx -= fx;
      other.vy -= fy;
    }
  }
  update(particles) {
    var current;
    var other;
    for (let i = 0; i < particles.length; i++) {
      current = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        other = particles[j];
        if (other.c == this.ct) {
          let d = Math.sqrt(
            Math.pow(current.x - other.x, 2) + Math.pow(current.y - other.y, 2)
          );
          if (d > MinRange && d < MaxRange) {
            this.evaluatePositions(current, other, d);
          }
        }
      }
    }
  }
}
const rule1 = new rule('white', 0.01, 'white');
for (let i = 0; i < 60; i++) {
  particles.push(
    new particle(Math.random() * width, Math.random() * height, 'white')
  );
}

function animate() {
  canvas.height = height;
  canvas.width = width;
  // ctx.clearRect(0, 0, width, height);
  rule1.update(particles);
  console.log('stuff');
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
  }
  requestAnimationFrame(animate);
}
animate();
function circle(x, y, r, c) {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}
