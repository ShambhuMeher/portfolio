/* ============ LOADER ============ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 900);
});

/* ============ YEAR ============ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============ CUSTOM CURSOR ============ */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});
const followRing = () => {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  requestAnimationFrame(followRing);
};
followRing();
document.querySelectorAll('a, button, .skill-card, .project, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
});

/* ============ NAV ============ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('toTop').classList.toggle('visible', window.scrollY > 600);
});

/* mobile menu */
const burger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  burger.classList.remove('open'); navLinks.classList.remove('open');
}));

/* active link on scroll */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 200;
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navItems.forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#' + sec.id));
    }
  });
});

/* ============ TYPED EFFECT ============ */
const phrases = [
  'Frontend Developer',
  'React.js Specialist',
  'UI/UX Enthusiast',
  'Problem Solver',
  'JavaScript Engineer'
];
const typed = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function type() {
  const word = phrases[pi];
  typed.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
  let delay = deleting ? 50 : 110;
  if (!deleting && ci === word.length) { delay = 1500; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 300; }
  setTimeout(type, delay);
}
type();

/* ============ STATS COUNTER ============ */
const counters = document.querySelectorAll('.stat h3');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      n = Math.min(target, n + step);
      el.textContent = n + (target >= 100 ? '%' : '+');
      if (n < target) requestAnimationFrame(tick);
    };
    tick();
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

/* ============ REVEAL ON SCROLL ============ */
const revealEls = document.querySelectorAll(
  '.section-head, .about-text, .about-card, .skill-card, .project, .t-item, .contact-card, .hero-content, .hero-visual'
);
revealEls.forEach(el => el.classList.add('reveal'));
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ============ PROJECT FILTERS ============ */
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
filters.forEach(f => f.addEventListener('click', () => {
  filters.forEach(x => x.classList.remove('active'));
  f.classList.add('active');
  const cat = f.dataset.filter;
  projects.forEach(p => {
    p.classList.toggle('hide', !(cat === 'all' || p.dataset.cat === cat));
  });
}));

/* ============ CONTACT FORM ============ */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  if (!data.get('name') || !data.get('email') || !data.get('message')) {
    note.textContent = 'Please fill all fields.';
    note.style.color = '#ff8a8a';
    return;
  }
  note.textContent = 'Thanks! Your message has been queued. I will reply within 24 hours.';
  note.style.color = '#6df58c';
  form.reset();
  setTimeout(() => note.textContent = '', 5000);
});

/* ============ PARTICLES ============ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class P {
  constructor() { this.reset(); this.y = Math.random() * H; }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.6 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    const palette = ['#b388ff', '#ff6ec7', '#6ad6ff'];
    this.c = palette[(Math.random() * 3) | 0];
    this.a = Math.random() * 0.5 + 0.2;
  }
  step() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.c;
    ctx.globalAlpha = this.a;
    ctx.fill();
  }
}
for (let i = 0; i < 80; i++) particles.push(new P());

function loop() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.step(); p.draw(); });
  // connect
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#b388ff';
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(loop);
}
loop();

/* ============ TILT ON PROJECT CARDS ============ */
document.querySelectorAll('.project, .skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ============ TIME-OF-DAY THEME ============ */
// hours are 24-hour (0–23). getHours() returns local hour in 24h regardless of OS display format.
function themeForHour(h) {
  if (h >= 5  && h < 12) return 'morning';   // 05:00 – 11:59
  if (h >= 12 && h < 16) return 'afternoon'; // 12:00 – 15:59
  if (h >= 16 && h < 20) return 'evening';   // 16:00 – 19:59
  return 'night';                            // 20:00 – 04:59
}
function applyTimeTheme() {
  const theme = themeForHour(new Date().getHours());
  document.documentElement.setAttribute('data-theme', theme);
  const label = document.getElementById('theme-label');
  if (label) label.textContent = theme;
}
applyTimeTheme();
setInterval(applyTimeTheme, 60 * 1000);
