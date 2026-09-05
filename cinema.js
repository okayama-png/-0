const cinemaMemories = [
  { src: 'images/prologue.png', date: "'26.07.03", title: "000 - Prologue", desc: "あの日、偶然入ったあのバーでみなみさんと出会えたこと。もしどちらかが少しでも違う選択をしていたらと思うと、奇跡としか思えない夜でした。見えなくなるまで改札でずっと手を振り続けてくれたあの笑顔は、今も私の胸の中でずっと輝いています。すべての始まりの、愛おしいプロローグ。" },
  { src: 'images/page01.png', date: "'26.07.03", title: "001 - 付き合った日", desc: "仕事終わりにお迎えに行って食べたもんじゃ焼き。張り切って焼いてくれた姿が可愛くて、それだけで幸せだった。その後のカラオケでまだ付き合ってもないのにしちゃった、心臓が破裂しそうな初キス。公園で声を震わせながら渡した花束と告白。距離がぐっと縮まった、コーヒー味の思い出。" },
  { src: 'images/page02.png', date: "'26.07.05", title: "002 - 初めてダンスを見た日", desc: "『Be Creators』のステージの上で踊るみなみさんは、息をのむほど格好良くて圧倒されっぱなしだった。終演後に花束を渡した時の無邪気な笑顔も、そのあと公園でスムージーを飲みながら過ごしたやわらかな時間も全部宝物。大好きな人の一番近くで輝きを見つめられる幸せを噛みしめた日。" },
  { src: 'images/page03.png', date: "'26.07.07", title: "003 - 七夕", desc: "七夕の夜に送り合った短冊。「ずっと隣で笑い合えますように」と願いを込めたけれど、みなみさんが書いてくれた美しい字と直筆の「大好き」の文字を見た瞬間、胸がぎゅっとなるくらい惚れ直してしまった。どんな壁があってもこの人となら乗り越えていける、そう強く確信した特別な夜。" },
  { src: 'images/page04.png', date: "'26.07.10", title: "004 - 初めてのお弁当", desc: "朝のやわらかな光の中で初めて作っていったお弁当。寝ぼけて炊き込みご飯の水の量を間違えちゃったけれど、「味はすごく美味しいよ」って優しく微笑んで食べてくれたその温もりが嬉しかった。いつか同じ家でお弁当を作ってそれを渡して「いってらっしゃい」と言いたいなと思い描いた日。" },
  { src: 'images/page05.png', date: "'26.07.11", title: "005 - 水族館と初お泊り", desc: "一日中ダンスで疲れているはずなのに、嫌な顔ひとつせずお迎えに来てくれた深すぎる優しさ。すみだ水族館の青く静かな光の中に浮かび上がるみなみさんは、まるで女神みたいに綺麗だった。そして我が家での初めてのお泊り。目覚めた朝、隣で穏やかに眠る姿がある奇跡に心から感謝した日。" },
  { src: 'images/page06.png', date: "'26.07.12", title: "006 - お泊り", desc: "「会いたい」という私のわがままを優しく受け止めてくれて実現した、みなみさん家でのお泊り。カメラを向けると照れてそっぽを向いちゃったり、アイスを食べながら目が合うだけで恥ずかしそうに笑う顔が愛おしすぎてメロメロ。少しずつ縮まっていくふたりの距離がたまらなく愛おしい。" },
  { src: 'images/page07.png', date: "'26.07.14", title: "007 - 映画とお泊り", desc: "『トイ・ストーリー4』を見に行った日。映画館の一番後ろの席を取ろうとしてチケットを1枚しか取っていなかった私の大ポカも笑い飛ばしてくれてありがとう。映画館の暗闇の中で重ねたキス写真はずっと私のお気に入り。翌朝作ってくれたお弁当の美味しさと優しさに、胸がいっぱいになりました。" },
  { src: 'images/page08.png', date: "'26.07.16", title: "008 - お泊り", desc: "「明日お弁当持っていきたい」と言ったら、まさかのみなみさんからお泊りの誘い！お互いに「今日は疲れたから即寝る」って意気込んでいたはずなのに、気づいたら始まっちゃうふたり。双方そろって忍耐力ゼロなところも愛おしい。ちょっぴりSっ気満載なみなみさんに、今日もメロメロです。" },
  { src: 'images/page09.png', date: "'26.07.18", title: "009 - 飲みとお泊り", desc: "友達と一緒に馬場飲みからのみなみさん家にお泊り！「チンチロしたい！」って大はしゃぎして案の定メガジョッキを引き当てるお茶目な姿に爆笑。結局半分くらい私が飲んでた気もするけれど（笑）、飾らないありのままのみなみさんと過ごす時間は、私にとって世界で一番心地いい居場所です。" },
  { src: 'images/page10.png', date: "'26.07.19", title: "010 - ダンスの送迎", desc: "ダンス公演に行けない寂しさを埋めたくて、埼玉会館まで送迎した日。内緒でお揃いのスマホケースを買おうとコソコソいじっていたら怪しまれて、焦って自爆したサプライズ大失敗（笑）。でも、あんなに嬉しそうな笑顔が見られたから大成功。みなみさんと出会えた奇跡に感謝する毎日です。" },
  { src: 'images/page11.png', date: "'26.07.23", title: "011 - お泊り", desc: "仕事終わりに直行して一緒に作った豚の角煮。私の帰りを待ちながら作ってくれてた姿を想像するとたまらないです。ご飯も炊きたてを食べさせようとしてくれてて愛感じたよ。全部とってもおいしかったよありがとう。「プレゼントがあります！」ってにっこにこ顔で渡された袋を開けると、サウナハット。私のポロッと言った言葉を覚えていてくれたその優しさに、心から愛が溢れました。" },
  { src: 'images/page12.png', date: "'26.07.26", title: "012 - お泊まり", desc: "馬場でお寿司を食べてゲーセンへ直行！太鼓の達人にマリカー、モグラ叩きまで本気で大はしゃぎ。お泊りした翌朝のキスマ攻防戦も、じゃれ合いすぎて出かけるギリギリになっちゃうのもふたりのお約束。「会えない時間や距離に僕らは試されている」——離れている時間さえも愛を深めてくれる宝物です。" },
  { src: 'images/page13.png', date: "'26.07.28", title: "013 - 花火大会", desc: "告白する予定だった日に、恋人同士として見れた花火大会。夜空を見上げる横顔が咲き誇るどの花火よりも綺麗で、途中の小雨のおかげで傘という二人だけの小さな死角のなかで重ねた唇。BGMで流れていた『愛は勝つ』は、一生忘れられないふたりだけの特別なテーマソング。来年もこの先もずっと隣で見ようね。来年はどこに見に行こうか。" },
  { src: 'images/page14.png', date: "'26.08.09", title: "014 - 葛西臨海公園", desc: "ダンス送迎のあとに向かった夜の葛西臨海公園。美味しいものを頬張ったあと、海辺へ移動してふたりでずーーっとキス。空が深い闇に包まれるまで時間を忘れて重ね合った唇。夜のひまわりのライトアップに照らされたみなみさんは、今日も飛び切りの綺麗さで私の心を奪っていきました。" },
  { src: 'images/page15.png', date: "'26.08.16", title: "015 - ダンス公演", desc: "ダンス公演で見せる圧巻のパフォーマンス。ステージの上で踊る姿は一瞬で目を奪われるほど格好良くて、何回見ても胸が熱くなる。たくさん練習して努力してるんだろうなと思わされるほど、伝わってくる圧倒的な表現力。これからもたくさんの公演を見に行けたら嬉しいです。" },
  { src: 'images/page16.png', date: "'26.08.22", title: "016 - 九十九里浜ドライブ", desc: "九十九里浜へのドライブ！到着してすぐに海へ飛び込んで、ずぶ濡れになりながら笑い合った青春みたいな一日。美味しいハンバーグを食べて、夜は韓国料理屋さんで夢中になってゲームを語る無邪気な姿が愛おしかった。時間がいくらあっても足りないくらい楽しい日々。今年中に手持ち花火も絶対やろうね！" },
  { src: 'images/page17.png', date: "'26.08.21", title: "017 - 5日間のお泊り", desc: "気づけばなんと5日連続のお泊り！お洗濯をしてお料理を作って、大好きな人の帰りをワクワクしながら待つ時間は言葉にできないほど幸せだった。同棲への夢がもっと膨らんだ日々。練習したピアノも優しく褒めてくれてありがとう。ギターも頑張るから、いつか絶対にふたりで合奏しようね。" },
  { src: 'images/page18.png', date: "'26.09.01", title: "018 - ディズニーシー", desc: "ふたりで初めて行った夢のディズニーシー！アトラクションで叫びすぎて喉がやられたのも、ポップコーンを6個も食べて帰りにお腹すいたって言うみなみさんも最高に愛おしい（笑）。地球儀の前で膝を抱えて撮った写真も宝物。みなみさんといると何気ない瞬間もすべてが幸せに変わるよ。ずっと愛しています。" }
];

