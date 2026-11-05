const PROJECTS = {
  wajibati: {
    ar: 'واجباتي',
    en: 'Wajibati',
    logo: './assets/logos/wajibati.jpg',
    url: 'https://react-9bh1j5.onspace.build',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Supabase', 'RTL'],
    desc: 'منصة سحابية ذكية لأتمتة دورة حياة التكاليف والواجبات المدرسية. بوابات للطالب والكادر، تقارير إنجاز تلقائية، وتجربة استخدام سينمائية بوضع ليلي فاخر.',
  },
  asir: {
    ar: 'رادار عسير الميداني',
    en: 'Asir Field Radar',
    logo: './assets/logos/asir-radar.jpg',
    url: 'https://react-9bicg5.onspace.build',
    tags: ['React', 'Tailwind', 'Firebase', 'Geo'],
    desc: 'منظومة رقمية رقابية لحظية لمشاريع منطقة عسير. تحديد جغرافي ذكي، توليد حسابات المقاولين فورياً، وربط واتساب، ولوحة سيادية حية للقيادة.',
  },
  shaheen: {
    ar: 'شاهين',
    en: 'Shaheen',
    logo: './assets/logos/shaheen.jpg',
    url: 'https://nakheel-soundwatch-network.lovable.app',
    tags: ['AI', 'Acoustic', 'Realtime'],
    desc: 'منصة تجريبية للرصد الصوتي بالذكاء الاصطناعي عبر الهواتف الذكية. تصنيف الأحداث الصوتية غير المعتادة، ومتابعة الأجهزة عبر لوحة سحابية موحّدة.',
  },
  atharak: {
    ar: 'أعذارك',
    en: "A'tharak",
    logo: './assets/logos/atharak.jpg',
    url: 'https://aatharak-absence.lovable.app',
    tags: ['School Ops', 'Absences', 'AI'],
    desc: 'منصة تشغيل مدرسي متكاملة: غياب وأعذار، جداول، مهام وتكليفات، إشعارات، تقارير، ومساعد ذكاء اصطناعي للإدارة.',
  },
  masar: {
    ar: 'مسار',
    en: 'Masar',
    logo: './assets/logos/masar.jpg',
    url: '',
    tags: ['CMS', 'Workshop', 'Clients'],
    desc: 'نظام إدارة ورش السيارات: أوامر صيانة، قطع غيار، فواتير، خط زمني للعميل مع صور وتحديثات لحظية حتى التسليم.',
  },
  atamm: {
    ar: 'أتمّ',
    en: 'Atamm',
    logo: './assets/logos/atamm.jpg',
    url: '',
    tags: ['SaaS', 'Supabase', 'Admin AI'],
    desc: 'منصة SaaS سعودية لتشغيل الأعمال الإدارية المدرسية: لجان، اجتماعات، قرارات، مهام، مستندات، ومركز ذكاء اصطناعي للتنبيهات والتوصيات.',
  },
  wafee: {
    ar: 'وفي',
    en: 'Wafee',
    logo: './assets/logos/wafee.jpg',
    url: 'https://wafi-card.lovable.app',
    tags: ['Loyalty', 'Apple Wallet', 'Google Wallet'],
    desc: 'منصة بطاقات ولاء رقمية للمتاجر والمقاهي تُضاف مباشرة إلى Apple Wallet وGoogle Wallet، مع نقاط وأختام وكوبونات ولوحة إحصائيات.',
  },
  tawasul: {
    ar: 'تواصل',
    en: 'Tawasul',
    logo: './assets/logos/tawasul.jpg',
    url: 'https://rasid-connect.lovable.app',
    tags: ['SaaS', 'Supabase', 'Appointments'],
    desc: 'منصة SaaS لتنظيم التواصل بين المدارس وأولياء الأمور: جداول تواصل، حجز مواعيد، إدارة المدارس والاشتراكات بصلاحيات دقيقة.',
  },
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const root = document.documentElement;

/* ---------- Loader ---------- */
function runLoader() {
  const fill = document.querySelector('.loader-fill');
  const pctEl = document.querySelector('[data-loader-pct]');
  const loader = document.querySelector('.loader');
  if (!loader) {
    root.classList.remove('is-loading');
    root.classList.add('hero-entered');
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let p = 0;
    const tick = () => {
      p += Math.random() * 11 + 4;
      if (p >= 100) p = 100;
      if (fill) fill.style.width = `${p}%`;
      if (pctEl) pctEl.textContent = String(Math.floor(p));
      if (p < 100) {
        requestAnimationFrame(() => setTimeout(tick, 28 + Math.random() * 40));
      } else {
        setTimeout(() => {
          root.classList.remove('is-loading');
          root.classList.add('hero-entered');
          clearTimeout(window.__introFallback);
          setTimeout(() => loader.remove(), 800);
          resolve();
        }, 220);
      }
    };
    // Fake progress synced with fonts/images readiness
    const ready = Promise.all([
      document.fonts?.ready?.catch?.(() => {}) || Promise.resolve(),
      new Promise((r) => setTimeout(r, 700)),
    ]);
    ready.then(tick);
  });
}

