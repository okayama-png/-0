// === 背景粒子 ===
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.2 + 0.6;
    this.speedY = -(Math.random() * 0.3 + 0.1);
    this.speedX = (Math.random() - 0.5) * 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y += this.speedY; this.x += this.speedX;
    if (this.y < 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
    ctx.fill();
  }
}
for (let i = 0; i < 50; i++) particles.push(new Particle());
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === 🔊 リアル手心音「どぅん」サウンド ===
function playHeartbeatSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const audioCtx = new AudioContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(22, audioCtx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.95, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.45);

    document.body.classList.add('heartbeat-pulse');
    setTimeout(() => document.body.classList.remove('heartbeat-pulse'), 450);
  } catch (e) {
    console.log('Audio Context error:', e);
  }
}

// === オープニング ===
const masterPhotoList = [
  'images/prologue.png', 'images/page01.png', 'images/page02.png', 'images/page03.png',
  'images/page04.png', 'images/page05.png', 'images/page06.png', 'images/page07.png',
  'images/page08.png', 'images/page09.png', 'images/page10.png', 'images/page11.png',
  'images/page12.png', 'images/page13.png', 'images/page14.png', 'images/page15.png',
  'images/page16.png', 'images/page17.png'
];

const openingCover = document.getElementById('opening-cover');
const randomContainer = document.createElement('div');
randomContainer.id = 'random-photos-container';
openingCover.prepend(randomContainer);

const butterflySVG = `
  <svg class="butterfly-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g class="wing-left">
      <path d="M50 50 C15 5, 0 25, 8 52 C18 68, 45 58, 50 50 Z" fill="url(#goldWing)"/>
      <path d="M50 52 C22 62, 12 82, 28 88 C42 90, 47 68, 50 52 Z" fill="url(#goldWing)"/>
    </g>
    <g class="wing-right">
      <path d="M50 50 C85 5, 100 25, 92 52 C82 68, 55 58, 50 50 Z" fill="url(#goldWing)"/>
      <path d="M50 52 C78 62, 88 82, 72 88 C58 90, 53 68, 50 52 Z" fill="url(#goldWing)"/>
    </g>
    <defs>
      <linearGradient id="goldWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="40%" stop-color="#f3e5ab"/>
        <stop offset="100%" stop-color="#b88e3d"/>
      </linearGradient>
    </defs>
  </svg>
`;

const ribbonContainer = document.createElement('div');
ribbonContainer.className = 'ribbon-container';
ribbonContainer.innerHTML = `
  <div class="ribbon-line-left"></div>
  <div class="ribbon-line-right"></div>
  <div class="butterfly-left">${butterflySVG}</div>
  <div class="butterfly-right">${butterflySVG}</div>
`;
document.body.prepend(ribbonContainer);

document.body.classList.add('cover-active');

window.addEventListener('load', () => {
  const shuffled = masterPhotoList.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 8);

  selected.forEach((src, idx) => {
    const pDiv = document.createElement('div');
    pDiv.className = `random-polaroid polaroid-${idx + 1}`;
    const pImg = document.createElement('img');
    pImg.src = src;
    pImg.onerror = () => pDiv.remove();
    pDiv.appendChild(pImg);
    randomContainer.appendChild(pDiv);
    setTimeout(() => { pDiv.style.opacity = '0.96'; }, 100 + idx * 70);
  });

  initPages();
  initQuiz();
  initOmikuji();
  initPhotoFlipAndZoom();
  initPassUnlock();
  initInteractiveTouch();
  startAnniversaryTimer();
});

