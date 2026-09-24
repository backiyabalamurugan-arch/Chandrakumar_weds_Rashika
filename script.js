document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer Logic
    const targetDate = new Date('2026-11-13T06:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('cd-days').textContent = days.toString().padStart(2, '0');
            document.getElementById('cd-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('cd-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('cd-seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('cd-days').textContent = '00';
            document.getElementById('cd-hours').textContent = '00';
            document.getElementById('cd-minutes').textContent = '00';
            document.getElementById('cd-seconds').textContent = '00';
            clearInterval(timerInterval);
        }
    };

    updateTimer(); // Initial call
    const timerInterval = setInterval(updateTimer, 1000);

    // Scroll to Top logic
    const backToTopBtn = document.querySelector('.footer-back-top');
    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
// Flower Rain Effect
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('flower-rain-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = 40; // Total falling petals at once

  // Petal color palette (Soft pink, rose, gold)
  const colors = [
    'rgba(255, 182, 193, 0.8)',
    'rgba(255, 192, 203, 0.85)',
    'rgba(187, 26, 187, 0.7)',
    'rgba(230, 230, 250, 1)',
    'rgb(199, 43, 178)'
  ];

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.5 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.02;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shapeScaleX = Math.random() * 0.5 + 0.5;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) + this.speedX;
      this.angle += this.spin;

      if (this.y > height + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(this.shapeScaleX, 1);

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size, -this.size, -this.size * 1.5, this.size / 2, 0, this.size * 1.5);
      ctx.bezierCurveTo(this.size * 1.5, this.size / 2, this.size, -this.size, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }

  // Initialize petals
  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((petal) => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});


function initEnvelopeAnimation() {
  const bgMusic = document.getElementById('bg-music');
  const envelopeContainer = document.getElementById('envelope-btn');
  const sealBtn = document.getElementById('seal-btn');
  const overlay = document.getElementById('envelope-overlay');

  if (!envelopeContainer || !overlay) return;

  const handleOpen = () => {
    // 1. Play Background Music
    if (bgMusic) {
      bgMusic.volume = 0.5;
      bgMusic.play().catch((err) => console.log('Audio playback info:', err));
    }

    // 2. Trigger Flap Opening & Card Slide
    envelopeContainer.classList.add('open');

    // 3. Wait for the card to fully slide up, then fade out overlay to show main site
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 1600); // 1.6 seconds delay gives full card reveal before showing main site
  };

  if (sealBtn) sealBtn.addEventListener('click', handleOpen);
  envelopeContainer.addEventListener('click', handleOpen);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnvelopeAnimation);
} else {
  initEnvelopeAnimation();
}
