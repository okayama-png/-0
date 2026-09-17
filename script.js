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
    this.size = Math.random() * 2.0 + 0.5;
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
for (let i = 0; i < 45; i++) particles.push(new Particle());
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === 🔊 リアル心音 ===
function playHeartbeatSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const audioCtx = new AudioContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(22, audioCtx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.95, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);

    document.body.classList.add('heartbeat-pulse');
    setTimeout(() => document.body.classList.remove('heartbeat-pulse'), 400);
  } catch (e) {
    console.log('Audio Context error:', e);
  }
}

// === 📖 data.jsからアルバムDOMを動的に生成 ===
function renderAlbumPages() {
  const container = document.getElementById('albumContainer');
  if (!container || typeof albumData === 'undefined') return;

  container.innerHTML = '<div class="book-spine"></div>';

  albumData.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = `page ${index === 0 ? 'active' : ''}`;
    article.id = `page${index + 1}`;

    let quizHtml = '';
    if (item.id === "001") {
      quizHtml = `
        <div class="quiz-box">
          <div class="quiz-title">❓ みなみさんクイズ #1</div>
          <p class="quiz-q">この夜、公園でずっとキスした時の思い出の味は？</p>
          <div class="quiz-options">
            <button class="quiz-btn" data-correct="false">① いちご味 🍓</button>
            <button class="quiz-btn" data-correct="true">② コーヒー味 ☕</button>
            <button class="quiz-btn" data-correct="false">③ もんじゃ味 🥢</button>
          </div>
          <div class="quiz-result"></div>
        </div>`;
    } else if (item.id === "007") {
      quizHtml = `
        <div class="quiz-box">
          <div class="quiz-title">❓ みなみさんクイズ #2</div>
          <p class="quiz-q">一番後ろの席を取ろうとして、結南がやらかした大ポカは？</p>
          <div class="quiz-options">
            <button class="quiz-btn" data-correct="false">① 映画館を間違えた 🎬</button>
            <button class="quiz-btn" data-correct="true">② チケットを1枚しか取ってなかった 🎟️</button>
            <button class="quiz-btn" data-correct="false">③ ポップコーンをこぼした 🍿</button>
          </div>
          <div class="quiz-result"></div>
        </div>`;
    } else if (item.id === "010") {
      quizHtml = `
        <div class="quiz-box">
          <div class="quiz-title">❓ みなみさんクイズ #3</div>
          <p class="quiz-q">結南がガラスコップの前に買おうとしてたプレゼントは？</p>
          <div class="quiz-options">
            <button class="quiz-btn" data-correct="false">① リンドール 🍫</button>
            <button class="quiz-btn" data-correct="true">② 花束 🌸</button>
            <button class="quiz-btn" data-correct="false">③ 服 👖</button>
          </div>
          <div class="quiz-result"></div>
        </div>`;
    }

    article.innerHTML = `
      <div class="photo-column">
        <div class="photo-frame" title="タップで裏面を見る">
          <div class="photo-inner">
            <div class="photo-front"><img src="${item.image}" alt="${item.title}"></div>
            <div class="photo-back"><p class="back-text">${item.backText}</p></div>
          </div>
        </div>
        <div class="photo-btn-group">
          <button class="photo-zoom-btn">🔍 写真を拡大</button>
        </div>
      </div>
      <div class="diary-entry">
        <div class="entry-content">
          <span class="page-tag">${item.tag}</span>
          <h2 class="date-title">${item.title}</h2>
          <p class="text">${item.text}</p>
          ${quizHtml}
        </div>
        <div class="author">結南</div>
      </div>
    `;
    container.appendChild(article);
  });

  const epilogueArticle = document.createElement('article');
  epilogueArticle.className = 'page layout-photocard';
  epilogueArticle.id = `page${albumData.length + 1}`;
  epilogueArticle.innerHTML = `
    <div class="photo-column">
      <div class="photo-frame">
        <div class="photo-inner">
          <div class="photo-front"><img id="epilogueRandomImg" src="images/prologue.png" alt="秘密のメッセージ"></div>
          <div class="photo-back"><p class="back-text">🔑 ふたりの秘密の暗号だよ</p></div>
        </div>
      </div>
      <div class="photo-btn-group">
        <button class="photo-zoom-btn">🔍 写真を拡大</button>
      </div>
    </div>
    <div class="diary-entry">
      <div class="entry-content">
        <span class="page-tag">EPILOGUE</span>
        <h2 class="date-title">秘密のメッセージ</h2>
        <p class="text">最後までアルバムを見てくれてありがとう！\n\nふたりの大切な記念日（4桁）を入力すると、特別なお手紙が開きます。</p>
        <div class="secret-pass-box">
          <div class="pass-title">🔒 秘密の鍵（ふたりが付き合った月日4桁を入力）</div>
          <div class="pass-input-group">
            <input type="password" id="passInput" maxlength="4" placeholder="例: 0101">
            <button id="unlockBtn">UNLOCK</button>
          </div>
          <div id="passMessage" class="pass-msg"></div>
          <div id="secretLetter" class="secret-letter" style="display: none;">
            <h3> I Love You </h3>
            <p>${typeof secretLetterText !== 'undefined' ? secretLetterText : ''}</p>
          </div>
        </div>
      </div>
      <div class="author">結南</div>
    </div>
  `;
  container.appendChild(epilogueArticle);
}

