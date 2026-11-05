const PROJECTS = {
  wajibati: {
    ar: 'واجباتي', en: 'Wajibati', year: '2025',
    logo: './assets/logos/wajibati.jpg',
    url: 'https://react-9bh1j5.onspace.build',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Supabase', 'RTL'],
    desc: 'منصة سحابية ذكية لأتمتة دورة حياة التكاليف والواجبات المدرسية. بوابات للطالب والكادر، تقارير إنجاز تلقائية، وتجربة استخدام سينمائية بوضع ليلي فاخر.',
  },
  asir: {
    ar: 'رادار عسير الميداني', en: 'Asir Field Radar', year: '2025',
    logo: './assets/logos/asir-radar.jpg',
    url: 'https://react-9bicg5.onspace.build',
    tags: ['React', 'Tailwind', 'Firebase', 'Geo'],
    desc: 'منظومة رقمية رقابية لحظية لمشاريع منطقة عسير. تحديد جغرافي ذكي، توليد حسابات المقاولين فورياً، وربط واتساب، ولوحة سيادية حية للقيادة.',
  },
  shaheen: {
    ar: 'شاهين', en: 'Shaheen', year: '2025',
    logo: './assets/logos/shaheen.jpg',
    url: 'https://nakheel-soundwatch-network.lovable.app',
    tags: ['AI', 'Acoustic', 'Realtime'],
    desc: 'منصة تجريبية للرصد الصوتي بالذكاء الاصطناعي عبر الهواتف الذكية. تصنيف الأحداث الصوتية غير المعتادة، ومتابعة الأجهزة عبر لوحة سحابية موحّدة.',
  },
  atharak: {
    ar: 'أعذارك', en: "A'tharak", year: '2025',
    logo: './assets/logos/atharak.jpg',
    url: 'https://aatharak-absence.lovable.app',
    tags: ['School Ops', 'Absences', 'AI'],
    desc: 'منصة تشغيل مدرسي متكاملة: غياب وأعذار، جداول، مهام وتكليفات، إشعارات، تقارير، ومساعد ذكاء اصطناعي للإدارة.',
  },
  masar: {
    ar: 'مسار', en: 'Masar', year: '2026',
    logo: './assets/logos/masar.jpg',
    url: '',
    tags: ['CMS', 'Workshop', 'Clients'],
    desc: 'نظام إدارة ورش السيارات: أوامر صيانة، قطع غيار، فواتير، خط زمني للعميل مع صور وتحديثات لحظية حتى التسليم.',
  },
  atamm: {
    ar: 'أتمّ', en: 'Atamm', year: '2026',
    logo: './assets/logos/atamm.jpg',
    url: '',
    tags: ['SaaS', 'Supabase', 'Admin AI'],
    desc: 'منصة SaaS سعودية لتشغيل الأعمال الإدارية المدرسية: لجان، اجتماعات، قرارات، مهام، مستندات، ومركز ذكاء اصطناعي للتنبيهات والتوصيات.',
  },
  wafee: {
    ar: 'وفي', en: 'Wafee', year: '2025',
    logo: './assets/logos/wafee.jpg',
    url: 'https://wafi-card.lovable.app',
    tags: ['Loyalty', 'Apple Wallet', 'Google Wallet'],
    desc: 'منصة بطاقات ولاء رقمية للمتاجر والمقاهي تُضاف مباشرة إلى Apple Wallet وGoogle Wallet، مع نقاط وأختام وكوبونات ولوحة إحصائيات.',
  },
  tawasul: {
    ar: 'تواصل', en: 'Tawasul', year: '2025',
    logo: './assets/logos/tawasul.jpg',
    url: 'https://rasid-connect.lovable.app',
    tags: ['SaaS', 'Supabase', 'Appointments'],
    desc: 'منصة SaaS لتنظيم التواصل بين المدارس وأولياء الأمور: جداول تواصل، حجز مواعيد، إدارة المدارس والاشتراكات بصلاحيات دقيقة.',
  },
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const root = document.documentElement;

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ---------- Ember particles ---------- */
function setupEmbers(canvas) {
  if (!canvas || reducedMotion.matches) return { stop() {} };
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, raf = 0, alive = true;
  const particles = Array.from({ length: 48 }, () => spawn(true));

  function resize() {
    w = canvas.width = canvas.clientWidth * devicePixelRatio;
    h = canvas.height = canvas.clientHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  function spawn(randomY) {
    return {
      x: Math.random() * (canvas.clientWidth || innerWidth),
      y: randomY ? Math.random() * (canvas.clientHeight || innerHeight) : (canvas.clientHeight || innerHeight) + 10,
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 0.55 + 0.2),
      vx: (Math.random() - 0.5) * 0.35,
      life: Math.random() * 1,
      hue: Math.random() > 0.55 ? '203,48,39' : '217,180,123',
    };
  }
  function frame() {
    if (!alive) return;
    const cw = canvas.clientWidth || innerWidth;
    const ch = canvas.clientHeight || innerHeight;
    ctx.clearRect(0, 0, cw, ch);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.0035;
      if (p.life <= 0 || p.y < -10) Object.assign(p, spawn(false));
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.hue},${Math.max(0, p.life)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  resize();
  window.addEventListener('resize', resize);
  raf = requestAnimationFrame(frame);
  return {
    stop() {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    },
  };
}

/* ---------- Loader ---------- */
function runLoader() {
  const loader = document.querySelector('[data-loader]');
  const fill = document.querySelector('.loader-fill');
  const pctEl = document.querySelector('[data-loader-pct]');
  if (!loader) {
    root.classList.remove('is-loading');
    root.classList.add('hero-entered', 'header-in');
    return Promise.resolve();
  }

  const embers = setupEmbers(document.querySelector('[data-embers]'));

  return new Promise((resolve) => {
    let p = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(40, now - last);
      last = now;
      // Smooth eased climb toward 100
      const targetPace = p < 70 ? 0.045 : p < 92 ? 0.028 : 0.055;
      p = Math.min(100, p + dt * targetPace * (0.7 + Math.random() * 0.6));
      if (fill) fill.style.width = `${p}%`;
      if (pctEl) pctEl.textContent = String(Math.floor(p));

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        loader.classList.add('is-exiting');
        setTimeout(() => {
          root.classList.remove('is-loading');
          root.classList.add('hero-entered', 'header-in');
          clearTimeout(window.__introFallback);
          embers.stop();
          setTimeout(() => loader.remove(), 1100);
          resolve();
        }, 380);
      }
    };

    Promise.all([
      document.fonts?.ready?.catch?.(() => {}) || Promise.resolve(),
      new Promise((r) => setTimeout(r, 900)),
    ]).then(() => requestAnimationFrame(tick));
  });
}

