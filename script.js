const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
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
  }
  draw() {
    circle(this.x, this.y, 10, this.c);
  }
}
class rule {
  constructor(colorfrom, attraction, colorto) {
    this.cf = colorfrom;
    this.ct = colorto;
    this.a = attraction;
  }
  update(particles) {
    var current;
    var other;
    for (let i = 0; i < particles.length; i++) {
      current = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        other = particles[j];
        
      }
    }
  }
}
for (let i = 0; i < 100; i++) {
  particles.push(
    new particle(Math.random() * width, Math.random() * height, 'white')
  );
}

function animate() {
  canvas.height = height;
  canvas.width = width;
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
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
