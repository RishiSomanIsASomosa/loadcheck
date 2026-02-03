// LoadCheck - Premium Animated JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
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

    // Initialize timeline animation
    initTimelineAnimation();

    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize magnetic buttons
    initMagneticButtons();

    // Handle form submission
    const form = document.getElementById('loadcheck-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            analyzeWorkload();
        });
    }
});

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

// Animate stat counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        if (target === 0) return;

        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
}

// Sleep slider
function initSleepSlider() {
    const slider = document.getElementById('sleep-range');
    const display = document.getElementById('sleep-display');
    const qualityBadge = document.querySelector('.sleep-quality-badge');
    if (!slider || !display) return;

    const updateSleepQuality = (value) => {
        display.textContent = value;

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
        updateSleepQuality(parseInt(slider.value));
    });

    // Initialize
    updateSleepQuality(parseInt(slider.value));
}

// Navigation functions
function showLanding() {
    document.getElementById('landing-page').classList.remove('hidden');
    document.getElementById('app-page').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showApp() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('app-page').classList.remove('hidden');
    showInput();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showInput() {
    document.getElementById('input-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
}

function showResults() {
    document.getElementById('input-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
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
    }, 300);
}

// Collect form data
function collectFormData() {
    const sleepHours = parseInt(document.getElementById('sleep-range').value) || 7;

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

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error);
        }

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
        const value = breakdown[item.key] || 0;
        const div = document.createElement('div');
        div.className = 'breakdown-item';
        div.innerHTML = `
            <span class="breakdown-label">${item.label}</span>
            <div class="breakdown-bar">
                <div class="breakdown-fill" style="width: 0; background: ${item.color};"></div>
            </div>
            <span class="breakdown-value">${value}%</span>
        `;
        chart.appendChild(div);

        // Animate the bar with stagger
        setTimeout(() => {
            div.querySelector('.breakdown-fill').style.width = value + '%';
        }, 200 + index * 150);
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
    steps.forEach((step, index) => {
        step.classList.remove('active');
        step.querySelector('i').className = 'fas fa-circle';
    });

    steps.forEach((step, index) => {
        setTimeout(() => {
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            step.querySelector('i').className = 'fas fa-check-circle';
        }, index * 1000);
    });
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