/* ---------- Inertia scroll ---------- */
function advanceScroll(position, target, elapsed, response = 145) {
  return position + (target - position) * (1 - Math.exp(-Math.max(0, elapsed) / response));
}

function setupInertia() {
  if (reducedMotion.matches || !finePointer.matches) return { stop() {} };

  let frame = 0;
  let target = window.scrollY;
  let position = window.scrollY;
  let lastTime = 0;
  let lastWritten = window.scrollY;
  let direction = 0;

  const maxScroll = () => Math.max(0, document.scrollingElement.scrollHeight - innerHeight);
  const blocked = () =>
    root.classList.contains('is-loading') ||
    root.classList.contains('menu-open') ||
    root.classList.contains('dialog-open') ||
    document.body.classList.contains('is-locked');

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    target = position = window.scrollY;
    direction = 0;
    lastTime = 0;
  }

  function nestedScroll(element, delta) {
    for (let node = element; node && node !== document.body; node = node.parentElement) {
      if (node.matches('input,textarea,select,dialog,[contenteditable="true"]')) return true;
      if (node.scrollHeight > node.clientHeight + 2 && /(auto|scroll)/.test(getComputedStyle(node).overflowY)) {
        if (delta < 0 ? node.scrollTop > 0 : node.scrollTop + node.clientHeight < node.scrollHeight - 1) return true;
      }
    }
    return false;
  }

  function tick(time) {
    if (blocked()) { stop(); return; }
    target = Math.max(0, Math.min(maxScroll(), target));
    const elapsed = lastTime ? Math.min(50, time - lastTime) : 16.67;
    lastTime = time;
    position = advanceScroll(position, target, elapsed, 145);
    const done = Math.abs(target - position) < 0.7;
    lastWritten = done ? target : position;
    window.scrollTo({ top: lastWritten, behavior: 'instant' });
    if (done) { frame = 0; lastTime = 0; direction = 0; }
    else frame = requestAnimationFrame(tick);
  }

  window.addEventListener('wheel', (event) => {
    if (
      event.defaultPrevented || !event.cancelable || event.ctrlKey || event.metaKey || event.shiftKey ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY) || blocked()
    ) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight * 0.9 : 1);
    if (!delta || nestedScroll(event.target, delta)) return;
    const max = maxScroll();
    if (max < 1) return;
    event.preventDefault();
    const nextDirection = Math.sign(delta);
    if (!frame || direction !== nextDirection) target = position = window.scrollY;
    direction = nextDirection;
    const reach = innerHeight * 1.25;
    target = Math.max(0, Math.min(max, Math.max(window.scrollY - reach, Math.min(window.scrollY + reach, target + delta))));
    if (!frame) { lastWritten = window.scrollY; frame = requestAnimationFrame(tick); }
  }, { passive: false });

  window.addEventListener('scroll', () => {
    if (frame && Math.abs(window.scrollY - lastWritten) > 3) stop();
  }, { passive: true });
  window.addEventListener('pointerdown', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape'].includes(e.key)) stop();
  });
  window.addEventListener('resize', stop);
  reducedMotion.addEventListener('change', stop);
  finePointer.addEventListener('change', stop);
  return { stop };
}

