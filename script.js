/* ============================================
   薛之谦 · JOKER XUE  |  Interactions
   ============================================ */

(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 静态预览模式：?static=1（关闭所有动效，便于截图与打印） */
  const params = new URLSearchParams(location.search);
  if (params.has('static')) {
    document.body.classList.add('no-anim');
  }

  /* ------------------------------------------
     1. 专辑数据
     ------------------------------------------ */
  const ALBUMS = [
    {
      no: '01', year: '2006', name: '薛之谦', en: 'XUE ZHI QIAN',
      tag: '首张专辑',
      grad: 'linear-gradient(150deg, #F2B9CB 0%, #D97D9C 55%, #A85B78 100%)',
      desc: '二十出头的第一张答卷，主打《认真的雪》在彩铃时代传遍大街小巷。那时的他还不知道，这首歌会被人记二十年。',
      tracks: ['认真的雪', '王子归来', '黄色枫叶']
    },
    {
      no: '02', year: '2007', name: '你过得好吗', en: 'ARE YOU OK',
      tag: '',
      grad: 'linear-gradient(150deg, #CFC3EC 0%, #9D8AC9 55%, #6F5E9C 100%)',
      desc: '第二张专辑，延续都市情歌的路线。标题本身就是一句问候，也成了后来很多年里歌迷最想问他的话。',
      tracks: ['你过得好吗', '红尘女子']
    },
    {
      no: '03', year: '2008', name: '深深爱过你', en: 'DEEPLY LOVED',
      tag: '',
      grad: 'linear-gradient(150deg, #AECFE8 0%, #7AA5C8 55%, #4F7396 100%)',
      desc: '同一年的首场个人演唱会「谦年传说」之后，事业进入漫长的停顿。这张专辑像是高峰期的最后一张合影。',
      tracks: ['深深爱过你', '未完成的歌']
    },
    {
      no: '04', year: '2009', name: '未完成的歌', en: 'UNFINISHED',
      tag: '精选',
      grad: 'linear-gradient(150deg, #EBD6B4 0%, #C4A778 55%, #8E7550 100%)',
      desc: '"未完成"这三个字，后来成了他很多年的注脚——故事没写完，歌还得继续唱。',
      tracks: ['未完成的歌']
    },
    {
      no: '05', year: '2012', name: '几个薛之谦', en: 'SEVERAL JOKERS',
      tag: '合约期满',
      grad: 'linear-gradient(150deg, #DDBBDC 0%, #AE85AE 55%, #7B5A7B 100%)',
      desc: '与老东家合约期满前的作品。专辑名像一个自问：到底有几个薛之谦？深情的、搞笑的、还是那个快撑不下去的。',
      tracks: ['几个你', '我知道你都知道']
    },
    {
      no: '06', year: '2013', name: '意外', en: 'ACCIDENT',
      tag: '',
      grad: 'linear-gradient(150deg, #F0BCA8 0%, #CE8A70 55%, #9A5F4A 100%)',
      desc: '签约新公司后的专辑。《你还要我怎样》《方圆几里》开始被更多人听见——虽然离真正的爆发还有两年。',
      tracks: ['意外', '你还要我怎样', '方圆几里']
    },
    {
      no: '07', year: '2016', name: '初学者', en: 'BEGINNER',
      tag: '年度最佳',
      grad: 'linear-gradient(150deg, #B6DFD2 0%, #7FB3A3 55%, #4F7C6F 100%)',
      desc: '被 Apple Music 评为年度最佳专辑之一。《刚刚好》《我好像在哪见过你》让他彻底回到大众视野中心。',
      tracks: ['初学者', '刚刚好', '我好像在哪见过你']
    },
    {
      no: '08', year: '2017', name: '渡', en: 'CROSSING',
      tag: '',
      grad: 'linear-gradient(150deg, #B6C6DE 0%, #7C90B0 55%, #4E6080 100%)',
      desc: '《动物世界》《暧昧》《像风一样》。这一年的他在台上台下都是话题，音乐反而成了最安静的部分。',
      tracks: ['动物世界', '暧昧', '像风一样']
    },
    {
      no: '09', year: '2018', name: '怪咖', en: 'WEIRDO',
      tag: '',
      grad: 'linear-gradient(150deg, #EDB8CE 0%, #C27FA0 55%, #8C5674 100%)',
      desc: '《怪咖》《违背的青春》。他开始写"不合群"这件事，写给所有觉得自己格格不入的人。',
      tracks: ['怪咖', '违背的青春']
    },
    {
      no: '10', year: '2019', name: '尘', en: 'DUST',
      tag: '',
      grad: 'linear-gradient(150deg, #DCD2BC 0%, #AFA084 55%, #7A6E56 100%)',
      desc: '《木偶人》《慢半拍》。专辑名只有一个字，轻得像灰，却压得住整张作品的重量。',
      tracks: ['木偶人', '慢半拍']
    },
    {
      no: '11', year: '2020', name: '天外来物', en: 'ALIEN',
      tag: '巡演同名',
      grad: 'linear-gradient(150deg, #BEB9EA 0%, #8C86CC 55%, #5B5596 100%)',
      desc: '第十一张专辑，也是后来那场世界巡回演唱会的名字来源。他把"喜欢一个人"写成了一件从天而降的事。',
      tracks: ['天外来物', '彩券', '不爱我']
    },
    {
      no: '12', year: '2022', name: '无数', en: 'COUNTLESS',
      tag: '',
      grad: 'linear-gradient(150deg, #B0CBDE 0%, #7998B0 55%, #4D6B82 100%)',
      desc: '《无数》《变废为宝》。四十岁前的最后一张，写的是"被数不清的东西推着走"的疲惫。',
      tracks: ['无数', '变废为宝']
    },
    {
      no: '13', year: '2024', name: '守村人', en: 'VILLAGE KEEPER',
      tag: '最新专辑',
      grad: 'linear-gradient(150deg, #EBCBA8 0%, #C29469 55%, #8B6544 100%)',
      desc: '第十三张专辑，获腾讯音乐榜年度十大专辑。镜头从自己转向了那些被留在原地的人——这是他近年最温柔的一次转身。',
      tracks: ['守村人', '银河少年', '崇拜']
    }
  ];

  /* ------------------------------------------
     2. 渲染专辑轨道
     ------------------------------------------ */
  const rail = $('#albumRail');
  if (rail) {
    rail.innerHTML = ALBUMS.map((a, i) => `
      <article class="album-card${i === 0 ? ' active' : ''}" data-index="${i}">
        <div class="ac-cover" style="background:${a.grad}">
          <span class="ac-no">${a.no}</span>
          ${a.tag ? `<span class="ac-tag">${a.tag}</span>` : ''}
          <div class="ac-vinyl"></div>
          <div class="ac-meta">
            <div class="ac-year">${a.year}</div>
            <div class="ac-name">${a.name}</div>
          </div>
        </div>
      </article>
    `).join('');
  }

  /* 专辑详情 */
  const adCover = $('#adCover');
  const adYear = $('#adYear');
  const adName = $('#adName');
  const adEn = $('#adEn');
  const adDesc = $('#adDesc');
  const adTracks = $('#adTracks');

  function setAlbum(i) {
    const a = ALBUMS[i];
    if (!a || !adCover) return;
    adCover.style.background = a.grad;
    adCover.innerHTML = '<div class="ad-disc-mini"></div>';
    adYear.textContent = a.year + ' · 第 ' + a.no + ' 张';
    adName.textContent = a.name;
    adEn.textContent = a.en;
    adDesc.textContent = a.desc;
    adTracks.innerHTML = a.tracks.map(t => `<span>${t}</span>`).join('');
    if (rail) $$('.album-card', rail).forEach((c, idx) => c.classList.toggle('active', idx === i));
  }
  if (adCover) setAlbum(0);

  if (rail) {
    rail.addEventListener('click', e => {
      const card = e.target.closest('.album-card');
      if (!card) return;
      setAlbum(Number(card.dataset.index));
    });

    /* 拖拽滚动 */
    let isDown = false, startX = 0, startScroll = 0, moved = false;
    rail.addEventListener('pointerdown', e => {
      isDown = true; moved = false;
      startX = e.clientX; startScroll = rail.scrollLeft;
      rail.classList.add('dragging');
    });
    rail.addEventListener('pointermove', e => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) moved = true;
      rail.scrollLeft = startScroll - dx;
    });
    const endDrag = () => { isDown = false; rail.classList.remove('dragging'); };
    rail.addEventListener('pointerup', endDrag);
    rail.addEventListener('pointerleave', endDrag);
    rail.addEventListener('pointercancel', endDrag);

    /* 滚动条指示 */
    const railBar = $('#railBar');
    const updateBar = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const ratio = max > 0 ? rail.scrollLeft / max : 0;
      const w = max > 0 ? Math.max(16, (rail.clientWidth / rail.scrollWidth) * 100) : 100;
      railBar.style.width = w + '%';
      railBar.style.transform = `translateX(${ratio * (100 / w - 1) * 100}%)`;
    };
    rail.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar);
    updateBar();
  }

  /* ------------------------------------------
     3. 滚动渐入
     ------------------------------------------ */
  const revealEls = $$('.reveal');
  if (document.body.classList.contains('no-anim')) {
    revealEls.forEach(el => el.classList.add('in'));
    $('.chart-card')?.classList.add('in');
    $('.radar-box')?.classList.add('in');
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('in'), delay);
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));

    /* 图表 / 雷达单独观察 */
    const chartCard = $('.chart-card');
    if (chartCard) {
      const cio = new IntersectionObserver((es) => {
        es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); cio.unobserve(e.target); } });
      }, { threshold: 0.3 });
      cio.observe(chartCard);
    }
    const radarBox = $('.radar-box');
    if (radarBox) {
      const rio = new IntersectionObserver((es) => {
        es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
      }, { threshold: 0.35 });
      rio.observe(radarBox);
    }
  } else {
    revealEls.forEach(el => el.classList.add('in'));
    $('.chart-card')?.classList.add('in');
    $('.radar-box')?.classList.add('in');
  }

  /* ------------------------------------------
     4. 数字滚动
     ------------------------------------------ */
  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    if (reduceMotion || document.body.classList.contains('no-anim')) {
      el.textContent = target; return;
    }
    const dur = 1500;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const statNums = $$('.stat-num');
  if (document.body.classList.contains('no-anim')) {
    statNums.forEach(el => { el.textContent = el.dataset.count; });
  } else if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); sio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    statNums.forEach(n => sio.observe(n));
  } else {
    statNums.forEach(animateCount);
  }

  /* ------------------------------------------
     5. 导航 / 进度 / 回到顶部
     ------------------------------------------ */
  const nav = $('#nav');
  const burger = $('#navBurger');
  const progressBar = $('#progressBar');
  const toTop = $('#toTop');
  const sections = $$('main section[id]');
  const navLinks = $$('.nav-links a');

  burger?.addEventListener('click', () => nav.classList.toggle('open'));
  navLinks.forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  function onScroll() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;

    nav.classList.toggle('scrolled', y > 40);
    progressBar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    toTop.classList.toggle('show', y > 600);

    /* 当前区块高亮 */
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));

    /* 时间线进度 */
    const tl = $('.timeline');
    const tlProgress = $('#tlProgress');
    if (tl && tlProgress) {
      const rect = tl.getBoundingClientRect();
      const total = rect.height;
      const passed = Math.min(Math.max(window.innerHeight * 0.6 - rect.top, 0), total);
      tlProgress.style.height = (passed / total) * 100 + '%';
    }
  }
  let rafPending = false;
  window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => { onScroll(); rafPending = false; });
  }, { passive: true });
  onScroll();

  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ------------------------------------------
     6. 光标柔光
     ------------------------------------------ */
  const glow = $('#cursorGlow');
  if (glow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    let cx = gx, cy = gy;
    window.addEventListener('mousemove', e => {
      gx = e.clientX; gy = e.clientY;
      glow.classList.add('active');
    });
    (function loop() {
      cx += (gx - cx) * 0.09;
      cy += (gy - cy) * 0.09;
      glow.style.left = cx + 'px';
      glow.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
  }

  /* ------------------------------------------
     7. 雷达图
     ------------------------------------------ */
  const radarSvg = $('#radarChart');
  if (radarSvg) {
    const CX = 210, CY = 210, R = 145;
    const DIMS = [
      { label: '创作力', value: 95 },
      { label: '舞台表现', value: 92 },
      { label: '幽默感', value: 96 },
      { label: '真诚度', value: 90 },
      { label: '反差感', value: 94 },
      { label: '长情度', value: 93 }
    ];
    const N = DIMS.length;
    const angle = i => (Math.PI * 2 * i) / N - Math.PI / 2;
    const point = (i, r) => [CX + Math.cos(angle(i)) * r, CY + Math.sin(angle(i)) * r];

    const gridG = $('#radarGrid');
    const NS = 'http://www.w3.org/2000/svg';

    /* 同心多边形 */
    [0.25, 0.5, 0.75, 1].forEach(scale => {
      const pts = DIMS.map((_, i) => point(i, R * scale).join(',')).join(' ');
      const poly = document.createElementNS(NS, 'polygon');
      poly.setAttribute('points', pts);
      gridG.appendChild(poly);
    });
    /* 轴线 */
    DIMS.forEach((_, i) => {
      const [x, y] = point(i, R);
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', CX); line.setAttribute('y1', CY);
      line.setAttribute('x2', x); line.setAttribute('y2', y);
      gridG.appendChild(line);
    });

    /* 数据多边形 */
    const polyPts = DIMS.map((d, i) => point(i, R * (d.value / 100)).join(',')).join(' ');
    $('#radarPoly').setAttribute('points', polyPts);

    /* 标签 */
    const labelG = $('#radarLabels');
    DIMS.forEach((d, i) => {
      const [x, y] = point(i, R + 26);
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', x);
      t.setAttribute('y', y);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dominant-baseline', 'middle');
      t.textContent = d.label;
      labelG.appendChild(t);
    });
  }

  /* ------------------------------------------
     8. 歌词
     ------------------------------------------ */
  const LYRICS = [
    { text: '雪下得那么深，下得那么认真。', from: '《认真的雪》· 2006' },
    { text: '简单点，说话的方式简单点。', from: '《演员》· 2015' },
    { text: '该配合你演出的我，演视而不见。', from: '《演员》· 2015' },
    { text: '丑八怪，能否别把灯打开。', from: '《丑八怪》· 2013' },
    { text: '我们的爱情，到这刚刚好。', from: '《刚刚好》· 2016' },
    { text: '你还要我怎样，要怎样。', from: '《你还要我怎样》· 2013' },
    { text: '我想摸你的头发，只是简单的试探啊。', from: '《绅士》· 2015' },
    { text: '你像天外来物一样，求之不得。', from: '《天外来物》· 2020' }
  ];

  const lyricText = $('#lyricText');
  const lyricFrom = $('#lyricFrom');
  const lyricDots = $('#lyricDots');
  const lyricTags = $('#lyricTags');
  let lyricIdx = 0;
  let lyricTimer = null;

  function renderLyric(i, animate) {
    lyricIdx = i;
    if (!lyricText) return;
    if (animate) {
      lyricText.classList.add('fade');
      setTimeout(() => {
        lyricText.textContent = LYRICS[i].text;
        lyricFrom.textContent = LYRICS[i].from;
        lyricText.classList.remove('fade');
      }, 260);
    } else {
      lyricText.textContent = LYRICS[i].text;
      lyricFrom.textContent = LYRICS[i].from;
    }
    $$('button', lyricDots).forEach((d, idx) => d.classList.toggle('on', idx === i));
    $$('button', lyricTags).forEach((t, idx) => t.classList.toggle('on', idx === i));
  }

  if (lyricDots) {
    lyricDots.innerHTML = LYRICS.map((_, i) => `<button aria-label="第${i + 1}句"></button>`).join('');
    lyricTags.innerHTML = LYRICS.map((l, i) => `<button>${l.from.split('·')[0].trim()}</button>`).join('');

    lyricDots.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      renderLyric(Array.from(lyricDots.children).indexOf(b), true);
      restartLyricTimer();
    });
    lyricTags.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      renderLyric(Array.from(lyricTags.children).indexOf(b), true);
      restartLyricTimer();
    });

    renderLyric(0, false);

    function restartLyricTimer() {
      clearInterval(lyricTimer);
      if (reduceMotion || document.body.classList.contains('no-anim')) return;
      lyricTimer = setInterval(() => {
        renderLyric((lyricIdx + 1) % LYRICS.length, true);
      }, 5200);
    }
    restartLyricTimer();
  }

  /* ------------------------------------------
     9. 留言墙
     ------------------------------------------ */
  const STORAGE_KEY = 'jokerxue_notes_v1';
  const noteWall = $('#noteWall');
  const noteText = $('#noteText');
  const noteName = $('#noteName');
  const noteCount = $('#noteCount');
  const noteSubmit = $('#noteSubmit');

  const seedNotes = [
    { name: '一个谦友', text: '谢谢你在我最难过的那年，把《演员》写出来了。', time: '置顶' },
    { name: '南京 · 小雨', text: '第一次去你的演唱会，散场的时候全场都在唱《刚刚好》，那天下着雨。', time: '2026.09' },
    { name: '小满', text: '别人说你搞笑，只有听过你专辑的人知道，你有多认真。', time: '2026.08' }
  ];

  function loadNotes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }
  function saveNotes(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 30))); } catch {}
  }

  function noteCard(n, i) {
    const safe = s => String(s).replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
    return `
      <article class="note-card" style="animation-delay:${Math.min(i * 60, 400)}ms">
        <p>${safe(n.text)}</p>
        <div class="nc-foot">
          <span class="nc-name">${safe(n.name || '匿名谦友')}</span>
          <span>${safe(n.time || '')}</span>
        </div>
      </article>`;
  }

  function renderNotes() {
    if (!noteWall) return;
    const userNotes = loadNotes();
    noteWall.innerHTML = [...userNotes, ...seedNotes].map(noteCard).join('');
  }
  renderNotes();

  noteText?.addEventListener('input', () => {
    noteCount.textContent = noteText.value.length;
  });

  noteSubmit?.addEventListener('click', () => {
    const text = (noteText.value || '').trim();
    if (!text) {
      noteText.focus();
      noteText.style.borderColor = '#D98BA6';
      setTimeout(() => { noteText.style.borderColor = ''; }, 1200);
      return;
    }
    const now = new Date();
    const stamp = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;
    const list = loadNotes();
    list.unshift({
      name: (noteName.value || '').trim() || '匿名谦友',
      text,
      time: stamp
    });
    saveNotes(list);
    noteText.value = '';
    noteName.value = '';
    noteCount.textContent = '0';
    renderNotes();
    noteWall.firstElementChild?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  });

  /* ------------------------------------------
     10. 专辑卡片轻微视差（桌面）
     ------------------------------------------ */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    document.addEventListener('mousemove', e => {
      const card = e.target.closest('.album-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
      card.style.transformStyle = 'preserve-3d';
    });
    document.addEventListener('mouseout', e => {
      const card = e.target.closest('.album-card');
      if (card) card.style.transform = '';
    });
  }

})();
