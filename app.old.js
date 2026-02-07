// LoadCheck - Premium Animated JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Remove preload class after page load
    document.body.classList.add('preload');
    setTimeout(() => document.body.classList.remove('preload'), 100);

    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 50,
        anchorPlacement: 'top-bottom'
    });

    // Initialize cursor effects
    initCursorGlow();
    initCursorDot();

    // Initialize particles
    initParticles();

    // Animate counters on landing page
    animateCounters();

    // Initialize sleep slider
    initSleepSlider();

    // Initialize form progress tracking
    initFormProgress();

    // Initialize timeline animation
    initTimelineAnimation();

    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize magnetic buttons
    initMagneticButtons();

    // Initialize scroll progress indicator
    initScrollProgress();

    // Initialize reveal animations
    initRevealAnimations();

    // Initialize parallax effects
    initParallax();

    // Initialize smooth reveal on sections
    initSectionReveals();

    // Initialize 3D tilt cards
    initTiltCards();

    // Initialize text scramble effect
    initTextScramble();

    // Handle form submission
    const form = document.getElementById('loadcheck-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            analyzeWorkload();
        });
    }
});

// 3D Tilt Card Effect
function initTiltCards() {
    const cards = document.querySelectorAll('.feature-card, .stat-item, .dashboard-preview');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Add spotlight effect
            const spotlight = card.querySelector('.card-spotlight') || createSpotlight(card);
            spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15) 0%, transparent 50%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const spotlight = card.querySelector('.card-spotlight');
            if (spotlight) spotlight.style.background = 'transparent';
        });
    });
}

function createSpotlight(card) {
    const spotlight = document.createElement('div');
    spotlight.className = 'card-spotlight';
    spotlight.style.cssText = `
        position: absolute;
        inset: 0;
        pointer-events: none;
        border-radius: inherit;
        z-index: 1;
        transition: background 0.3s ease;
    `;
    card.style.position = 'relative';
    card.appendChild(spotlight);
    return spotlight;
}

// Text scramble effect for hero title
function initTextScramble() {
    const gradientText = document.querySelector('.gradient-text');
    if (!gradientText) return;

    const originalText = gradientText.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let frame = 0;
    let frameRequest;

    const scramble = () => {
        if (frame < 20) {
            gradientText.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < frame) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            frame++;
            frameRequest = requestAnimationFrame(scramble);
        } else {
            gradientText.textContent = originalText;
        }
    };

    // Run scramble once on load
    setTimeout(() => {
        frame = 0;
        scramble();
    }, 1000);
}

// Scroll progress indicator
function initScrollProgress() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        indicator.style.transform = `scaleX(${scrollPercent})`;
    }, { passive: true });
}

// Reveal animations with Intersection Observer
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .blur-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Enhanced Section Reveals
function initSectionReveals() {
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.feature-card, .stat-card, .step-card, .timeline-item');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Parallax effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.gradient-orb, .floating-shape');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach((el, index) => {
            const speed = 0.05 + (index * 0.02);
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });

    // Mouse parallax for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

            const orbs = hero.querySelectorAll('.gradient-orb');
            orbs.forEach((orb, index) => {
                const depth = (index + 1) * 10;
                orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
            });
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// Magnetic button effect
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Timeline scroll animation
function initTimelineAnimation() {
    const timeline = document.querySelector('.timeline');
    const progress = document.querySelector('.timeline-progress');
    if (!timeline || !progress) return;

    const updateProgress = () => {
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = rect.top;
        const timelineHeight = rect.height;

        if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
            const scrolled = Math.max(0, windowHeight - timelineTop);
            const percentage = Math.min((scrolled / (timelineHeight + windowHeight * 0.5)) * 100, 100);
            progress.style.height = percentage + '%';
        }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

// Cursor glow effect
function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// Cursor dot effect
function initCursorDot() {
    const dot = document.querySelector('.cursor-dot');
    if (!dot) return;

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
        });
    });

    // Scale on clickable elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Particle background
function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Animate stat counters with easing
function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        if (target === 0) return;

        const duration = 2000;
        const startTime = performance.now();

        const animateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const current = Math.floor(easedProgress * target);

            counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animateNumber);
            } else {
                counter.textContent = target.toLocaleString();
                // Add a subtle pulse when complete
                counter.style.animation = 'statNumberPulse 0.4s ease-out';
            }
        };

        // Use Intersection Observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animateNumber);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Form progress tracking