// オープニングボタン動作
const startBtn = document.getElementById('startBtn');
const countOverlay = document.createElement('div');
countOverlay.id = 'countdown-overlay';
document.body.appendChild(countOverlay);

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';

  countOverlay.classList.add('show');
  setTimeout(() => document.body.classList.add('draw-ribbon'), 80);

  const countSequence = [3, 2, 1];
  let step = 0;

  function runCountStep() {
    if (step < countSequence.length) {
      countOverlay.innerHTML = `
        <div class="count-wrapper">
          <div class="count-num">${countSequence[step]}</div>
        </div>
      `;
      playHeartbeatSound();
      step++;
      setTimeout(runCountStep, 1200);
    } else {
      document.body.classList.remove('draw-ribbon');
      document.body.classList.add('untie-ribbon');
      document.body.classList.add('fly-heart');
      document.body.classList.add('burst-photos');

      document.querySelectorAll('.random-polaroid').forEach((p, i) => {
        const moveX = (i % 2 === 0 ? -1 : 1) * (Math.random() * 380 + 480);
        const moveY = (i < 4 ? -1 : 1) * (Math.random() * 380 + 480);
        p.style.transform = `translate3d(${moveX}px, ${moveY}px, 900px) rotate(${Math.random() * 140 - 70}deg) scale(2)`;
      });

      countOverlay.innerHTML = `<div class="start-text">START</div>`;
      playHeartbeatSound();
      launchGoldenDust();

      setTimeout(() => {
        countOverlay.classList.remove('show');
        document.body.classList.remove('cover-active');
        openingCover.classList.add('open-book');
        launchExplosion();
        triggerCameraFlash();
      }, 1200);
    }
  }

  runCountStep();
});

function launchGoldenDust() {
  for (let i = 0; i < 65; i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    const size = Math.random() * 10 + 4;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = 'radial-gradient(circle, #fff5cc 0%, #ffd54f 60%, transparent 100%)';
    p.style.boxShadow = '0 0 15px #f3e5ab, 0 0 25px #d4af37';
    p.style.borderRadius = '50%';
    p.style.left = '50vw';
    p.style.top = '50vh';
    p.style.zIndex = '99999';
    p.style.pointerEvents = 'none';
    p.style.transition = 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s ease-out, filter 1.6s ease-out';
    p.style.filter = 'blur(1px)';

    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 550 + 100;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    setTimeout(() => {
      p.style.opacity = '0';
      p.style.filter = 'blur(10px)';
      p.style.transform = `translate(${moveX}px, ${moveY}px) scale(${Math.random() * 2.5 + 1})`;
    }, 20);

    setTimeout(() => p.remove(), 1700);
  }
}

function startAnniversaryTimer() {
  const startDate = new Date('2026-07-03T00:00:00');
  const timerEl = document.getElementById('loveTimer');

  function update() {
    const now = new Date();
    const diff = now - startDate;

    if (diff < 0) {
      timerEl.textContent = 'もうすぐスタート';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    timerEl.textContent = `${days}日 ${hours}時間 ${mins}分 ${secs}秒`;
  }

  setInterval(update, 1000);
  update();
}

function initPhotoFlipAndZoom() {
  const columns = document.querySelectorAll('.photo-column');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  columns.forEach(col => {
    const frame = col.querySelector('.photo-frame');
    const zoomBtn = col.querySelector('.photo-zoom-btn');

    if (frame) {
      frame.addEventListener('click', (e) => {
        frame.classList.toggle('flipped-photo');
      });
    }

    if (zoomBtn && frame) {
      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const img = frame.querySelector('.photo-front img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
        }
      });
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
  }
}

function initPassUnlock() {
  const unlockBtn = document.getElementById('unlockBtn');
  const passInput = document.getElementById('passInput');
  const passMessage = document.getElementById('passMessage');
  const secretLetter = document.getElementById('secretLetter');

  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      if (passInput.value === '0703') {
        passMessage.style.color = '#2d8a4e';
        passMessage.textContent = '鍵が開きました';
        secretLetter.style.display = 'block';
        launchExplosion();
      } else {
        passMessage.style.color = '#c0392b';
        passMessage.textContent = 'パスワードが違います（ヒント: 0703）';
      }
    });
  }
}

