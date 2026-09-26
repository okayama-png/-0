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

// グローバル変数
let masterPhotoList = [];
let pages = [];
let currentPage = 0;
let polaroidSlideTimer = null;

// === 📖 アルバムDOM生成 ===
function renderAlbumPages() {
  const container = document.getElementById('albumContainer');
  if (!container) return;

  const sourceData = (typeof albumData !== 'undefined' && Array.isArray(albumData)) ? albumData : [];

  container.innerHTML = '<div class="book-spine"></div>';

  sourceData.forEach((item, index) => {
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

    const textFormatted = item.text ? item.text.replace(/\n/g, '<br>') : '';

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
          <p class="text">${textFormatted}</p>
          ${quizHtml}
        </div>
        <div class="author">結南</div>
      </div>
    `;
    container.appendChild(article);
  });

  const epilogueArticle = document.createElement('article');
  epilogueArticle.className = 'page layout-photocard';
  epilogueArticle.id = `page${sourceData.length + 1}`;
  
  const letterText = typeof secretLetterText !== 'undefined' ? secretLetterText : '';
  const secretTextFormatted = letterText ? letterText.replace(/\n/g, '<br>') : '';

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
        <p class="text">最後までアルバムを見てくれてありがとう！<br><br>ふたりの大切な記念日（4桁）を入力すると、特別なお手紙が開きます。</p>
        <div class="secret-pass-box">
          <div class="pass-title">🔒 秘密の鍵（ふたりが付き合った月日4桁を入力）</div>
          <div class="pass-input-group">
            <input type="password" id="passInput" maxlength="4" placeholder="例: 0101">
            <button id="unlockBtn">UNLOCK</button>
          </div>
          <div id="passMessage" class="pass-msg"></div>
          <div id="secretLetter" class="secret-letter" style="display: none;">
            <h3> I Love You </h3>
            <p>${secretTextFormatted}</p>
          </div>
        </div>
      </div>
      <div class="author">結南</div>
    </div>
  `;
  container.appendChild(epilogueArticle);
}

// 📱 2枚同時にじわ〜っと写真がフェード切り替えされるオープニング演出
function renderCoverPolaroids() {
  const openingCover = document.getElementById('opening-cover');
  if (!openingCover) return;

  let randomContainer = document.getElementById('random-photos-container');
  if (!randomContainer) {
    randomContainer = document.createElement('div');
    randomContainer.id = 'random-photos-container';
    openingCover.prepend(randomContainer);
  } else {
    randomContainer.innerHTML = '';
  }

  if (masterPhotoList.length === 0) return;

  const shuffled = [...masterPhotoList].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 8);

  selected.forEach((src, idx) => {
    const pDiv = document.createElement('div');
    pDiv.className = `random-polaroid polaroid-${idx + 1}`;
    
    const imgContainer = document.createElement('div');
    imgContainer.className = 'polaroid-img-box';
    imgContainer.style.width = '100%';
    imgContainer.style.height = '100%';
    imgContainer.style.position = 'relative';
    imgContainer.style.overflow = 'hidden';
    imgContainer.style.borderRadius = '2px';

    const pImg = document.createElement('img');
    pImg.src = src;
    pImg.style.width = '100%';
    pImg.style.height = '100%';
    pImg.style.objectFit = 'cover';
    pImg.style.transition = 'opacity 1.2s ease-in-out';
    pImg.style.opacity = '1';

    imgContainer.appendChild(pImg);
    pDiv.appendChild(imgContainer);
    randomContainer.appendChild(pDiv);
    
    setTimeout(() => { pDiv.style.opacity = '0.96'; }, 100 + idx * 70);
  });

  if (polaroidSlideTimer) clearInterval(polaroidSlideTimer);
  
  let unusedPhotos = masterPhotoList.filter(p => !selected.includes(p));
  if (unusedPhotos.length === 0) unusedPhotos = [...masterPhotoList];

  polaroidSlideTimer = setInterval(() => {
    const frames = Array.from(document.querySelectorAll('.random-polaroid img'));
    if (frames.length < 2) return;

    const shuffledIndices = frames.map((_, i) => i).sort(() => 0.5 - Math.random());
    const targetIdx1 = shuffledIndices[0];
    const targetIdx2 = shuffledIndices[1];

    const img1 = frames[targetIdx1];
    const img2 = frames[targetIdx2];

    if (unusedPhotos.length < 2) unusedPhotos = [...masterPhotoList].sort(() => 0.5 - Math.random());
    const newSrc1 = unusedPhotos.shift();
    const newSrc2 = unusedPhotos.shift();

    img1.style.opacity = '0';
    img2.style.opacity = '0';

    setTimeout(() => {
      img1.src = newSrc1;
      img2.src = newSrc2;
      img1.style.opacity = '1';
      img2.style.opacity = '1';
    }, 1200);

  }, 3200);
}

// メイン初期化
function initAllApp() {
  const sourceData = (typeof albumData !== 'undefined' && Array.isArray(albumData)) ? albumData : [];

  if (sourceData.length > 0) {
    masterPhotoList = sourceData.map(d => d.image);
  } else {
    masterPhotoList = [
      "images/prologue.png", "images/page01.png", "images/page02.png", "images/page03.png",
      "images/page04.png", "images/page05.png", "images/page06.png", "images/page07.png",
      "images/page08.png", "images/page09.png", "images/page10.png", "images/page11.png",
      "images/page12.png", "images/page13.png", "images/page14.png", "images/page15.png",
      "images/page16.png", "images/page17.png", "images/page18.png"
    ];
  }

  renderAlbumPages();
  initPages();

  const openingCover = document.getElementById('opening-cover');
  
  if (window.location.hash === '#album') {
    document.body.classList.remove('cover-active');
    if (openingCover) {
      openingCover.classList.add('open-book');
      openingCover.style.display = 'none';
    }
  } else {
    document.body.classList.add('cover-active');
    renderCoverPolaroids();
  }

  setupRandomEpiloguePhoto();
  applyFilmTimestamps();
  initQuiz();
  initOmikuji();
  initPhotoFlipAndZoom();
  initPassUnlock();
  initInteractiveTouch();
  startAnniversaryTimer();

  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.onclick = () => {
      if (polaroidSlideTimer) clearInterval(polaroidSlideTimer);
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
    };
  }
}

