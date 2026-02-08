// LoadCheck - Modern Bakery-Inspired Premium Animations
// GSAP + ScrollTrigger + Lenis Smooth Scroll

// ============================================
// GLOBAL SETUP
// ============================================

gsap.registerPlugin(ScrollTrigger);

let lenis;

// ============================================
// PRELOADER
// ============================================

function initPreloader() {
    return new Promise((resolve) => {
        const preloader = document.getElementById('preloader');
        const chars = document.querySelectorAll('#preloader-text span');
        const line = document.getElementById('preloader-line');
        const counter = document.getElementById('preloader-counter');

        if (!preloader) { resolve(); return; }

        const tl = gsap.timeline({
            onComplete: () => {
                // Exit preloader
                gsap.to(preloader, {
                    clipPath: 'inset(0 0 100% 0)',
                    duration: 1,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        preloader.classList.add('done');
                        preloader.style.display = 'none';
                        document.body.classList.add('loaded');
                        resolve();
                    }
                });
            }
        });

        // Animate characters in
        tl.to(chars, {
            y: '0%',
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out'
        });

        // Grow line
        tl.to(line, {
            width: '120px',
            duration: 1,
            ease: 'power2.inOut'
        }, '-=0.3');

        // Count up
        let count = { val: 0 };
        tl.to(count, {
            val: 100,
            duration: 1.2,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (counter) counter.textContent = Math.round(count.val) + '%';
            }
        }, '-=1');

        // Hold for a moment
        tl.to({}, { duration: 0.3 });
    });
}

// ============================================
// LENIS SMOOTH SCROLL
// ============================================

function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// ============================================
// NAVBAR ANIMATION
// ============================================

