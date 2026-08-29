// === 背景粒子レンダラー ===
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.0 + 0.5;
    this.speedY = -(Math.random() * 0.3 + 0.1);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y < 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(184, 142, 61, ${this.opacity})`;
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#e5cd8d';
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === オープニングポラロイド制御 ===
const masterPhotoList = [
  'images/prologue.png',
  'images/page01.png', 'images/page02.png', 'images/page03.png', 'images/page04.png',
  'images/page05.png', 'images/page06.png', 'images/page07.png', 'images/page08.png',
  'images/page09.png', 'images/page10.png', 'images/page11.png', 'images/page12.png',
  'images/page13.png', 'images/page14.png', 'images/page15.png', 'images/page16.png',
  'images/page17.png'
];

const openingCover = document.getElementById('opening-cover');
const randomContainer = document.createElement('div');
randomContainer.id = 'random-photos-container';
openingCover.prepend(randomContainer);

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

    setTimeout(() => { pDiv.style.opacity = '0.96'; }, 120 + idx * 80);
  });

  // 初期化
  initQuiz();
  initOmikuji();
  initSecretBox();
});

// === カバーオープン＆カウントダウン ===
const startBtn = document.getElementById('startBtn');
const coverContent = document.querySelector('.cover-content');

const countOverlay = document.createElement('div');
countOverlay.id = 'countdown-overlay';
coverContent.appendChild(countOverlay);

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  
  document.querySelectorAll('.random-polaroid').forEach(p => {
    p.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out';
    p.style.opacity = '0';
    p.style.transform = 'scale(1.8) translateY(-20px)';
  });

  countOverlay.classList.add('show');
  let count = 3;
  countOverlay.textContent = count;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countOverlay.textContent = count;
    } else {
      clearInterval(timer);
      countOverlay.textContent = "START";
      setTimeout(() => {
        openingCover.classList.add('open-book');
        launchSparkles();
        triggerCameraFlash();
      }, 350);
    }
  }, 650);
});

// === ページめくり制御 ===
const pages = Array.from(document.querySelectorAll('.page'));
let currentPage = 0;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNum = document.getElementById('pageNum');
const totalPages = document.getElementById('totalPages');

totalPages.textContent = pages.length;

function initPages() {
  pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
    setupPageReaction(page, index);
  });
  updateActivePage();
}

function updateActivePage() {
  pages.forEach((page, index) => {
    if (index === currentPage) page.classList.add('active');
    else page.classList.remove('active');
  });
}

// === スタンプ機能 ===
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
    btn.title = item.label;

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

initPages();

nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.add('flipped');
    currentPage++;
    updateActivePage();
    updateUI();
    launchSparkles();
    triggerCameraFlash();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove('flipped');
    updateActivePage();
    updateUI();
    launchSparkles();
    triggerCameraFlash();
  }
});

function updateUI() {
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;
  pageNum.textContent = currentPage + 1;
}

// === 💡 クイズシステム ===
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
          resultDiv.textContent = '🎉 大正解！さすがみなみさん！';
          launchConfetti();
        } else {
          resultDiv.style.color = '#c0392b';
          resultDiv.textContent = '❌ 残念〜！もう一回本文を読んでみてね（笑）';
        }
      });
    });
  });
}

// 大正解の紙吹雪（Confetti）
function launchConfetti() {
  const colors = ['#f1c40f', '#e74c3c', '#e91e63', '#9b59b6', '#2ecc71', '#3498db'];
  for (let i = 0; i < 45; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 8 + 6 + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.transition = 'transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease';

    document.body.appendChild(confetti);

    const moveX = (Math.random() - 0.5) * 200;
    const moveY = window.innerHeight + 50;

    setTimeout(() => {
      confetti.style.opacity = '0';
      confetti.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 720}deg)`;
    }, 20);

    setTimeout(() => confetti.remove(), 2600);
  }
}