let _progressDebounce = null;
function initFormProgress() {
    // Use MutationObserver to detect when items are added/removed
    const containers = ['subjects-container', 'exams-container', 'projects-container'];
    const observer = new MutationObserver(() => {
        clearTimeout(_progressDebounce);
        _progressDebounce = setTimeout(updateFormProgress, 50);
    });
    containers.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el, { childList: true, subtree: true });
    });

    // Also track sleep slider changes
    const sleepSlider = document.getElementById('sleep-range');
    if (sleepSlider) sleepSlider.addEventListener('input', updateFormProgress);

    // Initial update
    updateFormProgress();
}

function updateFormProgress() {
    const steps = document.querySelectorAll('.progress-step');
    const fill = document.getElementById('form-progress-fill');
    if (!steps.length || !fill) return;

    const sleepSlider = document.getElementById('sleep-range');
    const hasSubjects = document.querySelectorAll('#subjects-container .form-item').length > 0;
    const hasExams = document.querySelectorAll('#exams-container .form-item').length > 0;
    const hasProjects = document.querySelectorAll('#projects-container .form-item').length > 0;

    // Sleep is always "completed" since it has a default value
    const sleepTouched = sleepSlider && sleepSlider.value !== '7';
    const sectionsDone = [true, hasSubjects, hasExams, hasProjects]; // sleep always counts
    const completedCount = sectionsDone.filter(Boolean).length;

    steps.forEach((step, i) => {
        step.classList.remove('active', 'completed');
        if (sectionsDone[i]) {
            step.classList.add('completed');
        }
    });

    // Mark the first incomplete as active
    const firstIncomplete = sectionsDone.indexOf(false);
    if (firstIncomplete !== -1) {
        steps[firstIncomplete].classList.add('active');
    }

    // Update progress bar width
    const percent = (completedCount / 4) * 100;
    fill.style.width = percent + '%';
}

// Sleep slider
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

        if (value <= 4) {
            quality = 'Critical';
            emoj = '😫';
            bgColor = 'rgba(239, 68, 68, 0.2)';
            borderColor = 'rgba(239, 68, 68, 0.4)';
            if (text) text.style.color = '#ef4444';
        } else if (value <= 5) {
            quality = 'Poor';
            emoj = '😟';
            bgColor = 'rgba(239, 68, 68, 0.15)';
            borderColor = 'rgba(239, 68, 68, 0.3)';
            if (text) text.style.color = '#ef4444';
        } else if (value <= 6) {
            quality = 'Fair';
            emoj = '😐';
            bgColor = 'rgba(245, 158, 11, 0.15)';
            borderColor = 'rgba(245, 158, 11, 0.3)';
            if (text) text.style.color = '#f59e0b';
        } else if (value <= 7) {
            quality = 'Good';
            emoj = '🙂';
            bgColor = 'rgba(16, 185, 129, 0.15)';
            borderColor = 'rgba(16, 185, 129, 0.3)';
            if (text) text.style.color = '#10b981';
        } else if (value <= 8) {
            quality = 'Great';
            emoj = '😊';
            bgColor = 'rgba(16, 185, 129, 0.2)';
            borderColor = 'rgba(16, 185, 129, 0.4)';
            if (text) text.style.color = '#10b981';
        } else {
            quality = 'Excellent';
            emoj = '😴';
            bgColor = 'rgba(6, 182, 212, 0.15)';
            borderColor = 'rgba(6, 182, 212, 0.3)';
            if (text) text.style.color = '#06b6d4';
        }

        if (emoji) emoji.textContent = emoj;
        if (text) text.textContent = quality;
        qualityBadge.style.background = bgColor;
        qualityBadge.style.borderColor = borderColor;
    };

    slider.addEventListener('input', () => {
        updateSleepQuality(parseFloat(slider.value));
    });

    // Initialize
    updateSleepQuality(parseFloat(slider.value));
}

// Navigation functions with smooth transitions
function showLanding() {
    const appPage = document.getElementById('app-page');
    const landingPage = document.getElementById('landing-page');

    // Add exit animation
    appPage.classList.add('page-exit');

    setTimeout(() => {
        appPage.classList.add('hidden');
        appPage.classList.remove('page-exit');
        landingPage.classList.remove('hidden');
        landingPage.classList.add('page-enter');

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Re-init AOS for new elements
        setTimeout(() => {
            AOS.refresh();
            landingPage.classList.remove('page-enter');
        }, 100);
    }, 400);
}