/* ---------- Scroll scenes ---------- */
function setupScenes() {
  const hero = document.querySelector('.hero');
  const scatterStage = document.querySelector('[data-scatter-stage]');
  const orbs = [...document.querySelectorAll('.scatter-orb')];
  const craft = document.querySelector('.craft');
  const maskStage = document.querySelector('[data-mask-transition]');
  let ticking = false;
  let orbitPhase = 0;

  function update(time) {
    ticking = false;
    const y = window.scrollY;
    const vh = innerHeight;
    const docH = document.scrollingElement.scrollHeight - vh;
    root.style.setProperty('--progress', docH > 0 ? String(y / docH) : '0');

    if (hero) {
      const heroH = hero.offsetHeight;
      const local = clamp(y / Math.max(1, heroH - vh), 0, 1);
      const eased = easeOutCubic(local);
      root.style.setProperty('--hero-scale-x', (0.68 + eased * 0.34).toFixed(4));
      root.style.setProperty('--hero-scale-y', (0.74 + eased * 0.28).toFixed(4));
      root.style.setProperty('--panel-y', `${(local * 40).toFixed(2)}px`);
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0;
        el.style.setProperty('--py', `${(y * speed).toFixed(2)}px`);
      });
    }

    if (scatterStage && !reducedMotion.matches) {
      const rect = scatterStage.getBoundingClientRect();
      const total = Math.max(1, scatterStage.offsetHeight - vh);
      const scrolled = clamp(-rect.top, 0, total);
      const p = scrolled / total;
      const spread = Math.pow(clamp(p * 1.2, 0, 1), 0.78);
      orbitPhase = time ? time * 0.00008 : 0;
      root.style.setProperty('--scatter', spread.toFixed(4));
      orbs.forEach((orb, i) => {
        orb.style.setProperty('--spread', spread.toFixed(4));
        const spin = Math.sin(orbitPhase + i * 0.7) * 4 * spread;
        orb.style.setProperty('--orbit', `${spin.toFixed(2)}deg`);
      });
    } else {
      orbs.forEach((orb) => orb.style.setProperty('--spread', '1'));
    }

    if (maskStage && !reducedMotion.matches) {
      const rect = maskStage.getBoundingClientRect();
      const total = Math.max(1, maskStage.offsetHeight - vh);
      const scrolled = clamp(-rect.top, 0, total);
      root.style.setProperty('--mask', easeOutCubic(scrolled / total).toFixed(4));
    }

    if (craft) {
      const rect = craft.getBoundingClientRect();
      const p = clamp(1 - rect.top / vh, 0, 1.2);
      root.style.setProperty('--craft', clamp(p, 0, 1).toFixed(4));
      if (rect.top < vh * 0.75) craft.classList.add('is-in');
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  // Continuous orbit while in scatter
  function orbitLoop(t) {
    if (scatterStage) {
      const rect = scatterStage.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0 && !reducedMotion.matches) update(t);
    }
    requestAnimationFrame(orbitLoop);
  }
  const vh = innerHeight;
  if (!reducedMotion.matches) requestAnimationFrame(orbitLoop);

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* ---------- Reveal on view ---------- */
function setupReveals() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  if (reducedMotion.matches) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Orb tilt ---------- */
function setupOrbTilt() {
  if (!finePointer.matches || reducedMotion.matches) return;
  document.querySelectorAll('.scatter-orb').forEach((orb) => {
    orb.addEventListener('pointermove', (e) => {
      const r = orb.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      orb.style.setProperty('--tilt-y', `${(px * 14).toFixed(2)}deg`);
      orb.style.setProperty('--tilt-x', `${(-py * 14).toFixed(2)}deg`);
    });
    orb.addEventListener('pointerleave', () => {
      orb.style.setProperty('--tilt-x', '0deg');
      orb.style.setProperty('--tilt-y', '0deg');
    });
  });
}