function initInteractiveTouch() {
  window.addEventListener('click', (e) => {
    if (document.body.classList.contains('cover-active')) return;
    if (e.target.tagName === 'BUTTON' || e.target.closest('.photo-column')) return;
    
    for (let i = 0; i < 5; i++) {
      const p = document.createElement('div');
      p.textContent = ['✨', '🌸', '⭐'][Math.floor(Math.random() * 3)];
      p.style.position = 'fixed';
      p.style.left = e.clientX + 'px';
      p.style.top = e.clientY + 'px';
      p.style.fontSize = Math.random() * 1.1 + 0.9 + 'rem';
      p.style.pointerEvents = 'none';
      p.style.zIndex = '9999';
      p.style.transition = 'transform 0.9s ease-out, opacity 0.9s ease-out';

      document.body.appendChild(p);

      const moveX = (Math.random() - 0.5) * 100;
      const moveY = (Math.random() - 0.5) * 100;

      setTimeout(() => {
        p.style.opacity = '0';
        p.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
      }, 20);

      setTimeout(() => p.remove(), 950);
    }
  });
}

// ★ 上品なパタンめくり ＆ 無駄な待ち時間ゼロの即時表示 ★
let pages = [];
let currentPage = 0;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNum = document.getElementById('pageNum');
const totalPages = document.getElementById('totalPages');

function initPages() {
  pages = Array.from(document.querySelectorAll('.page'));
  if (totalPages) totalPages.textContent = pages.length;

  pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
    page.classList.remove('flipped', 'active');
    if (!page.querySelector('.page-reaction-wrapper')) {
      setupPageReaction(page, index);
    }
  });

  currentPage = 0;
  updateActivePage();
  updateUI();
}

function updateActivePage() {
  pages.forEach((page, index) => {
    if (index === currentPage) page.classList.add('active');
    else page.classList.remove('active');
  });
}

function setupPageReaction(pageEl, pageIdx) {
  const diaryEntry = pageEl.querySelector('.diary-entry');
  if (!diaryEntry) return;

  const reactionWrapper = document.createElement('div');
  reactionWrapper.className = 'page-reaction-wrapper';

  const reactions = [
    { id: 'like', icon: '💖', label: 'すき' },
    { id: 'emo',  icon: '✨', label: 'エモい' },
    { id: 'cry',  icon: '😭', label: '泣ける' },
    { id: 'laugh',icon: '🤣', label: 'ウケる' },
    { id: 'go',   icon: '🎆', label: '行こう' }
  ];

  reactions.forEach(item => {
    const storageKey = `minami_p${pageIdx + 1}_${item.id}`;
    let countVal = parseInt(localStorage.getItem(storageKey) || '0', 10);

    const btn = document.createElement('button');
    btn.className = 'stamp-btn';
    btn.innerHTML = `${item.icon} <span class="stamp-count">${countVal}</span>`;

    btn.addEventListener('click', (e) => {
      countVal++;
      localStorage.setItem(storageKey, countVal);
      btn.querySelector('.stamp-count').textContent = countVal;
      btn.classList.add('pop-anim');
      setTimeout(() => btn.classList.remove('pop-anim'), 300);
      launchStampEffect(item.icon, e.clientX, e.clientY);
    });

    reactionWrapper.appendChild(btn);
  });

  diaryEntry.appendChild(reactionWrapper);
}

nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.add('flipped');
    currentPage++;
    updateActivePage();
    updateUI();
    launchExplosion();
    triggerCameraFlash();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove('flipped');
    updateActivePage();
    updateUI();
    launchExplosion();
    triggerCameraFlash();
  }
});

function updateUI() {
  if (prevBtn) prevBtn.disabled = currentPage === 0;
  if (nextBtn) nextBtn.disabled = currentPage === pages.length - 1;
  if (pageNum) pageNum.textContent = currentPage + 1;
}

function initQuiz() {
  const quizBoxes = document.querySelectorAll('.quiz-box');
  quizBoxes.forEach(box => {
    const btns = box.querySelectorAll('.quiz-btn');
    const resultDiv = box.querySelector('.quiz-result');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          resultDiv.style.color = '#2d8a4e';
          resultDiv.textContent = '正解です！';
          launchExplosion();
        } else {
          resultDiv.style.color = '#c0392b';
          resultDiv.textContent = '残念、もう一度確認してみてください。';
        }
      });
    });
  });
}