function showApp() {
    const landingPage = document.getElementById('landing-page');
    const appPage = document.getElementById('app-page');

    // Add exit animation
    landingPage.classList.add('page-exit');

    setTimeout(() => {
        landingPage.classList.add('hidden');
        landingPage.classList.remove('page-exit');
        appPage.classList.remove('hidden');
        appPage.classList.add('page-enter');
        showInput();

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Re-init AOS for new elements
        setTimeout(() => {
            AOS.refresh();
            appPage.classList.remove('page-enter');
        }, 100);
    }, 400);
}

function showInput() {
    const inputSection = document.getElementById('input-section');
    const resultsSection = document.getElementById('results-section');

    resultsSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
    inputSection.classList.add('page-enter');

    setTimeout(() => inputSection.classList.remove('page-enter'), 600);
}

function showResults() {
    const inputSection = document.getElementById('input-section');
    const resultsSection = document.getElementById('results-section');

    inputSection.classList.add('page-exit');

    setTimeout(() => {
        inputSection.classList.add('hidden');
        inputSection.classList.remove('page-exit');
        resultsSection.classList.remove('hidden');
        resultsSection.classList.add('page-enter');

        setTimeout(() => resultsSection.classList.remove('page-enter'), 600);
    }, 400);
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Add form items
function addSubject() {
    const container = document.getElementById('subjects-container');
    const empty = container.querySelector('.empty-state');
    if (empty) empty.remove();

    const id = Date.now();
    const div = document.createElement('div');
    div.className = 'form-item';
    div.id = `subject-${id}`;
    div.innerHTML = `
        <input type="text" placeholder="Subject name (e.g., Calculus)">
        <select>
            <option value="easy">Easy</option>
            <option value="medium" selected>Medium</option>
            <option value="hard">Hard</option>
        </select>
        <input type="number" placeholder="Hours/week" min="1" max="40">
        <button class="btn-remove" onclick="removeItem('subject-${id}', 'subjects')">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
    updateFormProgress();
}

function addExam() {
    const container = document.getElementById('exams-container');
    const empty = container.querySelector('.empty-state');
    if (empty) empty.remove();

    const id = Date.now();
    const div = document.createElement('div');
    div.className = 'form-item';
    div.id = `exam-${id}`;
    div.innerHTML = `
        <input type="text" placeholder="Exam name">
        <input type="date">
        <select>
            <option value="quiz">Quiz</option>
            <option value="midterm" selected>Midterm</option>
            <option value="final">Final</option>
        </select>
        <button class="btn-remove" onclick="removeItem('exam-${id}', 'exams')">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
    updateFormProgress();
}

function addProject() {
    const container = document.getElementById('projects-container');
    const empty = container.querySelector('.empty-state');
    if (empty) empty.remove();

    const id = Date.now();
    const div = document.createElement('div');
    div.className = 'form-item';
    div.id = `project-${id}`;
    div.innerHTML = `
        <input type="text" placeholder="Project name">
        <input type="date">
        <input type="number" placeholder="Hours estimated" min="1" max="100">
        <button class="btn-remove" onclick="removeItem('project-${id}', 'projects')">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
    updateFormProgress();
}

function removeItem(id, type) {
    const item = document.getElementById(id);
    if (item) {
        item.style.animation = 'form-item-exit 0.3s ease forwards';
        setTimeout(() => item.remove(), 300);
    }

    setTimeout(() => {
        const container = document.getElementById(`${type}-container`);
        if (container && container.children.length === 0) {
            const icons = {
                subjects: 'fa-book-open',
                exams: 'fa-file-alt',
                projects: 'fa-project-diagram'
            };
            const hints = {
                subjects: 'Click "Add Subject" to get started',
                exams: 'Click "Add Exam" to track deadlines',
                projects: 'Click "Add Project" to track assignments'
            };
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas ${icons[type]}"></i>
                    </div>
                    <p>No ${type} added yet</p>
                    <span class="empty-hint">${hints[type]}</span>
                </div>
            `;
        }
        updateFormProgress();
    }, 350);
}