function initNavbarAnimation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const logo = navbar.querySelector('.nav-logo');
    const links = navbar.querySelectorAll('.nav-link');
    const btn = navbar.querySelector('.btn');

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.2 });

    if (logo) {
        tl.to(logo, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    if (links.length) {
        tl.to(links, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out'
        }, '-=0.5');
    }

    if (btn) {
        tl.to(btn, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3');
    }

    // Scroll-based navbar background
    ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
            if (self.direction === 1 && window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else if (window.scrollY <= 80) {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// ============================================
// HERO ANIMATIONS
// ============================================

function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const badge = hero.querySelector('.hero-badge');
    const titleLines = hero.querySelectorAll('.title-line');
    const subtitle = hero.querySelector('.hero-subtitle');
    const cta = hero.querySelector('.hero-cta');
    const stats = hero.querySelector('.hero-stats');
    const statItems = hero.querySelectorAll('.stat-item');
    const statDividers = hero.querySelectorAll('.stat-divider');
    const orbs = hero.querySelectorAll('.gradient-orb');

    // Kill CSS animations on title lines so GSAP takes over
    titleLines.forEach(line => {
        line.style.animation = 'none';
        line.style.opacity = '0';
        line.style.transform = 'translateY(80px)';
    });

    if (subtitle) {
        subtitle.style.animation = 'none';
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(40px)';
    }

    if (cta) {
        cta.style.animation = 'none';
        cta.style.opacity = '0';
        cta.style.transform = 'translateY(40px)';
    }

    if (stats) {
        stats.style.animation = 'none';
        stats.style.opacity = '0';
    }

    const tl = gsap.timeline({ delay: 0.1 });

    // Badge slide in
    if (badge) {
        tl.fromTo(badge,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
    }

    // Title lines reveal with clip-path style
    titleLines.forEach((line, i) => {
        tl.to(line, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out'
        }, badge ? '-=0.5' : i * 0.15);
    });

    // Subtitle
    if (subtitle) {
        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');
    }

    // CTA buttons with stagger
    if (cta) {
        tl.to(cta, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');

        const ctaButtons = cta.querySelectorAll('.btn');
        if (ctaButtons.length) {
            tl.fromTo(ctaButtons,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
                '-=0.6'
            );
        }
    }

    // Stats
    if (stats) {
        tl.to(stats, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.3');
    }

    statItems.forEach((item, i) => {
        tl.fromTo(item,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            `-=${0.5 - i * 0.05}`
        );
    });

    statDividers.forEach((div) => {
        tl.fromTo(div,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.5, ease: 'power3.out' },
            '-=0.5'
        );
    });

    // Orb parallax on mouse move
    if (hero && orbs.length) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

            orbs.forEach((orb, index) => {
                const depth = (index + 1) * 15;
                gsap.to(orb, {
                    x: x * depth,
                    y: y * depth,
                    duration: 1.2,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Scroll-based parallax for hero content
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
        gsap.to(heroContent, {
            y: -80,
            opacity: 0.3,
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
            }
        });
    }
}

// ============================================
// SECTION ANIMATIONS (ScrollTrigger)
// ============================================

function initSectionAnimations() {
    initFeaturesAnimation();
    initHowItWorksAnimation();
    initTimelineGSAP();
    initStatsAnimation();
    initCTAAnimation();
    initFooterAnimation();
}

function initFeaturesAnimation() {
    const section = document.querySelector('.features');
    if (!section) return;

    const header = section.querySelector('.section-header');
    const cards = section.querySelectorAll('.feature-card');

    if (header) {
        const badge = header.querySelector('.section-badge');
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });

        if (badge) tl.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
        if (title) tl.fromTo(title, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.inOut' }, '-=0.3');
        if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    }

    if (cards.length) {
        gsap.fromTo(cards,
            { opacity: 0, y: 80, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section.querySelector('.features-grid'),
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }
}

function initHowItWorksAnimation() {
    const section = document.querySelector('.how-it-works');
    if (!section) return;

    const header = section.querySelector('.section-header');
    const steps = section.querySelectorAll('.step-card');
    const connectors = section.querySelectorAll('.step-connector');

    if (header) {
        const badge = header.querySelector('.section-badge');
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');

        const tl = gsap.timeline({
            scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none none' }
        });

        if (badge) tl.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
        if (title) tl.fromTo(title, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.inOut' }, '-=0.3');
        if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    }

    gsap.fromTo(steps,
        { opacity: 0, y: 60, rotateX: -15 },
        {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: section.querySelector('.steps-container'), start: 'top 80%', toggleActions: 'play none none none' }
        }
    );

    gsap.fromTo(connectors,
        { opacity: 0, scaleX: 0 },
        {
            opacity: 1, scaleX: 1,
            duration: 0.6, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: section.querySelector('.steps-container'), start: 'top 75%', toggleActions: 'play none none none' }
        }
    );
}

function initTimelineGSAP() {
    const section = document.querySelector('.timeline-section');
    if (!section) return;

    const header = section.querySelector('.section-header');
    const items = section.querySelectorAll('.timeline-item');
    const progress = section.querySelector('.timeline-progress');

    if (header) {
        const badge = header.querySelector('.section-badge');
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');

        const tl = gsap.timeline({
            scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none none' }
        });

        if (badge) tl.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
        if (title) tl.fromTo(title, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.inOut' }, '-=0.3');
        if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    }

    if (progress) {
        gsap.fromTo(progress,
            { height: '0%' },
            {
                height: '100%', ease: 'none',
                scrollTrigger: { trigger: section.querySelector('.timeline'), start: 'top 60%', end: 'bottom 40%', scrub: 1 }
            }
        );
    }

    items.forEach((item) => {
        const isRight = item.classList.contains('right');
        gsap.fromTo(item,
            { opacity: 0, x: isRight ? 80 : -80, y: 30 },
            {
                opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );

        const marker = item.querySelector('.marker-dot');
        if (marker) {
            gsap.fromTo(marker, { scale: 0 }, {
                scale: 1, duration: 0.5, ease: 'back.out(2)',
                scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none none' }
            });
        }
    });
}

function initStatsAnimation() {
    const section = document.querySelector('.stats-section');
    if (!section) return;

    gsap.fromTo(section.querySelectorAll('.stat-card'),
        { opacity: 0, y: 60, scale: 0.9 },
        {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
        }
    );
}

function initCTAAnimation() {
    const section = document.querySelector('.cta-section');
    if (!section) return;

    const card = section.querySelector('.cta-card');
    if (card) {
        gsap.to(card, {
            opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' }
        });
    }
}

function initFooterAnimation() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const brand = footer.querySelector('.footer-brand');
    const columns = footer.querySelectorAll('.footer-links-column');
    const bottom = footer.querySelector('.footer-bottom');

    const tl = gsap.timeline({
        scrollTrigger: { trigger: footer, start: 'top 85%', toggleActions: 'play none none none' }
    });

    if (brand) tl.to(brand, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    if (columns.length) tl.to(columns, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4');
    if (bottom) tl.fromTo(bottom, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
}

// ============================================
// PARALLAX EFFECTS (GSAP)
// ============================================

function initGSAPParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, i) => {
        gsap.to(orb, {
            y: (i + 1) * -100,
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
        });
    });

    document.querySelectorAll('.feature-card').forEach((card, i) => {
        gsap.to(card, {
            y: -20 - (i * 5),
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 2 }
        });
    });
}

// ============================================
// MAGNETIC BUTTONS (GSAP)
// ============================================

function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: 'power2.out' });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ============================================
// 3D TILT CARD EFFECT (GSAP enhanced)
// ============================================

function initTiltCards() {
    document.querySelectorAll('.feature-card, .stat-card, .step-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            gsap.to(card, {
                rotateX, rotateY, scale: 1.02,
                duration: 0.4, ease: 'power2.out', transformPerspective: 1000
            });

            let spotlight = card.querySelector('.card-spotlight');
            if (!spotlight) {
                spotlight = document.createElement('div');
                spotlight.className = 'card-spotlight';
                spotlight.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;z-index:1;transition:background 0.3s ease;';
                card.style.position = 'relative';
                card.appendChild(spotlight);
            }
            spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(201, 169, 110, 0.08) 0%, transparent 50%)`;
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0, rotateY: 0, scale: 1,
                duration: 0.7, ease: 'elastic.out(1, 0.5)', transformPerspective: 1000
            });
            const spotlight = card.querySelector('.card-spotlight');
            if (spotlight) spotlight.style.background = 'transparent';
        });
    });
}

// ============================================
// CURSOR GLOW
// ============================================

function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
        gsap.to(glow, { left: mouseX, top: mouseY, duration: 0.8, ease: 'power2.out' });
    });

    document.body.addEventListener('mouseenter', () => gsap.to(glow, { opacity: 1, duration: 0.5 }));
    document.body.addEventListener('mouseleave', () => gsap.to(glow, { opacity: 0, duration: 0.5 }));
}

// ============================================
// PARTICLE BACKGROUND
// ============================================

function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        if (target === 0) return;

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target, duration: 2, ease: 'power2.out',
                    onUpdate: () => { counter.textContent = Math.floor(obj.val).toLocaleString(); },
                    onComplete: () => { counter.textContent = target.toLocaleString(); }
                });
            }
        });
    });
}

// ============================================
// MARQUEE
// ============================================

function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    const marqueeSection = document.querySelector('.marquee-section');
    if (!marqueeContent || !marqueeSection) return;

    marqueeSection.addEventListener('mouseenter', () => { marqueeContent.style.animationPlayState = 'paused'; });
    marqueeSection.addEventListener('mouseleave', () => { marqueeContent.style.animationPlayState = 'running'; });

    // Parallax speed change on scroll
    gsap.to(marqueeContent, {
        x: -100,
        scrollTrigger: { trigger: marqueeSection, start: 'top bottom', end: 'bottom top', scrub: 2 }
    });
}

// ============================================
// TEXT SCRAMBLE EFFECT
// ============================================

function initTextScramble() {
    document.querySelectorAll('.gradient-text').forEach(el => {
        const originalText = el.textContent;
        const chars = '!<>-_\\/[]{}—=+*^?#________';

        ScrollTrigger.create({
            trigger: el, start: 'top 85%', once: true,
            onEnter: () => {
                let frame = 0;
                const scramble = () => {
                    if (frame < 20) {
                        el.textContent = originalText.split('').map((char, index) => {
                            if (index < frame) return originalText[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        }).join('');
                        frame++;
                        requestAnimationFrame(scramble);
                    } else {
                        el.textContent = originalText;
                    }
                };
                scramble();
            }
        });
    });
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function initScrollProgress() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    gsap.set(indicator, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(indicator, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
    });
}

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================

function showLanding() {
    const appPage = document.getElementById('app-page');
    const landingPage = document.getElementById('landing-page');

    const tl = gsap.timeline();
    tl.to(appPage, { opacity: 0, y: -40, duration: 0.5, ease: 'power3.inOut' });
    tl.add(() => {
        appPage.classList.add('hidden');
        gsap.set(appPage, { clearProps: 'all' });
        landingPage.classList.remove('hidden');
    });
    tl.fromTo(landingPage, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    tl.add(() => {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
        if (typeof AOS !== 'undefined') AOS.refresh();
    });
}

function showApp() {
    const landingPage = document.getElementById('landing-page');
    const appPage = document.getElementById('app-page');

    const tl = gsap.timeline();
    tl.to(landingPage, { opacity: 0, y: -40, duration: 0.5, ease: 'power3.inOut' });
    tl.add(() => {
        landingPage.classList.add('hidden');
        gsap.set(landingPage, { clearProps: 'all' });
        appPage.classList.remove('hidden');
        showInput();
    });
    tl.fromTo(appPage, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    tl.add(() => {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
        if (typeof AOS !== 'undefined') AOS.refresh();
    });
}

function showInput() {
    const inputSection = document.getElementById('input-section');
    const resultsSection = document.getElementById('results-section');

    resultsSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
    gsap.fromTo(inputSection, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
}

function showResults() {
    return new Promise((resolve) => {
        const inputSection = document.getElementById('input-section');
        const resultsSection = document.getElementById('results-section');

        if (!inputSection || !resultsSection) { resolve(); return; }

        gsap.to(inputSection, {
            opacity: 0, y: -30, duration: 0.4, ease: 'power3.inOut',
            onComplete: () => {
                inputSection.classList.add('hidden');
                gsap.set(inputSection, { clearProps: 'all' });
                resultsSection.classList.remove('hidden');
                gsap.fromTo(resultsSection, { opacity: 0, y: 40 }, {
                    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
                    onComplete: resolve
                });
            }
        });
    });
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el && lenis) lenis.scrollTo(el, { offset: -100, duration: 1.5 });
    else if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// FORM MANAGEMENT
// ============================================

let _progressDebounce = null;
function initFormProgress() {
    const containers = ['subjects-container', 'exams-container', 'projects-container'];
    const observer = new MutationObserver(() => {
        clearTimeout(_progressDebounce);
        _progressDebounce = setTimeout(updateFormProgress, 50);
    });
    containers.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el, { childList: true, subtree: true });
    });

    const sleepSlider = document.getElementById('sleep-range');
    if (sleepSlider) sleepSlider.addEventListener('input', updateFormProgress);
    updateFormProgress();
}

function updateFormProgress() {
    const steps = document.querySelectorAll('.progress-step');
    const fill = document.getElementById('form-progress-fill');
    if (!steps.length || !fill) return;

    const hasSubjects = document.querySelectorAll('#subjects-container .form-item').length > 0;
    const hasExams = document.querySelectorAll('#exams-container .form-item').length > 0;
    const hasProjects = document.querySelectorAll('#projects-container .form-item').length > 0;
    const sectionsDone = [true, hasSubjects, hasExams, hasProjects];
    const completedCount = sectionsDone.filter(Boolean).length;

    steps.forEach((step, i) => {
        step.classList.remove('active', 'completed');
        if (sectionsDone[i]) step.classList.add('completed');
    });

    const firstIncomplete = sectionsDone.indexOf(false);
    if (firstIncomplete !== -1) steps[firstIncomplete].classList.add('active');

    gsap.to(fill, { width: (completedCount / 4) * 100 + '%', duration: 0.6, ease: 'power3.out' });
}

function initSleepSlider() {
    const slider = document.getElementById('sleep-range');
    const display = document.getElementById('sleep-display');
    const qualityBadge = document.querySelector('.sleep-quality-badge');
    if (!slider || !display) return;

    const updateSleepQuality = (value) => {
        display.textContent = Number.isInteger(value) ? value : value.toFixed(1);
        if (!qualityBadge) return;

        const emoji = qualityBadge.querySelector('.quality-emoji');
        const text = qualityBadge.querySelector('.quality-text');
        let quality, emoj, bgColor, borderColor;

        if (value <= 4) { quality = 'Critical'; emoj = '😫'; bgColor = 'rgba(239, 68, 68, 0.2)'; borderColor = 'rgba(239, 68, 68, 0.4)'; if (text) text.style.color = '#ef4444'; }
        else if (value <= 5) { quality = 'Poor'; emoj = '😟'; bgColor = 'rgba(239, 68, 68, 0.15)'; borderColor = 'rgba(239, 68, 68, 0.3)'; if (text) text.style.color = '#ef4444'; }
        else if (value <= 6) { quality = 'Fair'; emoj = '😐'; bgColor = 'rgba(245, 158, 11, 0.15)'; borderColor = 'rgba(245, 158, 11, 0.3)'; if (text) text.style.color = '#f59e0b'; }
        else if (value <= 7) { quality = 'Good'; emoj = '🙂'; bgColor = 'rgba(16, 185, 129, 0.15)'; borderColor = 'rgba(16, 185, 129, 0.3)'; if (text) text.style.color = '#10b981'; }
        else if (value <= 8) { quality = 'Great'; emoj = '😊'; bgColor = 'rgba(16, 185, 129, 0.2)'; borderColor = 'rgba(16, 185, 129, 0.4)'; if (text) text.style.color = '#10b981'; }
        else { quality = 'Excellent'; emoj = '😴'; bgColor = 'rgba(6, 182, 212, 0.15)'; borderColor = 'rgba(6, 182, 212, 0.3)'; if (text) text.style.color = '#06b6d4'; }

        if (emoji) emoji.textContent = emoj;
        if (text) text.textContent = quality;
        qualityBadge.style.background = bgColor;
        qualityBadge.style.borderColor = borderColor;
    };

    slider.addEventListener('input', () => updateSleepQuality(parseFloat(slider.value)));
    updateSleepQuality(parseFloat(slider.value));
}

// Add form items with GSAP entrances
function addSubject() {
    const container = document.getElementById('subjects-container');
    const empty = container.querySelector('.empty-state');
    if (empty) gsap.to(empty, { opacity: 0, height: 0, duration: 0.3, onComplete: () => empty.remove() });

    const id = Date.now();
    const div = document.createElement('div');
    div.className = 'form-item';
    div.id = `subject-${id}`;
    div.innerHTML = `
        <input type="text" placeholder="Subject name (e.g., Calculus)">
        <select><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option></select>
        <input type="number" placeholder="Hours/week" min="1" max="40">
        <button class="btn-remove" onclick="removeItem('subject-${id}', 'subjects')"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(div);
    gsap.fromTo(div, { opacity: 0, y: -20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
    updateFormProgress();
}

function addExam() {
    const container = document.getElementById('exams-container');
    const empty = container.querySelector('.empty-state');
    if (empty) gsap.to(empty, { opacity: 0, height: 0, duration: 0.3, onComplete: () => empty.remove() });

    const id = Date.now();
    const div = document.createElement('div');
    div.className = 'form-item';
    div.id = `exam-${id}`;
    div.innerHTML = `
        <input type="text" placeholder="Exam name">
        <input type="date">
        <select><option value="quiz">Quiz</option><option value="midterm" selected>Midterm</option><option value="final">Final</option></select>
        <button class="btn-remove" onclick="removeItem('exam-${id}', 'exams')"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(div);
    gsap.fromTo(div, { opacity: 0, y: -20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
    updateFormProgress();
}

function addProject() {
    const container = document.getElementById('projects-container');
    const empty = container.querySelector('.empty-state');
    if (empty) gsap.to(empty, { opacity: 0, height: 0, duration: 0.3, onComplete: () => empty.remove() });

    const id = Date.now();
    const div = document.createElement('div');
    div.className = 'form-item';
    div.id = `project-${id}`;
    div.innerHTML = `
        <input type="text" placeholder="Project name">
        <input type="date">
        <input type="number" placeholder="Hours estimated" min="1" max="100">
        <button class="btn-remove" onclick="removeItem('project-${id}', 'projects')"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(div);
    gsap.fromTo(div, { opacity: 0, y: -20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
    updateFormProgress();
}

function removeItem(id, type) {
    const item = document.getElementById(id);
    if (item) {
        gsap.to(item, {
            opacity: 0, x: 30, height: 0, padding: 0, margin: 0,
            duration: 0.4, ease: 'power3.inOut', onComplete: () => item.remove()
        });
    }

    setTimeout(() => {
        const container = document.getElementById(`${type}-container`);
        if (container && container.children.length === 0) {
            const icons = { subjects: 'fa-book-open', exams: 'fa-file-alt', projects: 'fa-project-diagram' };
            const hints = { subjects: 'Click "Add Subject" to get started', exams: 'Click "Add Exam" to track deadlines', projects: 'Click "Add Project" to track assignments' };
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon"><i class="fas ${icons[type]}"></i></div>
                    <p>No ${type} added yet</p>
                    <span class="empty-hint">${hints[type]}</span>
                </div>
            `;
            gsap.fromTo(container.querySelector('.empty-state'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
        }
        updateFormProgress();

        // Auto-trigger analysis after removing an item (only if there's still data)
        const data = collectFormData();
        if (data.subjects.length > 0 || data.upcoming_exams.length > 0 || data.projects.length > 0) {
            analyzeWorkload();
        }
    }, 450);
}

// ============================================
// COLLECT FORM DATA
// ============================================

function collectFormData() {
    const sleepHours = parseFloat(document.getElementById('sleep-range').value) || 7;
    const subjects = [], exams = [], projects = [];

    document.querySelectorAll('#subjects-container .form-item').forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const name = inputs[0].value.trim();
        if (name) subjects.push({ name, difficulty: inputs[1].value, hours_per_week: parseInt(inputs[2].value) || 0 });
    });

    document.querySelectorAll('#exams-container .form-item').forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const name = inputs[0].value.trim();
        if (name) exams.push({ name, date: inputs[1].value, type: inputs[2].value });
    });

    document.querySelectorAll('#projects-container .form-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        const name = inputs[0].value.trim();
        if (name) projects.push({ name, deadline: inputs[1].value, estimated_hours: parseInt(inputs[2].value) || 0 });
    });

    return { sleep_hours: sleepHours, subjects, upcoming_exams: exams, projects };
}

// ============================================
// CLIENT-SIDE ANALYSIS (FALLBACK)
// ============================================

function analyzeWorkloadLocally(data) {
    const weights = { homework: 1.5, exams: 3.0, projects: 2.0, sleep_deficit: 2.5, deadline_clustering: 2.0 };
    const scores = { homework: 0, exams: 0, projects: 0, sleep_deficit: 0, deadline_clustering: 0 };
    const today = new Date();

    const subjects = data.subjects || [];
    scores.homework = Math.min(subjects.reduce((sum, s) => sum + (s.hours_per_week || 0), 0) * weights.homework, 30);

    for (const exam of (data.upcoming_exams || [])) {
        try {
            const daysUntil = Math.floor((new Date(exam.date) - today) / (1000 * 60 * 60 * 24));
            if (daysUntil >= 0 && daysUntil <= 14) {
                const diff = { quiz: 0.5, midterm: 1.0, final: 1.5 }[exam.type || 'medium'] || 1.0;
                scores.exams += Math.max(0, (14 - daysUntil) / 14) * weights.exams * diff * 5;
            }
        } catch (e) { }
    }
    scores.exams = Math.min(scores.exams, 30);

    for (const project of (data.projects || [])) {
        try {
            const daysUntil = Math.floor((new Date(project.deadline) - today) / (1000 * 60 * 60 * 24));
            if (daysUntil >= 0 && daysUntil <= 21) scores.projects += Math.max(0, (21 - daysUntil) / 21) * weights.projects * 5;
        } catch (e) { }
    }
    scores.projects = Math.min(scores.projects, 25);

    if ((data.sleep_hours || 8) < 7) scores.sleep_deficit = (7 - (data.sleep_hours || 8)) * weights.sleep_deficit * 3;
    scores.sleep_deficit = Math.min(scores.sleep_deficit, 20);

    const allDeadlines = [];
    (data.upcoming_exams || []).forEach(e => { try { allDeadlines.push(new Date(e.date)); } catch (err) { } });
    (data.projects || []).forEach(p => { try { allDeadlines.push(new Date(p.deadline)); } catch (err) { } });
    allDeadlines.sort((a, b) => a - b);

    let clusterPenalty = 0;
    for (let i = 0; i < allDeadlines.length - 1; i++) {
        const daysApart = Math.floor((allDeadlines[i + 1] - allDeadlines[i]) / (1000 * 60 * 60 * 24));
        if (daysApart <= 3) clusterPenalty += (4 - daysApart) * weights.deadline_clustering;
    }
    scores.deadline_clustering = Math.min(clusterPenalty, 15);

    let totalScore = Math.round(Math.min(Math.max(Object.values(scores).reduce((a, b) => a + b, 0), 0), 100) * 10) / 10;
    const riskLevel = totalScore <= 30 ? 'low' : totalScore <= 60 ? 'medium' : 'high';

    const causes = [], recommendations = [];
    if (scores.homework > 15) { causes.push('Heavy homework load across subjects'); recommendations.push('Prioritize assignments by due date and importance'); }
    if (scores.exams > 15) { causes.push('Multiple upcoming exams creating pressure'); recommendations.push('Create a study schedule with active recall techniques'); }
    if (scores.projects > 12) { causes.push('Project deadlines approaching'); recommendations.push('Break projects into smaller milestones'); }
    if (scores.sleep_deficit > 8) { causes.push('Insufficient sleep affecting performance'); recommendations.push('Aim for 7-8 hours of sleep for better focus'); }
    if (scores.deadline_clustering > 8) { causes.push('Multiple deadlines clustered together'); recommendations.push('Talk to professors about deadline flexibility'); }
    if (causes.length === 0) { causes.push('Workload is manageable'); recommendations.push('Keep up the good work!'); }

    return {
        risk_score: totalScore, risk_level: riskLevel,
        breakdown: { sleep: Math.round(scores.sleep_deficit * 5), study: Math.round(scores.homework * 3.3), exams: Math.round(scores.exams * 3.3), projects: Math.round(scores.projects * 4) },
        causes, recommendations,
        ai_recommendation: riskLevel === 'high' ? 'Your workload is quite heavy right now. Focus on your most urgent deadline first, and try to get at least 7 hours of sleep tonight. You\'ve got this! 💪'
            : riskLevel === 'medium' ? 'You\'re juggling a decent amount. Consider blocking out focused study sessions and taking short breaks to stay sharp. Keep going! 🌟'
                : 'Great balance! You\'re managing your workload well. Keep maintaining healthy habits and stay consistent. 😊'
    };
}

// ============================================
// ANALYZE WORKLOAD
// ============================================

async function analyzeWorkload() {
    const data = collectFormData();
    if (data.subjects.length === 0 && data.upcoming_exams.length === 0 && data.projects.length === 0) {
        alert('Please add at least one subject, exam, or project.');
        return;
    }

    const loadingEl = document.getElementById('loading');
    if (!loadingEl) return;
    loadingEl.classList.remove('hidden');
    gsap.fromTo(loadingEl, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    animateLoadingSteps();

    const minLoadTime = 4500;
    const startTime = Date.now();

    try {
        let result;
        try {
            const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('NOT_JSON');
            result = await response.json();
            if (result.error) throw new Error(result.error);
        } catch (apiErr) {
            console.warn('API unavailable, using local analysis:', apiErr.message);
            result = analyzeWorkloadLocally(data);
        }

        const remaining = Math.max(0, minLoadTime - (Date.now() - startTime));
        await new Promise(resolve => setTimeout(resolve, remaining));

        // Show results section FIRST so DOM elements are available for GSAP
        await showResults();
        displayResults(result);
    } catch (err) {
        alert('Error analyzing workload: ' + err.message);
    } finally {
        gsap.to(loadingEl, { opacity: 0, duration: 0.4, ease: 'power2.inOut', onComplete: () => loadingEl.classList.add('hidden') });
    }
}

// ============================================
// DISPLAY RESULTS (GSAP animated)
// ============================================

function displayResults(result) {
    const score = result.risk_score || 0;
    const level = result.risk_level || 'low';

    const scoreEl = document.getElementById('risk-score');
    if (scoreEl) {
        const counter = { val: 0 };
        gsap.to(counter, { val: score, duration: 1.5, ease: 'power2.out', onUpdate: () => { scoreEl.textContent = Math.round(counter.val); } });
        scoreEl.style.color = level === 'low' ? '#10b981' : level === 'medium' ? '#f59e0b' : '#ef4444';
    }

    const progress = document.getElementById('risk-progress');
    if (progress) {
        const offset = 534 - (score / 100) * 534;
        gsap.to(progress, { strokeDashoffset: offset, duration: 1.5, ease: 'power3.out', delay: 0.3 });
        progress.style.stroke = level === 'low' ? 'url(#riskGradientLow)' : level === 'medium' ? 'url(#riskGradientMedium)' : 'url(#riskGradientHigh)';
    }

    const indicatorMarker = document.querySelector('.indicator-marker');
    if (indicatorMarker) gsap.to(indicatorMarker, { left: score + '%', duration: 1.2, ease: 'power3.out', delay: 0.3 });

    const emojis = { low: '😊', medium: '😐', high: '😰' };
    const labels = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' };
    const summaries = { low: 'Great balance! You\'re managing your workload well.', medium: 'Watch out! Your workload is getting heavy.', high: 'Take action! You\'re at risk of burnout.' };

    const emojiEl = document.getElementById('risk-emoji');
    if (emojiEl) emojiEl.textContent = emojis[level];
    const badge = document.getElementById('risk-badge');
    if (badge) { badge.textContent = labels[level]; badge.className = 'risk-badge ' + level; }
    const labelEl = document.getElementById('risk-label');
    if (labelEl) labelEl.textContent = labels[level];
    const summaryEl = document.getElementById('risk-summary');
    if (summaryEl) summaryEl.textContent = summaries[level];

    // AI recommendation with typing effect
    const aiMsg = document.getElementById('ai-message');
    if (aiMsg) {
        const fullText = result.ai_recommendation || 'Keep up the good work!';
        aiMsg.textContent = '';
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < fullText.length) { aiMsg.textContent += fullText[charIndex]; charIndex++; setTimeout(typeChar, 20 + Math.random() * 30); }
        };
        setTimeout(typeChar, 500);
    }

    // Breakdown chart
    const breakdown = result.breakdown || {};
    const chart = document.getElementById('breakdown-chart');
    if (!chart) return;
    chart.innerHTML = '';

    [
        { key: 'sleep', label: 'Sleep Score', color: 'linear-gradient(90deg, #6366f1, #8b5cf6)' },
        { key: 'study', label: 'Study Load', color: 'linear-gradient(90deg, #f59e0b, #f97316)' },
        { key: 'exams', label: 'Exam Stress', color: 'linear-gradient(90deg, #ef4444, #f97316)' },
        { key: 'projects', label: 'Project Load', color: 'linear-gradient(90deg, #10b981, #14b8a6)' }
    ].forEach((item, index) => {
        const value = Math.min(breakdown[item.key] || 0, 100);
        const div = document.createElement('div');
        div.className = 'breakdown-item';
        div.innerHTML = `<span class="breakdown-label">${item.label}</span><div class="breakdown-bar"><div class="breakdown-fill" style="width: 0%; background: ${item.color};"></div></div><span class="breakdown-value">${value}%</span>`;
        chart.appendChild(div);
        gsap.to(div.querySelector('.breakdown-fill'), { width: value + '%', duration: 1.2, delay: 0.3 + index * 0.15, ease: 'power3.out' });
    });

    // Causes & Recommendations
    ['causes-list', 'recommendations-list'].forEach(listId => {
        const list = document.getElementById(listId);
        if (!list) return;
        list.innerHTML = '';
        const items = listId === 'causes-list' ? (result.causes || []) : (result.recommendations || []);
        items.forEach((text, index) => {
            const li = document.createElement('li');
            li.textContent = text;
            list.appendChild(li);
            gsap.fromTo(li, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.4 + index * 0.1, ease: 'power3.out' });
        });
    });
}

// ============================================
// LOADING STEPS ANIMATION
// ============================================

function animateLoadingSteps() {
    const steps = document.querySelectorAll('.loading-step');
    steps.forEach(step => { step.classList.remove('active'); step.querySelector('i').className = 'fas fa-circle'; });

    steps.forEach((step, index) => {
        setTimeout(() => {
            for (let i = 0; i < index; i++) { steps[i].classList.add('active'); steps[i].querySelector('i').className = 'fas fa-check-circle'; }
            step.classList.add('active');
            step.querySelector('i').className = 'fas fa-spinner fa-spin';
        }, index * 1400);
    });

    setTimeout(() => { steps.forEach(s => { s.classList.add('active'); s.querySelector('i').className = 'fas fa-check-circle'; }); }, steps.length * 1400);
}

// ============================================
// RESET FORM
// ============================================

function resetForm() {
    document.getElementById('sleep-range').value = 7;
    document.getElementById('sleep-display').textContent = '7';

    const qualityBadge = document.querySelector('.sleep-quality-badge');
    if (qualityBadge) {
        const emoji = qualityBadge.querySelector('.quality-emoji');
        const text = qualityBadge.querySelector('.quality-text');
        if (emoji) emoji.textContent = '🙂';
        if (text) { text.textContent = 'Good'; text.style.color = '#10b981'; }
        qualityBadge.style.background = 'rgba(16, 185, 129, 0.15)';
        qualityBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    }

    ['subjects', 'exams', 'projects'].forEach(type => {
        const container = document.getElementById(`${type}-container`);
        const icons = { subjects: 'fa-book-open', exams: 'fa-file-alt', projects: 'fa-project-diagram' };
        const hints = { subjects: 'Click "Add Subject" to get started', exams: 'Click "Add Exam" to track deadlines', projects: 'Click "Add Project" to track assignments' };
        container.innerHTML = `<div class="empty-state"><div class="empty-icon"><i class="fas ${icons[type]}"></i></div><p>No ${type} added yet</p><span class="empty-hint">${hints[type]}</span></div>`;
    });

    showInput();
    if (lenis) lenis.scrollTo(0, { duration: 1 });
}

// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Lenis smooth scroll first
    initLenis();

    // Run preloader
    await initPreloader();

    // Initialize AOS (complementary to GSAP)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60, delay: 0, anchorPlacement: 'top-bottom' });
    }

    // Initialize all GSAP animations
    initNavbarAnimation();
    initHeroAnimations();
    initSectionAnimations();
    initGSAPParallax();

    // Interactive effects
    initMagneticButtons();
    initTiltCards();
    initCursorGlow();
    initParticles();
    initMarquee();

    // Text effects
    initTextScramble();
    initScrollProgress();

    // Counter animations
    animateCounters();

    // Form functionality
    initSleepSlider();
    initFormProgress();

    // Mobile menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            document.querySelector('.nav-links')?.classList.toggle('mobile-open');
        });
    }

    // Handle form submission
    const form = document.getElementById('loadcheck-form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); analyzeWorkload(); });
});
// ============================================
// AI CHATBOT FUNCTIONALITY
// ============================================

// Store current analysis result for chat context
let currentAnalysisResult = null;
let chatHistory = [];
let floatingChatHistory = [];

// Store analysis result when displaying results
const originalDisplayResults = typeof displayResults === 'function' ? displayResults : null;

// Toggle floating chatbot
function toggleFloatingChat() {
    const chatbot = document.getElementById('floating-chatbot');
    if (chatbot) {
        chatbot.classList.toggle('open');
    }
}

// Handle keypress in chat input
function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function handleFloatingChatKeypress(event) {
    if (event.key === 'Enter') {
        sendFloatingChatMessage();
    }
}

// Add message to chat
function addChatMessage(containerId, message, isUser = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Add typing indicator
function addTypingIndicator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message ai-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
    return typingDiv;
}

// Send chat message (results page chatbot)
async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    input.value = '';
    addChatMessage('chat-messages', message, true);
    
    // Add to history
    chatHistory.push({ role: 'user', content: message });
    
    const typingIndicator = addTypingIndicator('chat-messages');
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                context: {
                    analysisResult: currentAnalysisResult,
                    history: chatHistory.slice(-6)
                }
            })
        });
        
        const data = await response.json();
        
        if (typingIndicator) typingIndicator.remove();
        
        if (data.success && data.reply) {
            addChatMessage('chat-messages', data.reply, false);
            chatHistory.push({ role: 'assistant', content: data.reply });
        } else {
            addChatMessage('chat-messages', 'Sorry, I couldn\'t process that. Please try again.', false);
        }
    } catch (error) {
        if (typingIndicator) typingIndicator.remove();
        addChatMessage('chat-messages', 'Connection error. Please check your internet and try again.', false);
    }
}

// Send floating chat message
async function sendFloatingChatMessage() {
    const input = document.getElementById('floating-chat-input');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    input.value = '';
    addChatMessage('floating-chat-messages', message, true);
    
    floatingChatHistory.push({ role: 'user', content: message });
    
    const typingIndicator = addTypingIndicator('floating-chat-messages');
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                context: {
                    analysisResult: currentAnalysisResult,
                    history: floatingChatHistory.slice(-6)
                }
            })
        });
        
        const data = await response.json();
        
        if (typingIndicator) typingIndicator.remove();
        
        if (data.success && data.reply) {
            addChatMessage('floating-chat-messages', data.reply, false);
            floatingChatHistory.push({ role: 'assistant', content: data.reply });
        } else {
            addChatMessage('floating-chat-messages', 'Sorry, I couldn\'t process that. Please try again.', false);
        }
    } catch (error) {
        if (typingIndicator) typingIndicator.remove();
        addChatMessage('floating-chat-messages', 'Connection error. Please check your internet and try again.', false);
    }
}

// Suggestion chips
function askSuggestion(text) {
    const input = document.getElementById('chat-input');
    if (input) {
        input.value = text;
        sendChatMessage();
    }
}

function askFloatingSuggestion(text) {
    const input = document.getElementById('floating-chat-input');
    if (input) {
        input.value = text;
        sendFloatingChatMessage();
    }
}

// Override displayResults to store analysis result
(function() {
    const originalFn = window.displayResults || displayResults;
    if (typeof originalFn === 'function') {
        window.displayResults = function(result) {
            currentAnalysisResult = result;
            chatHistory = []; // Reset chat history for new analysis
            return originalFn.apply(this, arguments);
        };
    }
})();