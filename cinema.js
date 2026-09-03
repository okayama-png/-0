// === 30枚の写真とエピソードデータ ===
const cinemaMemories = [
  { src: 'images/prologue.png', date: "'26.07.03", title: "Prologue", desc: "すべての始まりの夜. 見えなくなるまで手を振ってくれた笑顔は一生の宝物." },
  { src: 'images/page01.png', date: "'26.07.03", title: "付き合った日", desc: "もんじゃ焼き食べて、カラオケで初キスして、公園で告白！最高の夜." },
  { src: 'images/page02.png', date: "'26.07.05", title: "初めてダンスを見た日", desc: "ステージの上の姿が格好良すぎて感動！花束喜んでくれて嬉しかったな." },
  { src: 'images/page03.png', date: "'26.07.07", title: "七夕の短冊", desc: "美しい字で「大好き」って書いてくれてキュン死！一生大切にするね." },
  { src: 'images/page04.png', date: "'26.07.10", title: "初めてのお弁当", desc: "失敗した炊き込みご飯を「おいしい」って食べてくれた優しさに涙." },
  { src: 'images/page05.png', date: "'26.07.11", title: "すみだ水族館", desc: "青い光の中のみなみさんが綺麗すぎて…初めてのお泊りも最高だった." },
  { src: 'images/page06.png', date: "'26.07.12", title: "照れ顔お泊り", desc: "アイス食べて恥ずかしそうにする顔が可愛すぎてメロメロ！" },
  { src: 'images/page07.png', date: "'26.07.14", title: "映画館キス", desc: "トイ・ストーリー4！映画館でのキス写真、ずっとお気に入りだよ." },
  { src: 'images/page08.png', date: "'26.07.16", title: "ちょっぴりSなお泊り", desc: "会うたびに好きが深まる！忍耐力ゼロなふたりが愛おしい." },
  { src: 'images/page09.png', date: "'26.07.18", title: "馬場飲み＆チンチロ", desc: "メガジョッキ引き当てるみなみさん最高！ありのままの君が大好き." },
  { src: 'images/page10.png', date: "'26.07.19", title: "ダンス送迎＆スマホケース", desc: "サプライズ失敗したけど、嬉しそうな笑顔が見られて幸せ！" },
  { src: 'images/page11.png', date: "'26.07.23", title: "角煮＆サウナハット", desc: "角煮おいしすぎ！サウナハットのサプライズ本当に嬉しかった." },
  { src: 'images/page12.png', date: "'26.07.26", title: "ゲーセン大はしゃぎ", desc: "太鼓の達人にマリカー！私にはみなみさんじゃなきゃダメです." },
  { src: 'images/page13.png', date: "'26.07.28", title: "雨の花火大会", desc: "傘の中の二人だけの死角.『愛は勝つ』は永遠の思い出の曲！" },
  { src: 'images/page14.png', date: "'26.08.09", title: "葛西臨海公園の夜", desc: "海辺でずーっとキスした夜. ひまわりも綺麗だったね." },
  { src: 'images/page15.png', date: "'26.08.16", title: "ダンス公演", desc: "踊るみなみさんは世界一カッコいい！一番のファンだよ." },
  { src: 'images/page16.png', date: "'26.08.22", title: "九十九里浜ドライブ", desc: "海でずぶ濡れ青春！沙浜にお絵描きして最高に楽しかった." },
  { src: 'images/page17.png', date: "'26.08.21", title: "5日間連続お泊り", desc: "夢の同棲に一歩前進！ピアノもギターも二人でデュエットしようね." },
  { src: 'images/page18.png', date: "'26.09.01", title: "ディズニーシー", desc: "トイマニ叫びすぎ笑 地球儀の前で膝抱えるポーズも最高だった！" },
  { src: 'images/extra11.png', date: "'26 MEMORIES", title: "Special Moment", desc: "ふたりの笑顔が弾けた最高に愛おしい一枚." },
  { src: 'images/extra12.png', date: "'26 MEMORIES", title: "Happy Time", desc: "いつでも隣で笑い合える幸せを感じた日." },
  { src: 'images/extra13.png', date: "'26 MEMORIES", title: "Sweet Memory", desc: "何気ない日常が、みなみさんといると特別な日になる." },
  { src: 'images/extra14.png', date: "'26 MEMORIES", title: "Precious Day", desc: "ずっと一緒にいたいと思えた愛おしい瞬間." },
  { src: 'images/extra15.png', date: "'26 MEMORIES", title: "Love Story", desc: "世界で一番大好きな人の一番近くにいられる奇跡." },
  { src: 'images/extra16.png', date: "'26 MEMORIES", title: "Forever & Always", desc: "これからもずっと、二人でたくさんの景色を見に行こうね." }
];

const filmTrack = document.getElementById('filmTrack');

// 無限ループ用に2セット並べて生成
function buildFilmTrack() {
  const fullList = [...cinemaMemories, ...cinemaMemories];
  
  fullList.forEach((item, index) => {
    const frame = document.createElement('div');
    frame.className = 'film-frame';
    
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    
    const stamp = document.createElement('div');
    stamp.className = 'frame-stamp';
    stamp.textContent = item.date;
    
    frame.appendChild(img);
    frame.appendChild(stamp);
    
    // タップで3D飛び出しモーダル
    frame.addEventListener('click', () => openModal(item));
    
    filmTrack.appendChild(frame);
  });
}

// 🎞️ 自動エンドレススライド ＋ タッチスワイプ移動処理
let currentX = 0;
let isDragging = false;
let startX = 0;
let autoSpeed = -0.6; // スライド速度

function animateFilm() {
  if (!isDragging) {
    currentX += autoSpeed;
    const halfWidth = filmTrack.scrollWidth / 2;
    if (Math.abs(currentX) >= halfWidth) {
      currentX = 0;
    }
  }
  filmTrack.style.transform = `rotate(-8deg) scale(1.05) translateX(${currentX}px)`;
  requestAnimationFrame(animateFilm);
}

// タッチ＆マウス操作
window.addEventListener('mousedown', (e) => { isDragging = true; startX = e.clientX - currentX; });
window.addEventListener('mousemove', (e) => { if (isDragging) currentX = e.clientX - startX; });
window.addEventListener('mouseup', () => { isDragging = false; });

window.addEventListener('touchstart', (e) => { isDragging = true; startX = e.touches[0].clientX - currentX; });
window.addEventListener('touchmove', (e) => { if (isDragging) currentX = e.touches[0].clientX - startX; });
window.addEventListener('touchend', () => { isDragging = false; });

// 💥 モーダル処理
const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImg');
const modalStamp = document.getElementById('modalStamp');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');

function openModal(item) {
  modalImg.src = item.src;
  modalStamp.textContent = item.date;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  modal.classList.add('show');
}

modalClose.addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });

// 初期化
buildFilmTrack();
animateFilm();