function createFrame(item) {
  const frame = document.createElement('div');
  frame.className = 'film-frame';
  
  const img = document.createElement('img');
  img.src = item.src;
  img.alt = item.title;
  
  const title = document.createElement('div');
  title.className = 'frame-title';
  title.textContent = item.title;

  const stamp = document.createElement('div');
  stamp.className = 'frame-stamp';
  stamp.textContent = item.date;
  
  frame.appendChild(img);
  frame.appendChild(title);
  frame.appendChild(stamp);
  
  frame.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(item);
  });
  
  return frame;
}

// ♾️ 無限ループのために5セット分連続で生成
function initFilmTracks() {
  const topEl = document.getElementById('filmTrackTop');
  const bottomEl = document.getElementById('filmTrackBottom');

  if (topEl && bottomEl) {
    const multiList = [...cinemaMemories, ...cinemaMemories, ...cinemaMemories, ...cinemaMemories, ...cinemaMemories];

    topEl.innerHTML = '';
    multiList.forEach(item => topEl.appendChild(createFrame(item)));

    bottomEl.innerHTML = '';
    [...multiList].reverse().forEach(item => bottomEl.appendChild(createFrame(item)));
  }
}

// ♾️ 完全シームレスループ ＆ 方向個別のスワイプ制御
let topX = -2000;
let bottomX = -2000;
let speedTop = -0.55;
let speedBottom = 0.55;