// 📱 オープニングカバー上に上下4枚ずつのポラロイド写真を生成する関数
function renderCoverPolaroids() {
  const openingCover = document.getElementById('opening-cover');
  if (!openingCover) return;

  // コンテナの準備
  let randomContainer = document.getElementById('random-photos-container');
  if (!randomContainer) {
    randomContainer = document.createElement('div');
    randomContainer.id = 'random-photos-container';
    openingCover.prepend(randomContainer);
  } else {
    randomContainer.innerHTML = '';
  }

  if (typeof masterPhotoList === 'undefined' || masterPhotoList.length === 0) return;

  const shuffled = [...masterPhotoList].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 8);

  selected.forEach((src, idx) => {
    const pDiv = document.createElement('div');
    pDiv.className = `random-polaroid polaroid-${idx + 1}`;
    const pImg = document.createElement('img');
    pImg.src = src;
    pImg.onerror = () => pDiv.remove();
    pDiv.appendChild(pImg);
    randomContainer.appendChild(pDiv);
    
    // 時間差でふわっとフェードイン
    setTimeout(() => { pDiv.style.opacity = '0.96'; }, 100 + idx * 70);
  });
}

// 画像リストの定義
let masterPhotoList = [];

// イニシャライズ
const openingCover = document.getElementById('opening-cover');

window.addEventListener('load', () => {
  renderAlbumPages();

  if (typeof albumData !== 'undefined') {
    masterPhotoList = albumData.map(d => d.image);
    // 拡張写真があれば追加
    const extraPhotos = ['images/extra11.png', 'images/extra12.png', 'images/extra13.png', 'images/extra14.png', 'images/extra15.png', 'images/extra16.png'];
    masterPhotoList.push(...extraPhotos);
  }

  if (window.location.hash === '#album') {
    document.body.classList.remove('cover-active');
    if (openingCover) {
      openingCover.classList.add('open-book');
      openingCover.style.display = 'none';
    }
  } else {
    document.body.classList.add('cover-active');
    // オープニング写真の浮遊表示を生成
    renderCoverPolaroids();
  }

  setupRandomEpiloguePhoto();
  applyFilmTimestamps();
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
if (startBtn) {
  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    document.body.classList.add('curtain-closed');
    launchPhotoPageTransition(() => {
      document.body.classList.remove('cover-active');
      if (openingCover) {
        openingCover.classList.add('open-book');
        openingCover.style.display = 'none';
      }
      setTimeout(() => {
        document.body.classList.remove('curtain-closed');
      }, 100);
    });
  });
}

function setupRandomEpiloguePhoto() {
  const epilogueImg = document.getElementById('epilogueRandomImg');
  if (epilogueImg && masterPhotoList.length > 0) {
    const randomSrc = masterPhotoList[Math.floor(Math.random() * masterPhotoList.length)];
    epilogueImg.src = randomSrc;
  }
}

function applyFilmTimestamps() {
  const photoFrames = document.querySelectorAll('.photo-frame');
  photoFrames.forEach(frame => {
    const front = frame.querySelector('.photo-front');
    const page = frame.closest('.page');
    if (!front || !page) return;

    let dateStr = "2026 MEMORIES";
    const textContent = page.querySelector('.text')?.textContent || '';
    const match = textContent.match(/\d{4}\.\d{2}\.\d{2}/);
    if (match) {
      dateStr = match[0];
    }

    if (!front.querySelector('.film-timestamp')) {
      const stamp = document.createElement('div');
      stamp.className = 'film-timestamp';
      stamp.textContent = `'${dateStr.slice(2)}`;
      front.appendChild(stamp);
    }
  });
}