window.addEventListener('load', initAllApp);

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
  
  const shuffledPhotos = [...masterPhotoList, ...masterPhotoList].sort(() => 0.5 - Math.random());
  const burstCount = 12;
  const isMobile = window.innerWidth <= 768;

  let count = 0;
  let lastTime = performance.now();
  const interval = 220;

  function spawnStep(now) {
    if (now - lastTime >= interval && count < burstCount) {
      lastTime = now;

      const photoContainer = document.createElement('div');
      photoContainer.className = 'burst-photo-fly';

      const positions = [
        { x: 30, y: 35 }, { x: 70, y: 40 }, { x: 40, y: 65 }, { x: 65, y: 30 },
        { x: 25, y: 60 }, { x: 75, y: 65 }, { x: 50, y: 45 }, { x: 35, y: 30 }
      ];
      const pos = positions[count % positions.length];
      
      const posX = pos.x + (Math.random() - 0.5) * 15;
      const posY = pos.y + (Math.random() - 0.5) * 15;
      
      photoContainer.style.left = posX + 'vw';
      photoContainer.style.top = posY + 'vh';

      const cardW = isMobile ? (Math.random() * 60 + 260) : (Math.random() * 100 + 380);
      photoContainer.style.width = cardW + 'px';
      photoContainer.style.height = (cardW * 0.72) + 'px';

      const img = document.createElement('img');
      img.src = shuffledPhotos[count];
      photoContainer.appendChild(img);

      const startRot = (Math.random() - 0.5) * 14;
      const endRot = startRot + (Math.random() - 0.5) * 8;
      photoContainer.style.setProperty('--start-rot', `${startRot}deg`);
      photoContainer.style.setProperty('--end-rot', `${endRot}deg`);

      document.body.appendChild(photoContainer);
      setTimeout(() => photoContainer.remove(), 2400);

      count++;
    }

    if (count < burstCount) {
      requestAnimationFrame(spawnStep);
    } else {
      setTimeout(() => showFinalHeroPhoto(onComplete), 600);
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
      frame.onclick = () => {
        frame.classList.toggle('flipped-photo');
      };
    }

    if (zoomBtn && frame) {
      zoomBtn.onclick = (e) => {
        e.stopPropagation();
        const img = frame.querySelector('.photo-front img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
        }
      };
    }
  });

  if (lightboxClose) {
    lightboxClose.onclick = () => lightbox.classList.remove('active');
    lightbox.onclick = () => lightbox.classList.remove('active');
  }
}

function initPassUnlock() {
  const unlockBtn = document.getElementById('unlockBtn');
  const passInput = document.getElementById('passInput');
  const passMessage = document.getElementById('passMessage');
  const secretLetter = document.getElementById('secretLetter');

  if (unlockBtn) {
    unlockBtn.onclick = () => {
      if (passInput.value === '0703') {
        passMessage.style.color = '#2d8a4e';
        passMessage.textContent = '鍵が開きました🔑💖';
        secretLetter.style.display = 'block';
        playHeartbeatSound();
      } else {
        passMessage.style.color = '#c0392b';
        passMessage.textContent = 'パスワードが違います（ヒント: 0703）';
      }
    };
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

function initPages() {
  pages = Array.from(document.querySelectorAll('.page'));
  const totalPages = document.getElementById('totalPages');
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

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (nextBtn) {
  nextBtn.onclick = () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      updateActivePage();
      updateUI();
    }
  };
}

if (prevBtn) {
  prevBtn.onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      updateActivePage();
      updateUI();
    }
  };
}

function updateUI() {
  const pageNum = document.getElementById('pageNum');
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
      btn.onclick = () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          resultDiv.style.color = '#2d8a4e';
          resultDiv.textContent = '正解です！';
        } else {
          resultDiv.style.color = '#c0392b';
          resultDiv.textContent = '残念、もう一度確認してみてください。';
        }
      };
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

  omikujiBtn.onclick = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    alert(`🎲 今日のふたりの運勢 🎲\n\n${randomFortune}`);
  };
}