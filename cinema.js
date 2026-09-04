const cinemaMemories = [
  { src: 'images/prologue.png', date: "'26.07.03", title: "Prologue", desc: "すべての始まりの夜. 見えなくなるまで手を振ってくれた笑顔は一生の宝物." },
  { src: 'images/page01.png', date: "'26.07.03", title: "付き合った日", desc: "もんじゃ焼き食べて、カラオケで初キスして、公園で告白。緊張したなぁ." },
  { src: 'images/page02.png', date: "'26.07.05", title: "初めてダンスを見た日", desc: "ステージの上の姿が格好良すぎて感動。花束喜んでくれて嬉しかった" },
  { src: 'images/page03.png', date: "'26.07.07", title: "七夕の短冊", desc: "字も美しくて惚れ直しました。一生大切にします." },
  { src: 'images/page04.png', date: "'26.07.10", title: "初めてのお弁当", desc: "失敗した炊き込みご飯でも「おいしい」って食べてくれた優しさに感謝." },
  { src: 'images/page05.png', date: "'26.07.11", title: "すみだ水族館", desc: "青い光の中のみなみさんが綺麗すぎて…初めてのお泊りも最高だった." },
  { src: 'images/page06.png', date: "'26.07.12", title: "照れ顔お泊り", desc: "アイス食べて恥ずかしそうにする顔が可愛すぎてメロメロ！" },
  { src: 'images/page07.png', date: "'26.07.14", title: "映画館キス", desc: "トイ・ストーリー4見た。映画館でのキス写真、ずっとお気に入りだよ." },
  { src: 'images/page08.png', date: "'26.07.16", title: "ちょっぴりSなお泊り", desc: "忍耐力ゼロなふたりが愛おしい.初めてみなみさんのＳっ気に触れました" },
  { src: 'images/page09.png', date: "'26.07.18", title: "馬場飲み＆チンチロ", desc: "メガジョッキ引き当てるみなみさんいい加減にして？楽しい時間をありがとう." },
  { src: 'images/page10.png', date: "'26.07.19", title: "ダンス送迎＆スマホケース", desc: "サプライズ失敗したけど、嬉しそうな笑顔が見られて幸せです。お揃い増やしていこう" },
  { src: 'images/page11.png', date: "'26.07.23", title: "角煮＆サウナハット", desc: "角煮おいしすぎたね。サウナハットのサプライズ本当に嬉しかった.早く温泉行こう。" },
  { src: 'images/page12.png', date: "'26.07.26", title: "ゲーセン大はしゃぎ", desc: "太鼓の達人にマリカーのもぐらたたき。ゲーセンでもこんなに笑えて楽しいよ。" },
  { src: 'images/page13.png', date: "'26.07.28", title: "雨の花火大会", desc: "傘の中の二人だけの死角.『愛は勝つ』は永遠の思い出の曲。また見に行こうね" },
  { src: 'images/page14.png', date: "'26.08.09", title: "葛西臨海公園の夜", desc: "海辺でずーっとキスしてたら日暮れてたね。 ひまわりも綺麗だった。みなみさんはもっときれいだった。" },
  { src: 'images/page15.png', date: "'26.08.16", title: "ダンス公演", desc: "踊るみなみさんは世界一カッコいいです。何回見ても飽きないダンスでこれからも虜にしてください。" },
  { src: 'images/page16.png', date: "'26.08.22", title: "九十九里浜ドライブ", desc: "二人で全身びしょぬれになってお絵描きもして最高の海だったね。道中に食べたハンバーグおいしかった、見つけてくれてありがとう" },
  { src: 'images/page17.png', date: "'26.08.21", title: "5日間連続お泊り", desc: "こんなに長いこといても何一つ嫌な思いをしないのが本当にすごいなって感じます。ピアノもギターもがんばります。いつか協奏しよう。" },
  { src: 'images/page18.png', date: "'26.09.01", title: "ディズニーシー", desc: "幸せすぎたなぁ。トイマニ叫びすぎ笑 地球儀の前で膝抱えるポーズも最高だった！" },
  { src: 'images/extra11.png', date: "'26 MEMORIES", title: "Special Moment", desc: "ふたりの笑顔が弾けた最高に愛おしい一枚." },
  { src: 'images/extra12.png', date: "'26 MEMORIES", title: "Happy Time", desc: "いつでも隣で笑い合える幸せを感じた日." },
  { src: 'images/extra13.png', date: "'26 MEMORIES", title: "Sweet Memory", desc: "何気ない日常が、みなみさんといると特別な日になる." },
  { src: 'images/extra14.png', date: "'26 MEMORIES", title: "Precious Day", desc: "ずっと一緒にいたいと思えた愛おしい瞬間." },
  { src: 'images/extra15.png', date: "'26 MEMORIES", title: "Love Story", desc: "世界で一番大好きな人の一番近くにいられる奇跡." },
  { src: 'images/extra16.png', date: "'26 MEMORIES", title: "Forever & Always", desc: "これからもずっと、二人でたくさんの景色を見に行こうね." }
];

