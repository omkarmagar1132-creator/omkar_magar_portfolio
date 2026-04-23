/* ═══════════════════════════════════════════
   OMKAR MAGAR — CYBER PORTFOLIO
   script.js
════════════════════════════════════════════ */

/* ─── 1. Matrix Rain ─── */
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H, cols, drops;

  const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ#@!%&';
  const FONT_SIZE = 14;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols  = Math.floor(W / FONT_SIZE);
    drops = Array(cols).fill(1).map(() => Math.random() * -100);
  }

  function draw() {
    ctx.fillStyle = 'rgba(2,4,9,0.05)';
    ctx.fillRect(0, 0, W, H);

    ctx.font = FONT_SIZE + 'px "Share Tech Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const y = drops[i] * FONT_SIZE;

      // Head of stream = bright white/green
      if (drops[i] * FONT_SIZE > 0 && drops[i] * FONT_SIZE < H) {
        ctx.fillStyle = Math.random() > 0.9 ? '#ffffff' : '#00ff88';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur  = 8;
      } else {
        ctx.fillStyle = 'rgba(0,207,100,0.6)';
        ctx.shadowBlur = 0;
      }

      ctx.fillText(char, i * FONT_SIZE, y);

      if (y > H && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 45);
})();


/* ─── 2. Custom Cursor ─── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  if (!cursor || !trail) return;

  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Trail follows with lag
  (function animTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animTrail);
  })();
})();


/* ─── 3. Typing Animation ─── */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Cybersecurity Enthusiast',
    'Ethical Hacking Learner',
    'Web Developer',
    'B.Tech CSE Student',
    'CryptX Marketing Head',
    'Problem Solver',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pause     = false;

  function type() {
    const current = phrases[phraseIdx];

    if (pause) {
      setTimeout(type, 1200);
      pause = false;
      return;
    }

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        pause    = true;
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 40 : 80);
  }

  // Start after hero loads
  setTimeout(type, 1800);
})();


/* ─── 4. Navbar scroll & active link ─── */
(function initNav() {
  const navbar  = document.getElementById('navbar');
  const links   = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ─── 5. Hamburger Menu ─── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();


/* ─── 6. Scroll Reveal ─── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
          // Animate skill bars when they appear
          const bar = entry.target.querySelector('.skill-bar');
          if (bar) {
            const w = bar.dataset.width;
            setTimeout(() => { bar.style.width = w + '%'; }, 100);
          }
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();


/* ─── 7. Smooth scroll for nav links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ─── 8. Glitch flicker on hover ─── */
(function initGlitchHover() {
  const name = document.querySelector('.glitch-name');
  if (!name) return;

  name.addEventListener('mouseenter', () => {
    name.style.animation = 'none';
    void name.offsetWidth;
    name.style.animation = '';
  });
})();


/* ─── 9. Tilt effect on project cards ─── */
(function initTilt() {
  const cards = document.querySelectorAll('.project-card, .skill-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s, border-color 0.3s';
    });
  });
})();


/* ─── 10. Randomized hex background flicker ─── */
(function initHexFlicker() {
  const hexes = document.querySelectorAll('.orbit-dot');
  hexes.forEach(h => {
    setInterval(() => {
      h.style.opacity = (Math.random() > 0.3) ? '1' : '0.3';
    }, 800 + Math.random() * 400);
  });
})();


/* ─── 11. Console Easter Egg ─── */
(function consoleEasterEgg() {
  const style1 = 'color:#00ff88;font-size:18px;font-weight:bold;font-family:monospace;';
  const style2 = 'color:#00cfff;font-size:13px;font-family:monospace;';
  const style3 = 'color:#c8d8e8;font-size:12px;font-family:monospace;';

  console.log('%c[ SYSTEM BREACH DETECTED ]', style1);
  console.log('%cHello, fellow developer! 👾', style2);
  console.log('%cYou found the console easter egg.', style3);
  console.log('%cBuilt by: Omkar Vithal Magar', style3);
  console.log('%cContact: omkarmagar1132@gmail.com', style3);
  console.log('%c> Keep hacking (ethically!) 🔐', style2);
})();