/* ---------- Menu ---------- */
function setupMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const overlay = document.querySelector('[data-nav-overlay]');
  if (!toggle || !overlay) return;

  const setOpen = (open) => {
    root.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    overlay.hidden = !open;
    document.body.classList.toggle('is-locked', open);
  };

  toggle.addEventListener('click', () => setOpen(!root.classList.contains('menu-open')));
  overlay.querySelectorAll('[data-nav-link]').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) setOpen(false);
  });
}

/* ---------- Project dialog ---------- */
function setupProjects() {
  const dialog = document.querySelector('[data-project-dialog]');
  if (!dialog) return;

  const logo = dialog.querySelector('[data-dialog-logo]');
  const title = dialog.querySelector('[data-dialog-title]');
  const en = dialog.querySelector('[data-dialog-en]');
  const desc = dialog.querySelector('[data-dialog-desc]');
  const tags = dialog.querySelector('[data-dialog-tags]');
  const link = dialog.querySelector('[data-dialog-link]');
  const year = dialog.querySelector('[data-dialog-year]');
  const closeBtn = dialog.querySelector('[data-dialog-close]');

  function openProject(id) {
    const data = PROJECTS[id];
    if (!data) return;
    logo.src = data.logo;
    logo.alt = `شعار ${data.ar}`;
    title.textContent = data.ar;
    en.textContent = data.en;
    desc.textContent = data.desc;
    if (year) year.textContent = data.year || '2025';
    tags.innerHTML = data.tags.map((t) => `<li>${t}</li>`).join('');
    if (data.url) {
      link.href = data.url;
      link.textContent = 'زيارة المنصة';
      link.classList.remove('is-disabled');
      link.removeAttribute('aria-disabled');
    } else {
      link.href = '#';
      link.textContent = 'قريباً — قيد التطوير';
      link.classList.add('is-disabled');
      link.setAttribute('aria-disabled', 'true');
    }
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    root.classList.add('dialog-open');
    document.body.classList.add('is-locked');
  }

  function closeProject() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    root.classList.remove('dialog-open');
    document.body.classList.remove('is-locked');
  }

  document.querySelectorAll('[data-project]').forEach((btn) => {
    btn.addEventListener('click', () => openProject(btn.dataset.project));
  });
  closeBtn?.addEventListener('click', closeProject);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeProject(); });
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); closeProject(); });
}

/* ---------- Ribbon cursor ---------- */
function setupCursor() {
  const cursor = document.querySelector('[data-cursor]');
  if (!cursor || !finePointer.matches || reducedMotion.matches) return;

  root.classList.add('has-cursor');
  const ring = cursor.querySelector('.cursor-ring');
  const dot = cursor.querySelector('.cursor-dot');
  const ribbon = cursor.querySelector('[data-ribbon]');
  const TRAIL = 14;
  const dots = [];
  for (let i = 0; i < TRAIL; i++) {
    const el = document.createElement('i');
    el.style.width = `${Math.max(2, 7 - i * 0.35)}px`;
    el.style.height = el.style.width;
    ribbon.appendChild(el);
    dots.push({ el, x: 0, y: 0 });
  }

  let tx = innerWidth / 2, ty = innerHeight / 2;
  let rx = tx, ry = ty, dx = tx, dy = ty;

  window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });

  const hoverables = 'a, button, [data-project], .dialog-close, .menu-toggle';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(hoverables)) root.classList.add('cursor-hover');
  }, true);
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(hoverables)) root.classList.remove('cursor-hover');
  }, true);

  function loop() {
    dx += (tx - dx) * 0.42;
    dy += (ty - dy) * 0.42;
    rx += (tx - rx) * 0.14;
    ry += (ty - ry) * 0.14;
    dot.style.left = `${dx}px`;
    dot.style.top = `${dy}px`;
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;

    let px = dx, py = dy;
    dots.forEach((d, i) => {
      const lag = 0.28 - i * 0.012;
      d.x += (px - d.x) * Math.max(0.08, lag);
      d.y += (py - d.y) * Math.max(0.08, lag);
      d.el.style.left = `${d.x}px`;
      d.el.style.top = `${d.y}px`;
      d.el.style.opacity = String(Math.max(0, 0.55 - i * 0.035));
      px = d.x; py = d.y;
    });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ---------- Boot ---------- */
async function boot() {
  setupMenu();
  setupProjects();
  setupCursor();
  setupOrbTilt();
  setupInertia();
  setupReveals();
  await runLoader();
  setupScenes();
}

boot();