// Collect form data
function collectFormData() {
    const sleepHours = parseFloat(document.getElementById('sleep-range').value) || 7;

    const subjects = [];
    document.querySelectorAll('#subjects-container .form-item').forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const name = inputs[0].value.trim();
        if (name) {
            subjects.push({
                name,
                difficulty: inputs[1].value,
                hours_per_week: parseInt(inputs[2].value) || 0
            });
        }
    });

    const exams = [];
    document.querySelectorAll('#exams-container .form-item').forEach(item => {
        const inputs = item.querySelectorAll('input, select');
        const name = inputs[0].value.trim();
        if (name) {
            exams.push({
                name,
                date: inputs[1].value,
                type: inputs[2].value
            });
        }
    });

    const projects = [];
    document.querySelectorAll('#projects-container .form-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        const name = inputs[0].value.trim();
        if (name) {
            projects.push({
                name,
                deadline: inputs[1].value,
                estimated_hours: parseInt(inputs[2].value) || 0
            });
        }
    });

    return {
        sleep_hours: sleepHours,
        subjects,
        upcoming_exams: exams,
        projects
    };
}

// Client-side workload analysis (fallback when API unavailable)
function analyzeWorkloadLocally(data) {
    const weights = { homework: 1.5, exams: 3.0, projects: 2.0, sleep_deficit: 2.5, deadline_clustering: 2.0 };
    const scores = { homework: 0, exams: 0, projects: 0, sleep_deficit: 0, deadline_clustering: 0 };
    const today = new Date();

    // Homework load
    const subjects = data.subjects || [];
    const totalHours = subjects.reduce((sum, s) => sum + (s.hours_per_week || 0), 0);
    scores.homework = Math.min(totalHours * weights.homework, 30);

    // Exam stress
    const exams = data.upcoming_exams || [];
    for (const exam of exams) {
        try {
            const examDate = new Date(exam.date);
            const daysUntil = Math.floor((examDate - today) / (1000 * 60 * 60 * 24));
            if (daysUntil >= 0 && daysUntil <= 14) {
                const diffValue = exam.type || 'medium';
                const diff = { quiz: 0.5, midterm: 1.0, final: 1.5 }[diffValue] || 1.0;
                const urgency = Math.max(0, (14 - daysUntil) / 14);
                scores.exams += urgency * weights.exams * diff * 5;
            }
        } catch (e) { }
    }
    scores.exams = Math.min(scores.exams, 30);

    // Project load
    const projects = data.projects || [];
    for (const project of projects) {
        try {
            const deadline = new Date(project.deadline);
            const daysUntil = Math.floor((deadline - today) / (1000 * 60 * 60 * 24));
            if (daysUntil >= 0 && daysUntil <= 21) {
                const urgency = Math.max(0, (21 - daysUntil) / 21);
                scores.projects += urgency * weights.projects * 5;
            }
        } catch (e) { }
    }
    scores.projects = Math.min(scores.projects, 25);

    // Sleep deficit
    const sleepHours = data.sleep_hours || 8;
    if (sleepHours < 7) {
        scores.sleep_deficit = (7 - sleepHours) * weights.sleep_deficit * 3;
    }
    scores.sleep_deficit = Math.min(scores.sleep_deficit, 20);

    // Deadline clustering
    const allDeadlines = [];
    exams.forEach(e => { try { allDeadlines.push(new Date(e.date)); } catch (err) { } });
    projects.forEach(p => { try { allDeadlines.push(new Date(p.deadline)); } catch (err) { } });
    allDeadlines.sort((a, b) => a - b);
    let clusterPenalty = 0;
    for (let i = 0; i < allDeadlines.length - 1; i++) {
        const daysApart = Math.floor((allDeadlines[i + 1] - allDeadlines[i]) / (1000 * 60 * 60 * 24));
        if (daysApart <= 3) clusterPenalty += (4 - daysApart) * weights.deadline_clustering;
    }
    scores.deadline_clustering = Math.min(clusterPenalty, 15);

    let totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    totalScore = Math.min(Math.max(totalScore, 0), 100);
    totalScore = Math.round(totalScore * 10) / 10;

    const riskLevel = totalScore <= 30 ? 'low' : totalScore <= 60 ? 'medium' : 'high';

    const causes = [];
    const recommendations = [];
    if (scores.homework > 15) { causes.push('Heavy homework load across subjects'); recommendations.push('Prioritize assignments by due date and importance'); }
    if (scores.exams > 15) { causes.push('Multiple upcoming exams creating pressure'); recommendations.push('Create a study schedule with active recall techniques'); }
    if (scores.projects > 12) { causes.push('Project deadlines approaching'); recommendations.push('Break projects into smaller milestones'); }
    if (scores.sleep_deficit > 8) { causes.push('Insufficient sleep affecting performance'); recommendations.push('Aim for 7-8 hours of sleep for better focus'); }
    if (scores.deadline_clustering > 8) { causes.push('Multiple deadlines clustered together'); recommendations.push('Talk to professors about deadline flexibility'); }
    if (causes.length === 0) { causes.push('Workload is manageable'); recommendations.push('Keep up the good work!'); }

    return {
        risk_score: totalScore,
        risk_level: riskLevel,
        breakdown: {
            sleep: Math.round(scores.sleep_deficit * 5),
            study: Math.round(scores.homework * 3.3),
            exams: Math.round(scores.exams * 3.3),
            projects: Math.round(scores.projects * 4)
        },
        causes,
        recommendations,
        ai_recommendation: riskLevel === 'high'
            ? 'Your workload is quite heavy right now. Focus on your most urgent deadline first, and try to get at least 7 hours of sleep tonight. You\'ve got this! 💪'
            : riskLevel === 'medium'
                ? 'You\'re juggling a decent amount. Consider blocking out focused study sessions and taking short breaks to stay sharp. Keep going! 🌟'
                : 'Great balance! You\'re managing your workload well. Keep maintaining healthy habits and stay consistent. 😊'
    };
}