/* ---------- Inertia scroll ---------- */
function advanceScroll(position, target, elapsed, response = 155) {
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
    if (blocked()) {
      stop();
      return;
    }
    target = Math.max(0, Math.min(maxScroll(), target));
    const elapsed = lastTime ? Math.min(50, time - lastTime) : 16.67;
    lastTime = time;
    position = advanceScroll(position, target, elapsed, 150);
    const done = Math.abs(target - position) < 0.7;
    lastWritten = done ? target : position;
    window.scrollTo({ top: lastWritten, behavior: 'instant' });
    if (done) {
      frame = 0;
      lastTime = 0;
      direction = 0;
    } else {
      frame = requestAnimationFrame(tick);
    }
  }

  window.addEventListener(
    'wheel',
    (event) => {
      if (
        event.defaultPrevented ||
        !event.cancelable ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        blocked()
      )
        return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight * 0.9 : 1);
      if (!delta || nestedScroll(event.target, delta)) return;
      const max = maxScroll();
      if (max < 1) return;
      event.preventDefault();
      const nextDirection = Math.sign(delta);
      if (!frame || direction !== nextDirection) target = position = window.scrollY;
      direction = nextDirection;
      const reach = innerHeight * 1.2;
      target = Math.max(
        0,
        Math.min(max, Math.max(window.scrollY - reach, Math.min(window.scrollY + reach, target + delta))),
      );
      if (!frame) {
        lastWritten = window.scrollY;
        frame = requestAnimationFrame(tick);
      }
    },
    { passive: false },
  );

  window.addEventListener(
    'scroll',
    () => {
      if (frame && Math.abs(window.scrollY - lastWritten) > 3) stop();
    },
    { passive: true },
  );
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

/* ---------- Scroll-linked scenes ---------- */
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function setupScenes() {
  const hero = document.querySelector('.hero');
  const scatterStage = document.querySelector('[data-scatter-stage]');
  const orbs = [...document.querySelectorAll('.scatter-orb')];
  const craft = document.querySelector('.craft');

  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    const vh = innerHeight;

    // Global progress
    const docH = document.scrollingElement.scrollHeight - vh;
    root.style.setProperty('--progress', docH > 0 ? String(y / docH) : '0');

    // Hero backdrop scale + parallax
    if (hero) {
      const heroH = hero.offsetHeight;
      const local = clamp(y / Math.max(1, heroH - vh), 0, 1);
      const sx = 0.72 + local * 0.28;
      const sy = 0.78 + local * 0.22;
      root.style.setProperty('--hero-scale-x', sx.toFixed(4));
      root.style.setProperty('--hero-scale-y', sy.toFixed(4));
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0;
        el.style.setProperty('--py', `${(y * speed).toFixed(2)}px`);
      });
    }

    // Scatter explode
    if (scatterStage && !reducedMotion.matches) {
      const rect = scatterStage.getBoundingClientRect();
      const total = scatterStage.offsetHeight - vh;
      const scrolled = clamp(-rect.top, 0, Math.max(1, total));
      const p = scrolled / Math.max(1, total);
      // ease for cinematic feel
      const spread = Math.pow(clamp(p * 1.15, 0, 1), 0.85);
      root.style.setProperty('--scatter', spread.toFixed(4));
      orbs.forEach((orb) => {
        orb.style.setProperty('--spread', spread.toFixed(4));
      });
    } else if (orbs.length) {
      orbs.forEach((orb) => orb.style.setProperty('--spread', '1'));
    }

    // Craft mask scale
    if (craft) {
      const rect = craft.getBoundingClientRect();
      const p = clamp(1 - rect.top / vh, 0, 1);
      root.style.setProperty('--craft', p.toFixed(4));
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
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
  overlay.querySelectorAll('[data-nav-link]').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });
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
  const closeBtn = dialog.querySelector('[data-dialog-close]');

  function openProject(id) {
    const data = PROJECTS[id];
    if (!data) return;
    logo.src = data.logo;
    logo.alt = `شعار ${data.ar}`;
    title.textContent = data.ar;
    en.textContent = data.en;
    desc.textContent = data.desc;
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
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeProject();
  });
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeProject();
  });
}

/* ---------- Custom cursor ---------- */
function setupCursor() {
  const cursor = document.querySelector('[data-cursor]');
  if (!cursor || !finePointer.matches || reducedMotion.matches) return;

  root.classList.add('has-cursor');
  const ring = cursor.querySelector('.cursor-ring');
  const trail = cursor.querySelector('.cursor-trail');
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let tx = x;
  let ty = y;
  let rx = x;
  let ry = y;

  window.addEventListener(
    'pointermove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
    },
    { passive: true },
  );

  const hoverables = 'a, button, [data-project], .dialog-close, .menu-toggle';
  document.addEventListener(
    'pointerover',
    (e) => {
      if (e.target.closest(hoverables)) root.classList.add('cursor-hover');
    },
    true,
  );
  document.addEventListener(
    'pointerout',
    (e) => {
      if (e.target.closest(hoverables)) root.classList.remove('cursor-hover');
    },
    true,
  );

  function loop() {
    x += (tx - x) * 0.35;
    y += (ty - y) * 0.35;
    rx += (tx - rx) * 0.12;
    ry += (ty - ry) * 0.12;
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ---------- Boot ---------- */
async function boot() {
  setupMenu();
  setupProjects();
  setupCursor();
  setupInertia();
  await runLoader();
  setupScenes();
}

boot();