function createFrame(item) {
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
  
  frame.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(item);
  });
  
  return frame;
}

function initFilmTracks() {
  const topEl = document.getElementById('filmTrackTop');
  const bottomEl = document.getElementById('filmTrackBottom');

  if (topEl && bottomEl) {
    const fullList = [...cinemaMemories, ...cinemaMemories, ...cinemaMemories];

    topEl.innerHTML = '';
    fullList.forEach(item => topEl.appendChild(createFrame(item)));

    bottomEl.innerHTML = '';
    [...fullList].reverse().forEach(item => bottomEl.appendChild(createFrame(item)));
  }
}

// ♾️ 永遠ループアニメーション ＆ ★ 中央スポットライト金枠計算 ★
let topX = 0;
let bottomX = -1500;
let speedTop = -0.35;
let speedBottom = 0.35;

function animateFilm() {
  topX += speedTop;
  if (topX < -3500) topX = 0;
  
  const topEl = document.getElementById('filmTrackTop');
  if (topEl) topEl.style.transform = `translateX(${topX}px)`;

  bottomX += speedBottom;
  if (bottomX > 0) bottomX = -3500;
  
  const bottomEl = document.getElementById('filmTrackBottom');
  if (bottomEl) bottomEl.style.transform = `translateX(${bottomX}px)`;

  // 画面真ん中を通過するコマを計算して輝かせる
  const screenCenter = window.innerWidth / 2;
  const allFrames = document.querySelectorAll('.film-frame');
  
  allFrames.forEach(frame => {
    const rect = frame.getBoundingClientRect();
    const frameCenter = rect.left + rect.width / 2;
    
    // 画面中央（±75px以内）にいる写真にゴールドフレーム付与
    if (Math.abs(frameCenter - screenCenter) < 75) {
      frame.classList.add('is-center');
    } else {
      frame.classList.remove('is-center');
    }
  });

  requestAnimationFrame(animateFilm);
}

// モーダル ＆ フリップ処理
function openModal(item) {
  const modal = document.getElementById('photoModal');
  const inner = document.getElementById('popCardInner');
  
  if (modal) {
    document.getElementById('modalImg').src = item.src;
    document.getElementById('modalStamp').textContent = item.date;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalBackTitle').textContent = item.title;
    document.getElementById('modalDesc').textContent = item.desc;
    
    if (inner) inner.classList.remove('is-flipped');
    modal.classList.add('show');
  }
}

function toggleFlip(e) {
  if (e) e.stopPropagation();
  const inner = document.getElementById('popCardInner');
  if (inner) inner.classList.toggle('is-flipped');
}

function setupEvents() {
  const flipToBackBtn = document.getElementById('flipToBackBtn');
  const flipToFrontBtn = document.getElementById('flipToFrontBtn');
  const modalCloseFront = document.getElementById('modalCloseFront');
  const modalCloseBack = document.getElementById('modalCloseBack');
  const modal = document.getElementById('photoModal');
  const inner = document.getElementById('popCardInner');

  if (flipToBackBtn) flipToBackBtn.onclick = toggleFlip;
  if (flipToFrontBtn) flipToFrontBtn.onclick = toggleFlip;
  
  if (inner) {
    inner.onclick = (e) => {
      if (e.target.tagName !== 'BUTTON') toggleFlip(e);
    };
  }

  const closeModal = () => { if (modal) modal.classList.remove('show'); };
  if (modalCloseFront) modalCloseFront.onclick = closeModal;
  if (modalCloseBack) modalCloseBack.onclick = closeModal;
  if (modal) {
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initFilmTracks();
  setupEvents();
  animateFilm();
});