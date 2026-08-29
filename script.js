// === 背景の浮遊ゴールド粒子 Canvas ===
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
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedY = -(Math.random() * 0.4 + 0.15);
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.7 + 0.3;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y < 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#d4af37';
    ctx.fill();
  }
}

for (let i = 0; i < 65; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === 自動ランダム写真抽選システム（全自動） ===
const openingCover = document.getElementById('opening-cover');
const randomContainer = document.createElement('div');
randomContainer.id = 'random-photos-container';
openingCover.prepend(randomContainer);

// 【設定】追加した「extra1.png 〜 extra●.png」の合計枚数を指定するだけ！
const extraPhotoCount = 10; // ← 例: extraが10枚あるならここを 10 にするだけ！

window.addEventListener('DOMContentLoaded', () => {
  // 1. アルバム内の写真（page01.png等）を全自動で取得
  const albumPhotos = Array.from(document.querySelectorAll('.photo-frame img')).map(img => img.getAttribute('src'));
  
  // 2. extra1.png 〜 extra●.png のパスを自動生成
  const extraPhotos = [];
  for (let i = 1; i <= extraPhotoCount; i++) {
    extraPhotos.push(`images/extra${i}.png`);
  }

  // 3. アルバム写真 ＋ 追加写真を合体
  const allPhotoPool = [...albumPhotos, ...extraPhotos];

  if (allPhotoPool.length > 0) {
    // ランダムにシャッフルして5枚抽出
    const shuffled = allPhotoPool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(5, shuffled.length));

    selected.forEach((src, idx) => {
      const pDiv = document.createElement('div');
      pDiv.className = `random-polaroid polaroid-${idx + 1}`;
      
      const pImg = document.createElement('img');
      pImg.src = src;
      
      // 画像が存在しない（読み込めない）場合のエラー防止
      pImg.onerror = () => { pDiv.style.display = 'none'; };
      
      pDiv.appendChild(pImg);
      randomContainer.appendChild(pDiv);

      // 時間差でふんわりフェードイン
      setTimeout(() => {
        pDiv.style.opacity = '0.85';
      }, 250 + idx * 200);
    });
  }
});

// === シネマティック カウントダウン オープニング ===
const startBtn = document.getElementById('startBtn');
const coverContent = document.querySelector('.cover-content');

const countOverlay = document.createElement('div');
countOverlay.id = 'countdown-overlay';
coverContent.appendChild(countOverlay);

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  
  // ポラロイド写真を消す
  const polaroids = document.querySelectorAll('.random-polaroid');
  polaroids.forEach(p => {
    p.style.opacity = '0';
    p.style.transform = 'scale(0.5)';
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
      }, 400);
    }
  }, 700);
});

// === ページめくり処理 ===
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
  });
  updateActivePage();
}

function updateActivePage() {
  pages.forEach((page, index) => {
    if (index === currentPage) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
}

initPages();

nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.add('flipped');
    currentPage++;
    updateActivePage();
    updateUI();
    launchSparkles();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    pages[currentPage].classList.remove('flipped');
    updateActivePage();
    updateUI();
    launchSparkles();
  }
});

function updateUI() {
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;
  pageNum.textContent = currentPage + 1;
}

// === 上品な金箔・星くず演出 ===
function launchSparkles() {
  const colors = ['#d4af37', '#f5e6c8', '#ffffff', '#e2d9c8'];
  
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.width = Math.random() * 6 + 3 + 'px';
    p.style.height = p.style.width;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.backgroundColor = color;
    p.style.boxShadow = `0 0 8px ${color}`;
    p.style.left = Math.random() * 80 + 10 + 'vw';
    p.style.top = Math.random() * 80 + 10 + 'vh';
    p.style.borderRadius = '50%';
    p.style.zIndex = '9999';
    p.style.pointerEvents = 'none';
    p.style.opacity = '0';
    p.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';

    document.body.appendChild(p);

    setTimeout(() => {
      p.style.opacity = '1';
      p.style.transform = `translateY(-30px) scale(${Math.random() * 1.2 + 0.5})`;
    }, 30);

    setTimeout(() => {
      p.style.opacity = '0';
    }, 1000);

    setTimeout(() => {
      p.remove();
    }, 1600);
  }
}