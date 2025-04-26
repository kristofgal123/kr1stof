const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const drops = [];

for (let i = 0; i < 300; i++) {
  drops.push({
    x: Math.random() * width,
    y: Math.random() * height,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 5 + 2
  });
}

function drawRain() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let drop of drops) {
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
  }

  ctx.stroke();
}

function moveRain() {
  for (let drop of drops) {
    drop.y += drop.speed;
    if (drop.y > height) {
      drop.y = -drop.length;
      drop.x = Math.random() * width;
    }
  }
}

function animateRain() {
  drawRain();
  moveRain();
  requestAnimationFrame(animateRain);
}

animateRain();

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// Ne engedjük a jobbklikket
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
  
  // Ne engedjük a "Ctrl + U" billentyűkombinációt
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
    }
  });