// === 🎲 運勢おみくじ（最新修正版） ===
function initOmikuji() {
  const omikujiBtn = document.getElementById('omikujiBtn');
  if (!omikujiBtn) return;

  const fortunes = [
    '【超大吉 💖】今日はお泊まり決定！朝まで甘々タイム確定です！',
    '【大吉 ✨】みなみのおねだりが何でも通る特別デー！',
    '【会える吉 💌】今ゆなに「会いたい」って連絡したら、多分すぐ会えるよ！',
    '【電話吉 📞】今日はふたりでゆっくり電話する日！声を聞くだけで幸せ',
    '【散歩吉 🐾】一緒に手をつないでお散歩する日！風が気持ちいいよ',
    '【遠出吉 🚗】遠出注意報が出ています！ふたりのワクワクが止まらない',
    '【グルメ吉 🍣】どこか美味しいものを食べに行っちゃう日！何食べる？',
    '【映画吉 🍿】ふたりで何か映画を観に行っちゃう？ポップコーン買ってイチャイチャする日！',
    '【メロ大吉 🤤】結南がみなみにメロメロすぎて離れてくれません！',
    '【キスマ吉 💋】キスマ攻防戦が開幕！今日勝つのはどっち！？',
    '【サウナ吉 ♨️】一緒にサウナ＆温泉旅行の計画を立てると吉！',
    '【手作吉 🍱】手作りお弁当を二人で食べると幸せ爆発！',
    '【ハグ吉 🫂】今すぐぎゅーって抱きしめ合うと運気爆上がり！',
    '【居酒屋吉 🍻】チンチロメガジョッキ引き当て注意報発令中（笑）！',
    '【花火吉 🎆】今年の手持ち花火の予定を今すぐ立てよう！',
    '【デュエット吉 🎸】ギターとピアノで二人で合奏すると最高！',
    '【ずっと一緒吉 💍】未来の「いってらっしゃい」にまた一歩近づく日✨'
  ];

  omikujiBtn.addEventListener('click', () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    alert(`🎲 今日のふたりの運勢 🎲\n\n${randomFortune}`);
    launchSparkles();
    launchConfetti();
  });
}

// === 💌 シークレット袋とじ ===
function initSecretBox() {
  const openSecretBtn = document.getElementById('openSecretBtn');
  const secretContent = document.getElementById('secretContent');

  if (openSecretBtn && secretContent) {
    openSecretBtn.addEventListener('click', () => {
      secretContent.style.display = 'block';
      openSecretBtn.style.display = 'none';
      launchSparkles();
      launchConfetti();
    });
  }
}

// === マイクロアニメーション ===
function launchStampEffect(icon, originX, originY) {
  for (let i = 0; i < 18; i++) {
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

    const moveX = (Math.random() - 0.5) * 200;
    const moveY = -(Math.random() * 220 + 80);

    setTimeout(() => {
      h.style.opacity = '0';
      h.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.3) rotate(${(Math.random() - 0.5) * 60}deg)`;
    }, 20);

    setTimeout(() => h.remove(), 1350);
  }
}

function triggerCameraFlash() {
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.top = '0'; flash.style.left = '0';
  flash.style.width = '100vw'; flash.style.height = '100vh';
  flash.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
  flash.style.zIndex = '9998';
  flash.style.pointerEvents = 'none';
  flash.style.transition = 'opacity 0.45s ease-out';
  flash.style.opacity = '1';

  document.body.appendChild(flash);
  setTimeout(() => flash.style.opacity = '0', 40);
  setTimeout(() => flash.remove(), 500);
}

function launchSparkles() {
  const colors = ['#b88e3d', '#e5cd8d', '#ffffff', '#c9bcab'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.width = Math.random() * 5 + 2.5 + 'px';
    p.style.height = p.style.width;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.backgroundColor = color;
    p.style.boxShadow = `0 0 8px ${color}`;
    p.style.left = Math.random() * 80 + 10 + 'vw';
    p.style.top = Math.random() * 80 + 10 + 'vh';
    p.style.borderRadius = '50%';
    p.style.zIndex = '9999';
    p.style.pointerEvents = 'none';
    p.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';

    document.body.appendChild(p);

    setTimeout(() => {
      p.style.opacity = '1';
      p.style.transform = `translateY(-30px) scale(${Math.random() * 1.2 + 0.5})`;
    }, 30);
    setTimeout(() => p.style.opacity = '0', 1000);
    setTimeout(() => p.remove(), 1550);
  }
}