function launchPhotoPageTransition(onComplete) {
  if (masterPhotoList.length === 0) {
    if (onComplete) onComplete();
    return;
  }
  const shuffledPhotos = [...masterPhotoList].sort(() => 0.5 - Math.random());
  const burstCount = Math.min(6, shuffledPhotos.length);
  const isMobile = window.innerWidth <= 768;

  let count = 0;
  let lastTime = performance.now();
  const interval = 380;

  function spawnStep(now) {
    if (now - lastTime >= interval && count < burstCount) {
      lastTime = now;

      const photoContainer = document.createElement('div');
      photoContainer.className = 'burst-photo-fly';

      const posX = Math.random() * 50 + 25;
      const posY = Math.random() * 50 + 25;
      photoContainer.style.left = posX + 'vw';
      photoContainer.style.top = posY + 'vh';

      const cardW = isMobile ? (Math.random() * 50 + 180) : (Math.random() * 80 + 260);
      photoContainer.style.width = cardW + 'px';
      photoContainer.style.height = (cardW * 0.75) + 'px';

      const img = document.createElement('img');
      img.src = shuffledPhotos[count];
      photoContainer.appendChild(img);

      const startRot = (Math.random() - 0.5) * 16;
      const endRot = startRot + (Math.random() - 0.5) * 12;
      photoContainer.style.setProperty('--start-rot', `${startRot}deg`);
      photoContainer.style.setProperty('--end-rot', `${endRot}deg`);

      document.body.appendChild(photoContainer);
      setTimeout(() => photoContainer.remove(), 2200);

      count++;
    }

    if (count < burstCount) {
      requestAnimationFrame(spawnStep);
    } else {
      setTimeout(() => showFinalHeroPhoto(onComplete), 500);
    }
  }

  requestAnimationFrame(spawnStep);
}

function showFinalHeroPhoto(onComplete) {
  const heroDiv = document.createElement('div');
  heroDiv.className = 'final-hero-photo';

  const heroImg = document.createElement('img');
  heroImg.src = masterPhotoList[0] || 'images/prologue.png';
  heroDiv.appendChild(heroImg);

  document.body.appendChild(heroDiv);

  requestAnimationFrame(() => {
    heroDiv.classList.add('active-show');
  });

  playHeartbeatSound();

  setTimeout(() => {
    if (onComplete) onComplete();
    heroDiv.classList.add('absorb-into-album');
    setTimeout(() => heroDiv.remove(), 850);
  }, 1000);
}

function startAnniversaryTimer() {
  const startDate = new Date('2026-07-03T00:00:00');
  const timerEl = document.getElementById('loveTimer');

  function update() {
    if (!timerEl) return;
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
        passMessage.textContent = '鍵が開きました🔑💖';
        secretLetter.style.display = 'block';
        playHeartbeatSound();
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
      p.style.fontSize = Math.random() * 1.0 + 0.8 + 'rem';
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

// ページめくり制御
let pages = [];
let currentPage = 0;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNum = document.getElementById('pageNum');
const totalPages = document.getElementById('totalPages');

function initPages() {
  pages = Array.from(document.querySelectorAll('.page'));
  if (totalPages) totalPages.textContent = pages.length;

  currentPage = 0;
  updateActivePage();
  updateUI();
}

function updateActivePage() {
  pages.forEach((page, index) => {
    if (index < currentPage) {
      page.classList.add('flipped');
      page.classList.remove('active');
    } else if (index === currentPage) {
      page.classList.remove('flipped');
      page.classList.add('active');
    } else {
      page.classList.remove('flipped', 'active');
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      updateActivePage();
      updateUI();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateActivePage();
      updateUI();
    }
  });
}

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
    '【おでかけ吉】今日はふたりで寄り道する日。見たことのない景色に会いに行こう',
    '【あ〜ん吉】美味しいものを「あ〜ん」し合う日。甘い時間と笑顔が溢れます',
    '【甘やかし吉】今日はみなみさんを全力で甘やかす日。おねだりもワガママも全部OK！',
    '【おうちデート吉】どこにも出かけずお部屋でごろごろする日。手をつないで映画でも観よう',
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
  });
}