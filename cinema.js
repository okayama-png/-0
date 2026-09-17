function createFrame(item) {
  const frame = document.createElement('div');
  frame.className = 'film-frame';
  
  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.title;
  
  const title = document.createElement('div');
  title.className = 'frame-title';
  title.textContent = item.title;

  const stamp = document.createElement('div');
  stamp.className = 'frame-stamp';
  stamp.textContent = item.cinemaDate || item.date;
  
  frame.appendChild(img);
  frame.appendChild(title);
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

  if (topEl && bottomEl && typeof albumData !== 'undefined') {
    const multiList = [...albumData, ...albumData, ...albumData, ...albumData];

    topEl.innerHTML = '';
    multiList.forEach(item => topEl.appendChild(createFrame(item)));

    bottomEl.innerHTML = '';
    [...multiList].reverse().forEach(item => bottomEl.appendChild(createFrame(item)));
  }
}

// 🎞️ スムーズ慣性物理パラメータ
let topX = -2000;
let bottomX = -2000;

let baseSpeedTop = -0.6;
let baseSpeedBottom = 0.6;

let velocityTop = 0;
let velocityBottom = 0;

let isDragging = false;
let dragTarget = null;

let lastClientX = 0;
let lastTime = 0;

const LOOP_WIDTH = 4180;

function animateFilm() {
  if (!isDragging) {
    velocityTop *= 0.94;
    velocityBottom *= 0.94;

    topX += baseSpeedTop + velocityTop;
    bottomX += baseSpeedBottom + velocityBottom;
  }

  while (topX < -LOOP_WIDTH * 2) topX += LOOP_WIDTH;
  while (topX > -LOOP_WIDTH) topX -= LOOP_WIDTH;

  while (bottomX > -LOOP_WIDTH) bottomX -= LOOP_WIDTH;
  while (bottomX < -LOOP_WIDTH * 2) bottomX += LOOP_WIDTH;

  const topEl = document.getElementById('filmTrackTop');
  if (topEl) topEl.style.transform = `translate3d(${topX}px, 0, 0)`;
  
  const bottomEl = document.getElementById('filmTrackBottom');
  if (bottomEl) bottomEl.style.transform = `translate3d(${bottomX}px, 0, 0)`;

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
    lastClientX = clientX;
    lastTime = performance.now();
    
    if (target === 'top') velocityTop = 0;
    if (target === 'bottom') velocityBottom = 0;
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime);
    const diffX = clientX - lastClientX;

    if (dragTarget === 'top') {
      topX += diffX;
      velocityTop = (diffX / dt) * 14;
    } else if (dragTarget === 'bottom') {
      bottomX += diffX;
      velocityBottom = (diffX / dt) * 14;
    }

    lastClientX = clientX;
    lastTime = now;
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

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', handleEnd);
}

function openModal(item) {
  const modal = document.getElementById('photoModal');
  const inner = document.getElementById('popCardInner');
  
  if (modal) {
    document.getElementById('modalImg').src = item.image;
    document.getElementById('modalStamp').textContent = item.cinemaDate || item.date;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalBackTitle').textContent = item.title;
    document.getElementById('modalDesc').textContent = item.cinemaDesc;
    
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