let isDragging = false;
let dragTarget = null;
let startX = 0;
let dragStartX = 0;

const LOOP_RESET_WIDTH = 4180; // 19枚分の合計横幅（リセット基準）

function animateFilm() {
  if (!isDragging) {
    topX += speedTop;
    bottomX += speedBottom;
  }

  // ★ 上段ループ境界判定
  if (topX < -LOOP_RESET_WIDTH * 2) topX += LOOP_RESET_WIDTH;
  if (topX > 0) topX -= LOOP_RESET_WIDTH;

  // ★ 下段ループ境界判定
  if (bottomX > 0) bottomX -= LOOP_RESET_WIDTH;
  if (bottomX < -LOOP_RESET_WIDTH * 2) bottomX += LOOP_RESET_WIDTH;
  
  const topEl = document.getElementById('filmTrackTop');
  if (topEl) topEl.style.transform = `translateX(${topX}px)`;
  
  const bottomEl = document.getElementById('filmTrackBottom');
  if (bottomEl) bottomEl.style.transform = `translateX(${bottomX}px)`;

  // 中央スポットライト適用
  const screenCenter = window.innerWidth / 2;
  const allFrames = document.querySelectorAll('.film-frame');
  
  allFrames.forEach(frame => {
    const rect = frame.getBoundingClientRect();
    const frameCenter = rect.left + rect.width / 2;
    
    if (Math.abs(frameCenter - screenCenter) < 75) {
      frame.classList.add('is-center');
    } else {
      frame.classList.remove('is-center');
    }
  });

  requestAnimationFrame(animateFilm);
}

function setupDragEvents() {
  const topTrack = document.getElementById('filmTrackTop');
  const bottomTrack = document.getElementById('filmTrackBottom');

  const handleStart = (clientX, target) => {
    isDragging = true;
    dragTarget = target;
    startX = clientX;
    dragStartX = (target === 'top') ? topX : bottomX;
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diffX = clientX - startX;

    if (dragTarget === 'top') {
      topX = dragStartX + diffX;
    } else if (dragTarget === 'bottom') {
      // ★ 下段のみスライド方向を現在と逆に反転設定
      bottomX = dragStartX + diffX;
    }
  };

  const handleEnd = () => {
    isDragging = false;
    dragTarget = null;
  };

  if (topTrack) {
    topTrack.addEventListener('mousedown', (e) => handleStart(e.clientX, 'top'));
    topTrack.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX, 'top'), { passive: true });
  }

  if (bottomTrack) {
    bottomTrack.addEventListener('mousedown', (e) => handleStart(e.clientX, 'bottom'));
    bottomTrack.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX, 'bottom'), { passive: true });
  }

  window.addEventListener('mousemove', (e) => handleMove(e.clientX));
  window.addEventListener('mouseup', handleEnd);

  window.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', handleEnd);
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
      if (e.target.tagName !== 'BUTTON' && !e.target.classList.contains('modal-close-btn')) toggleFlip(e);
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
  setupDragEvents();
  animateFilm();
});