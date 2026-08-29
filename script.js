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

// === オープニング＆ランダムポラロイド（絶対停止しないエラー制御付き） ===
const openingCover = document.getElementById('opening-cover');
const randomContainer = document.createElement('div');
randomContainer.id = 'random-photos-container';
openingCover.prepend(randomContainer);

window.addEventListener('load', () => {
  try {
    const allImgs = Array.from(document.querySelectorAll('.photo-frame img'))
      .map(img => img.getAttribute('src'))
      .filter(src => src && src.trim() !== '');

    if (allImgs.length > 0) {
      const shuffled = allImgs.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(5, shuffled.length));

      selected.forEach((src, idx) => {
        const pDiv = document.createElement('div');
        pDiv.className = `random-polaroid polaroid-${idx + 1}`;
        
        const pImg = document.createElement('img');
        pImg.src = src;

        // 画像が読み込めない場合は該当ポラロイドだけ静かに消去（処理を止めない）
        pImg.onerror = () => { pDiv.remove(); };

        pDiv.appendChild(pImg);
        randomContainer.appendChild(pDiv);

        setTimeout(() => {
          pDiv.style.opacity = '0.85';
        }, 250 + idx * 200);
      });
    }
  } catch (e) {
    console.log("ランダム画像読み込みスキップ:", e);
  }
});

// === オープニングボタン動作 ===
const startBtn = document.getElementById('startBtn');
const coverContent = document.querySelector('.cover-content');

const countOverlay = document.createElement('div');
countOverlay.id = 'countdown-overlay';
coverContent.appendChild(countOverlay);

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  
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

// === 金箔星くずアニメーション ===
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