function initOmikuji() {
  const omikujiBtn = document.getElementById('omikujiBtn');
  if (!omikujiBtn) return;

  const fortunes = [
    '【超大吉】今日はお泊まり決定。朝までゆっくり過ごせます',
    '【大吉】みなみさんのおねだりが何でも通る特別な日',
    '【会える吉】今ゆなに「会いたい」と連絡したら、すぐ会えるよ',
    '【電話吉】今日はふたりでゆっくり電話する日。声を聞くだけで幸せです',
    '【散歩吉】一緒に手をつないでお散歩する日。風が気持ちいいです',
    '【遠出吉】遠出注意報が出ています。ふたりのワクワクが止まりません',
    '【グルメ吉】どこか美味しいものを食べに行っちゃう日',
    '【映画吉】ふたりで何か映画を観に行っちゃう？ポップコーンを買ってのんびり過ごす日',
    '【メロ大吉】結南がみなみさんにメロメロで離れてくれません',
    '【キスマ吉】キスマ攻防戦が開幕。今日勝つのはどちらでしょうか',
    '【サウナ吉】一緒にサウナや温泉旅行の計画を立てると吉です',
    '【手作吉】手作りお弁当を二人で食べると幸せに包まれます',
    '【ハグ吉】今すぐぎゅーっと抱きしめ合うと運気が上がります',
    '【居酒屋吉】チンチロメガジョッキ引き当て注意報発令中',
    '【花火吉】今年の手持ち花火の予定を今すぐ立てましょう',
    '【デュエット吉】ギターとピアノで二人で合奏すると最高です',
    '【ずっと一緒吉】未来の「いってらっしゃい」にまた一歩近づく日です'
  ];

  omikujiBtn.addEventListener('click', () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    alert(`🎲 今日のふたりの運勢 🎲\n\n${randomFortune}`);
    launchExplosion();
  });
}

function launchExplosion() {
  if (document.body.classList.contains('cover-active')) return;
  const colors = ['#f1c40f', '#e74c3c', '#e91e63', '#9b59b6', '#2ecc71', '#3498db', '#d4af37', '#ffffff'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.width = Math.random() * 8 + 5 + 'px';
    p.style.height = p.style.width;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.backgroundColor = color;
    p.style.left = '50vw';
    p.style.top = '50vh';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    p.style.zIndex = '9999';
    p.style.pointerEvents = 'none';
    p.style.transition = 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.8s ease-out';

    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 350 + 80;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    setTimeout(() => {
      p.style.opacity = '0';
      p.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 360}deg)`;
    }, 20);

    setTimeout(() => p.remove(), 1900);
  }
}

function launchStampEffect(icon, originX, originY) {
  for (let i = 0; i < 15; i++) {
    const h = document.createElement('div');
    h.textContent = icon;
    h.style.position = 'fixed';
    h.style.fontSize = Math.random() * 1.4 + 1.1 + 'rem';
    h.style.left = (originX || window.innerWidth / 2) + (Math.random() * 50 - 25) + 'px';
    h.style.top = (originY || window.innerHeight / 2) + 'px';
    h.style.zIndex = '9999';
    h.style.pointerEvents = 'none';
    h.style.transition = 'transform 1.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.3s ease-out';

    document.body.appendChild(h);

    const moveX = (Math.random() - 0.5) * 180;
    const moveY = -(Math.random() * 200 + 80);

    setTimeout(() => {
      h.style.opacity = '0';
      h.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
    }, 20);

    setTimeout(() => h.remove(), 1350);
  }
}

function triggerCameraFlash() {
  if (document.body.classList.contains('cover-active')) return;
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.top = '0'; flash.style.left = '0';
  flash.style.width = '100vw'; flash.style.height = '100vh';
  flash.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
  flash.style.zIndex = '9998';
  flash.style.pointerEvents = 'none';
  flash.style.transition = 'opacity 0.45s ease-out';
  flash.style.opacity = '1';

  document.body.appendChild(flash);
  setTimeout(() => flash.style.opacity = '0', 40);
  setTimeout(() => flash.remove(), 500);
}