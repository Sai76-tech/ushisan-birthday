document.addEventListener('DOMContentLoaded', () => {
  initSakuraPetals();
  initAudioPlayer();
  initSurpriseModal();
  initScrollEffects();
});

/* ==========================================================================
   1. Floating Sakura Petals Animation
   ========================================================================== */
function initSakuraPetals() {
  const container = document.getElementById('sakura-container');
  const petalCount = 25; // Balanced number of petals

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Randomize initial positions & animation timings
    const size = Math.random() * 12 + 8;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.4}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${Math.random() * 5 + 7}s`;
    petal.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(petal);
  }
}

/* ==========================================================================
   2. Audio Controller (With Error Handling & Local Music Support)
   ========================================================================== */
function initAudioPlayer() {
  const musicBtn = document.getElementById('music-btn');
  const bgMusic = document.getElementById('bg-music');
  const musicIcon = document.getElementById('music-icon');
  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.textContent = '🎵';
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        musicIcon.textContent = '⏸️';
        isPlaying = true;
      }).catch((error) => {
        console.error("Audio play error:", error);
        alert("Audio load nahi ho pa raha. Kripya check karein ki 'luminewave-infinity-love-629401.mp3' file sahi folder me hai ya nahi.");
      });
    }
  });
}

/* ==========================================================================
   3. Surprise Modal & Confetti Effect
   ========================================================================== */
function initSurpriseModal() {
  const surpriseBtn = document.getElementById('surprise-btn');
  const modal = document.getElementById('surprise-modal');

  surpriseBtn.addEventListener('click', () => {
    modal.classList.add('active');
    triggerConfetti();
  });
}

function closeSurprise() {
  const modal = document.getElementById('surprise-modal');
  modal.classList.remove('active');
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f7cbd4', '#d87093', '#e6e6fa', '#ffffff']
    });
  }
}

/* ==========================================================================
   4. Lightbox View for Photos
   ========================================================================== */
function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

/* ==========================================================================
   5. Scroll Effects (Back to Top & Bottom Surprise Reveal)
   ========================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('back-to-top');
  const bottomSurprise = document.getElementById('bottom-surprise');

  window.addEventListener('scroll', () => {
    // Back to top button visibility
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }

    // Reveal bottom message when scrolled to bottom
    const windowHeight = window.innerHeight;
    const bottomPosition = bottomSurprise.getBoundingClientRect().top;

    if (bottomPosition < windowHeight - 50) {
      bottomSurprise.classList.add('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}