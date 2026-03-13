/* =============================================
   7th Propose Anniversary — Interactive Script
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ---- DOM Elements ----
    const envelope = document.getElementById('envelope');
    const envelopeScreen = document.getElementById('envelopeScreen');
    const postcardScreen = document.getElementById('postcardScreen');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const bgPhotosContainer = document.getElementById('bgPhotosContainer');
    const petalsContainer = document.getElementById('petalsContainer');
    const floatingHearts = document.getElementById('floatingHearts');

    // ---- Memory Photos ----
    const photos = [
        'images/2026_01_10_10_18_25_IMG_7636.jpg',
        'images/20250622_163931.jpg',
        'images/20250622_164044.jpg',
        'images/20250720_121644.jpg',
        'images/20250803_115719.jpg',
        'images/20250921_131532.jpg',
        'images/20251019_162611.jpg',
        'images/20251123_111407.jpg',
        'images/20251123_171518.jpg',
        'images/20260111_105135.jpg',
        'images/20260111_105150.jpg',
        'images/20260111_105232.jpg',
        'images/20260111_110024.jpg',
        'images/20260111_110109.jpg',
        'images/20260111_113318.jpg',
        'images/20260208_114149.jpg',
        'images/2026_01_10_07_54_11_IMG_7351.jpg',
        'images/2026_01_10_08_36_06_IMG_7428.JPG',
        'images/2026_01_10_10_18_52_IMG_7641.jpg',
        'images/2026_01_10_10_18_56_IMG_7643.jpg',
        'images/2026_01_10_21_19_23_IMG_7864.jpg',
        'images/2026_01_11_08_09_15_IMG_7941.jpg',
        'images/2026_01_11_10_25_15_IMG_8202.jpg',
        'images/2026_01_11_10_26_27_IMG_8206.jpg',
        'images/2026_01_11_10_26_35_IMG_8207.jpg',
        'images/2026_01_11_10_26_42_IMG_8209.jpg',
        'images/2026_01_11_10_26_44_IMG_8210.jpg',
        'images/2026_01_11_10_30_29_IMG_8225.jpg',
        'images/2026_01_11_10_39_29_IMG_8263.jpg',
        'images/2026_01_11_10_39_40_IMG_8266.jpg',
        'images/2026_01_11_10_39_42_IMG_8267.jpg',
        'images/2026_01_11_10_58_16_IMG_8330.jpg',
        'images/2026_01_11_10_58_35_IMG_8336.jpg'
    ];

    let isMusicPlaying = false;

    // ---- Initialize ----
    init();

    function init() {
        createFloatingHearts();
        setupEnvelopeClick();
        setupMusicToggle();
    }

    // ---- Floating Hearts Background ----
    function createFloatingHearts() {
        const hearts = ['💕', '💗', '💖', '💝', '♥', '❤️', '🤍', '💞'];
        const count = 15;

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('span');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
            heart.style.animationDuration = (6 + Math.random() * 8) + 's';
            heart.style.animationDelay = Math.random() * 10 + 's';
            floatingHearts.appendChild(heart);
        }
    }

    // ---- Envelope Open Logic (click anywhere) ----
    function setupEnvelopeClick() {
        envelopeScreen.addEventListener('click', openEnvelope);
    }

    function openEnvelope() {
        // Prevent double click
        envelopeScreen.removeEventListener('click', openEnvelope);

        // Open envelope flap
        envelope.classList.add('opened');

        // Add sparkles
        createSparkles(envelope, 8);

        // Transition to postcard screen after animation
        setTimeout(() => {
            envelopeScreen.classList.add('fade-out');

            setTimeout(() => {
                envelopeScreen.classList.add('hidden');
                postcardScreen.classList.remove('hidden');
                postcardScreen.classList.add('fade-in');

                // Trigger all the postcard screen effects
                loadFloatingBgPhotos();
                createFallingPetals();
                startMusic();
            }, 800);
        }, 1200);
    }

    // ---- Sparkle Effect ----
    function createSparkles(element, count) {
        const sparkles = ['✨', '⭐', '💫', '🌟'];
        const rect = element.getBoundingClientRect();

        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle';
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    // ---- Load Floating Background Photos ----
    function loadFloatingBgPhotos() {
        // Skip the first photo as it is used on the stamp postcard left side
        const bgPhotos = photos.slice(1);
        
        bgPhotos.forEach((src, index) => {
            // Stagger creation
            setTimeout(() => {
                createFloatingPhoto(src);
                // Create a loop to spawn it again later
                setInterval(() => createFloatingPhoto(src), 25000 + Math.random() * 15000);
            }, index * 1200 + Math.random() * 800);
        });
    }

    function createFloatingPhoto(src) {
        const photo = document.createElement('img');
        photo.className = 'bg-photo';
        photo.src = src;

        const isMobile = window.innerWidth < 768;
        
        // Random positioning & styles based on screen size
        let size, left;
        if (isMobile) {
            size = 65 + Math.random() * 65; // 65px to 130px on mobile
            // Push more towards edges on mobile so they peek out from behind
            if (Math.random() > 0.5) {
                left = -5 + Math.random() * 25; // Left edge
            } else {
                left = 75 + Math.random() * 25; // Right edge
            }
        } else {
            size = 120 + Math.random() * 100; // 120px to 220px on desktop
            left = Math.random() * 90; // 0 to 90vw
        }

        const duration = (isMobile ? 15 : 20) + Math.random() * 15; // slightly faster on mobile
        const rotStart = (Math.random() - 0.5) * 45; // -22.5deg to 22.5deg
        const rotEnd = (Math.random() - 0.5) * 90; // -45deg to 45deg
        
        photo.style.width = size + 'px';
        photo.style.height = size + 'px';
        photo.style.left = left + 'vw';
        photo.style.animationDuration = duration + 's';
        photo.style.setProperty('--rot-start', rotStart + 'deg');
        photo.style.setProperty('--rot-end', rotEnd + 'deg');

        // Random blur layer for depth
        if (Math.random() > 0.6) {
            photo.style.filter = `blur(${1 + Math.random() * 2}px)`;
            photo.style.opacity = '0.4';
            photo.style.zIndex = '-2';
        } else {
            photo.style.zIndex = '-1';
        }

        bgPhotosContainer.appendChild(photo);

        // Cleanup after animation
        setTimeout(() => photo.remove(), duration * 1000);
    }

    // ---- Lightbox ----
    function openLightbox(src) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';

        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Memory photo';

        overlay.appendChild(img);
        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });

        // Close on click
        overlay.addEventListener('click', () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        });

        // Close on Escape
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // ---- Falling Petals ----
    function createFallingPetals() {
        const petalEmojis = ['🌸', '🏵️', '💮', '🌺'];
        const count = 20;

        for (let i = 0; i < count; i++) {
            createPetal(petalEmojis, i * 0.8);
        }

        // Keep creating petals periodically
        setInterval(() => {
            createPetal(petalEmojis, 0);
        }, 3000);
    }

    function createPetal(emojis, delay) {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (1 + Math.random() * 1) + 'rem';
        petal.style.animationDuration = (6 + Math.random() * 6) + 's';
        petal.style.animationDelay = delay + 's';

        petalsContainer.appendChild(petal);

        // Remove after animation ends to avoid DOM bloat
        const totalTime = (delay + 12) * 1000;
        setTimeout(() => petal.remove(), totalTime);
    }

    // ---- Background Music ----
    function startMusic() {
        bgMusic.volume = 0.4;
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                musicToggle.classList.remove('muted');
            }).catch(() => {
                // Autoplay blocked — show muted state
                isMusicPlaying = false;
                musicToggle.classList.add('muted');
            });
        }
    }

    function setupMusicToggle() {
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                bgMusic.pause();
                isMusicPlaying = false;
                musicToggle.classList.add('muted');
                musicToggle.querySelector('.music-icon').textContent = '🔇';
            } else {
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicToggle.classList.remove('muted');
                    musicToggle.querySelector('.music-icon').textContent = '🎵';
                }).catch(() => {
                    // Still blocked
                });
            }
        });
    }
});
