/* ==========================================================================
   Harish Periasamy Portfolio - Minimal Editorial Luxury Backdrop
   ========================================================================== */

(function() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', function() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initBlobs();
  });

  let blobs = [];

  class LuxuryBlob {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.radius = Math.random() * 160 + 100;
      this.vy = -(Math.random() * 0.15 + 0.05); // Slow upward float
      this.vx = (Math.random() - 0.5) * 0.1;
      const colors = [
        'rgba(124, 92, 252, 0.06)',  // Low opacity purple
        'rgba(91, 124, 250, 0.05)',  // Low opacity blue
        'rgba(36, 44, 71, 0.08)'     // Muted navy accent
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(10, 14, 26, 0)');
      
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      this.y += this.vy;
      this.x += this.vx;

      if (this.y < -this.radius) {
        this.reset();
      }

      this.draw();
    }
  }

  function initBlobs() {
    blobs = [];
    const count = 5;
    for (let i = 0; i < count; i++) {
      blobs.push(new LuxuryBlob());
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    blobs.forEach(b => b.update());
  }

  initBlobs();
  animate();
})();