// Analyze workload
async function analyzeWorkload() {
    const data = collectFormData();

    // Validate
    if (data.subjects.length === 0 && data.upcoming_exams.length === 0 && data.projects.length === 0) {
        alert('Please add at least one subject, exam, or project.');
        return;
    }

    // Show loading
    document.getElementById('loading').classList.remove('hidden');
    animateLoadingSteps();

    // Minimum loading time so users can enjoy the animation
    const minLoadTime = 4500;
    const startTime = Date.now();

    try {
        let result;

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new Error('NOT_JSON');
            }

            result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }
        } catch (apiErr) {
            // Fallback to client-side analysis
            console.warn('API unavailable, using local analysis:', apiErr.message);
            result = analyzeWorkloadLocally(data);
        }

        // Wait remaining time so loading animation plays fully
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadTime - elapsed);
        await new Promise(resolve => setTimeout(resolve, remaining));

        displayResults(result);
        showResults();
    } catch (err) {
        alert('Error analyzing workload: ' + err.message);
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}

// Display results
function displayResults(result) {
    const score = result.risk_score;
    const level = result.risk_level;

    // Update score
    document.getElementById('risk-score').textContent = score;

    // Update circle
    const progress = document.getElementById('risk-progress');
    const circumference = 534;
    const offset = circumference - (score / 100) * circumference;
    progress.style.strokeDashoffset = offset;

    // Set gradient based on level
    let gradientId;
    if (level === 'low') gradientId = 'url(#riskGradientLow)';
    else if (level === 'medium') gradientId = 'url(#riskGradientMedium)';
    else gradientId = 'url(#riskGradientHigh)';

    progress.style.stroke = gradientId;

    // Set color based on level
    let color;
    if (level === 'low') color = '#10b981';
    else if (level === 'medium') color = '#f59e0b';
    else color = '#ef4444';

    document.getElementById('risk-score').style.color = color;

    // Update risk indicator bar
    const indicatorMarker = document.querySelector('.indicator-marker');
    if (indicatorMarker) {
        indicatorMarker.style.left = score + '%';
    }

    // Update emoji and badge
    const emojis = { low: '😊', medium: '😐', high: '😰' };
    const labels = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' };
    const summaries = {
        low: 'Great balance! You\'re managing your workload well.',
        medium: 'Watch out! Your workload is getting heavy.',
        high: 'Take action! You\'re at risk of burnout.'
    };

    document.getElementById('risk-emoji').textContent = emojis[level];

    const badge = document.getElementById('risk-badge');
    badge.textContent = labels[level];
    badge.className = 'risk-badge ' + level;

    document.getElementById('risk-label').textContent = labels[level];
    document.getElementById('risk-summary').textContent = summaries[level];

    // AI recommendation
    document.getElementById('ai-message').textContent = result.ai_recommendation || 'Keep up the good work!';

    // Breakdown chart
    const breakdown = result.breakdown || {};
    const chart = document.getElementById('breakdown-chart');
    chart.innerHTML = '';

    const breakdownItems = [
        { key: 'sleep', label: 'Sleep Score', color: 'linear-gradient(90deg, #6366f1, #8b5cf6)' },
        { key: 'study', label: 'Study Load', color: 'linear-gradient(90deg, #f59e0b, #f97316)' },
        { key: 'exams', label: 'Exam Stress', color: 'linear-gradient(90deg, #ef4444, #f97316)' },
        { key: 'projects', label: 'Project Load', color: 'linear-gradient(90deg, #10b981, #14b8a6)' }
    ];

    breakdownItems.forEach((item, index) => {
        const value = Math.min(breakdown[item.key] || 0, 100);
        const div = document.createElement('div');
        div.className = 'breakdown-item';
        div.innerHTML = `
            <span class="breakdown-label">${item.label}</span>
            <div class="breakdown-bar">
                <div class="breakdown-fill" style="width: 0%; background: ${item.color}; transition: none;"></div>
            </div>
            <span class="breakdown-value">${value}%</span>
        `;
        chart.appendChild(div);

        // Force layout reflow before enabling transition & animating
        requestAnimationFrame(() => {
            const fill = div.querySelector('.breakdown-fill');
            fill.offsetWidth; // force reflow
            fill.style.transition = 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
            fill.style.width = value + '%';
        });
    });

    // Causes
    const causesList = document.getElementById('causes-list');
    causesList.innerHTML = '';
    (result.causes || []).forEach((cause, index) => {
        const li = document.createElement('li');
        li.textContent = cause;
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        causesList.appendChild(li);

        setTimeout(() => {
            li.style.transition = 'all 0.4s ease';
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
        }, 300 + index * 100);
    });

    // Recommendations
    const recList = document.getElementById('recommendations-list');
    recList.innerHTML = '';
    (result.recommendations || []).forEach((rec, index) => {
        const li = document.createElement('li');
        li.textContent = rec;
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        recList.appendChild(li);

        setTimeout(() => {
            li.style.transition = 'all 0.4s ease';
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
        }, 300 + index * 100);
    });
}

// Animate loading steps
function animateLoadingSteps() {
    const steps = document.querySelectorAll('.loading-step');
    steps.forEach((step) => {
        step.classList.remove('active');
        step.querySelector('i').className = 'fas fa-circle';
    });

    steps.forEach((step, index) => {
        setTimeout(() => {
            // Mark previous steps as completed (keep them checked)
            for (let i = 0; i < index; i++) {
                steps[i].classList.add('active');
                steps[i].querySelector('i').className = 'fas fa-check-circle';
            }
            // Current step is active
            step.classList.add('active');
            step.querySelector('i').className = 'fas fa-spinner fa-spin';
        }, index * 1400);
    });

    // Final step: mark all as completed
    setTimeout(() => {
        steps.forEach(s => {
            s.classList.add('active');
            s.querySelector('i').className = 'fas fa-check-circle';
        });
    }, steps.length * 1400);
}

// Reset form
function resetForm() {
    document.getElementById('sleep-range').value = 7;
    document.getElementById('sleep-display').textContent = '7';

    // Reset sleep quality badge
    const qualityBadge = document.querySelector('.sleep-quality-badge');
    if (qualityBadge) {
        const emoji = qualityBadge.querySelector('.quality-emoji');
        const text = qualityBadge.querySelector('.quality-text');
        if (emoji) emoji.textContent = '🙂';
        if (text) {
            text.textContent = 'Good';
            text.style.color = '#10b981';
        }
        qualityBadge.style.background = 'rgba(16, 185, 129, 0.15)';
        qualityBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    }

    ['subjects', 'exams', 'projects'].forEach(type => {
        const container = document.getElementById(`${type}-container`);
        const icons = {
            subjects: 'fa-book-open',
            exams: 'fa-file-alt',
            projects: 'fa-project-diagram'
        };
        const hints = {
            subjects: 'Click "Add Subject" to get started',
            exams: 'Click "Add Exam" to track deadlines',
            projects: 'Click "Add Project" to track assignments'
        };
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas ${icons[type]}"></i>
                </div>
                <p>No ${type} added yet</p>
                <span class="empty-hint">${hints[type]}</span>
            </div>
        `;
    });

    showInput();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
