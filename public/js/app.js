/**
 * LoadCheck - AI-Powered Burnout Risk Analyzer
 * Premium Animated UI JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initCursorGlow();
    initParticles();
    initNavbar();
    initAOS();
    initCounters();
    initRippleButtons();
    initSleepSlider();
    initFormEntries();
    initFormSubmission();
    initPageNavigation();
    initTimelineAnimation();
});

// ==================== Global Navigation Functions ====================
function showApp() {
    document.getElementById('landing-page')?.classList.add('hidden');
    document.getElementById('app-page')?.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showLanding() {
    document.getElementById('app-page')?.classList.add('hidden');
    document.getElementById('landing-page')?.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('mobile-open');
    }
}

// ==================== Cursor Glow Effect ====================
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow effect
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// ==================== Particle Background ====================
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';

    // Random delay
    particle.style.animationDelay = (Math.random() * 20) + 's';

    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;

    // Random color variation
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
}

// ==================== Navbar Scroll Effect ====================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ==================== AOS (Animate On Scroll) ====================
function initAOS() {
    // Simple AOS implementation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                // Apply animation based on data attribute
                const animation = entry.target.dataset.aos;
                const delay = entry.target.dataset.aosDelay || 0;

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(el);
    });
}

// ==================== Counter Animation ====================
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    // Use data-target attribute if available, otherwise parse text content
    const target = parseInt(element.dataset.target) || parseInt(element.textContent.replace(/[^\d.]/g, '')) || 0;

    if (target === 0) return; // Skip if no target

    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k';
    }
    return num.toString();
}

// ==================== Ripple Effect for Buttons ====================
function initRippleButtons() {
    document.querySelectorAll('.ripple-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ==================== Sleep Slider ====================
function initSleepSlider() {
    const slider = document.getElementById('sleep-range');
    const hiddenInput = document.getElementById('sleep-hours');
    const valueDisplay = document.getElementById('sleep-display');
    const sliderFill = document.getElementById('slider-fill');
    const statusDisplay = document.getElementById('sleep-status');

    if (!slider) return;

    slider.addEventListener('input', function () {
        const value = parseFloat(this.value);
        if (hiddenInput) hiddenInput.value = value;
        updateSleepDisplay(value, valueDisplay, sliderFill, statusDisplay);
    });

    // Initial update
    updateSleepDisplay(parseFloat(slider.value), valueDisplay, sliderFill, statusDisplay);
}

function updateSleepDisplay(value, valueDisplay, sliderFill, statusDisplay) {
    // Update value display
    if (valueDisplay) {
        valueDisplay.textContent = value.toFixed(1);
    }

    // Update slider fill
    if (sliderFill) {
        const percentage = ((value - 3) / (10 - 3)) * 100;
        sliderFill.style.width = percentage + '%';
    }

    // Update status
    if (statusDisplay) {
        let statusClass, statusIcon, statusText;

        if (value >= 7) {
            statusClass = 'good';
            statusIcon = 'fa-check-circle';
            statusText = 'Healthy Sleep';
        } else if (value >= 5) {
            statusClass = 'warning';
            statusIcon = 'fa-exclamation-circle';
            statusText = 'Slightly Deprived';
        } else {
            statusClass = 'danger';
            statusIcon = 'fa-times-circle';
            statusText = 'Sleep Deprived';
        }

        statusDisplay.className = 'sleep-status ' + statusClass;
        statusDisplay.innerHTML = `<i class="fas ${statusIcon}"></i>${statusText}`;
    }
}

// ==================== Form Entry Management ====================
function initFormEntries() {
    // Add subject button
    document.getElementById('add-subject')?.addEventListener('click', () => {
        addEntry('subjects-container', 'subject');
    });

    // Add exam button
    document.getElementById('add-exam')?.addEventListener('click', () => {
        addEntry('exams-container', 'exam');
    });

    // Add project button
    document.getElementById('add-project')?.addEventListener('click', () => {
        addEntry('projects-container', 'project');
    });
}

function addEntry(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry-row';

    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (type === 'subject') {
        entryDiv.innerHTML = `
            <input type="text" class="subject-name" placeholder="Subject name (e.g., Mathematics)">
            <input type="number" class="homework-hours" placeholder="Weekly hours" min="0" max="40">
            <select class="difficulty">
                <option value="easy">Easy</option>
                <option value="medium" selected>Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button type="button" class="btn btn-remove" onclick="removeEntry(this)">
                <i class="fas fa-trash"></i>
            </button>
        `;
    } else if (type === 'exam') {
        entryDiv.innerHTML = `
            <input type="text" class="exam-name" placeholder="Exam name (e.g., Final Calculus)">
            <input type="date" class="exam-date" value="${nextWeek}" min="${today}">
            <select class="exam-weight">
                <option value="quiz">Quiz (10%)</option>
                <option value="midterm" selected>Midterm (30%)</option>
                <option value="final">Final (50%)</option>
            </select>
            <button type="button" class="btn btn-remove" onclick="removeEntry(this)">
                <i class="fas fa-trash"></i>
            </button>
        `;
    } else if (type === 'project') {
        entryDiv.innerHTML = `
            <input type="text" class="project-name" placeholder="Project name">
            <input type="date" class="project-deadline" value="${nextWeek}" min="${today}">
            <input type="number" class="project-hours" placeholder="Est. hours" min="1" max="100">
            <button type="button" class="btn btn-remove" onclick="removeEntry(this)">
                <i class="fas fa-trash"></i>
            </button>
        `;
    }

    container.appendChild(entryDiv);

    // Focus the first input
    entryDiv.querySelector('input')?.focus();
}

function removeEntry(button) {
    const entry = button.closest('.entry-row');
    entry.style.animation = 'entry-slide-out 0.3s ease forwards';

    setTimeout(() => entry.remove(), 300);
}

// Make removeEntry globally available
window.removeEntry = removeEntry;

// ==================== Form Submission ====================
function initFormSubmission() {
    const form = document.getElementById('loadcheck-form');
    const loadingOverlay = document.querySelector('.loading-overlay');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = collectFormData();

        // Validate form
        if (!validateForm(formData)) {
            showNotification('Please add at least one subject, exam, or project', 'error');
            return;
        }

        // Show loading
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                displayResults(data);
            } else {
                showNotification(data.error || 'Analysis failed', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Network error. Please try again.', 'error');
        } finally {
            // Hide loading
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
            }
        }
    });
}

function collectFormData() {
    const sleepHours = parseFloat(document.getElementById('sleep-hours')?.value || 7);

    // Collect subjects
    const subjects = [];
    document.querySelectorAll('#subjects-container .entry-row').forEach(row => {
        const name = row.querySelector('.subject-name')?.value;
        const hours = parseFloat(row.querySelector('.homework-hours')?.value || 0);
        const difficulty = row.querySelector('.difficulty')?.value || 'medium';

        if (name && hours > 0) {
            subjects.push({ name, hours_per_week: hours, difficulty });
        }
    });

    // Collect exams
    const exams = [];
    document.querySelectorAll('#exams-container .entry-row').forEach(row => {
        const name = row.querySelector('.exam-name')?.value;
        const date = row.querySelector('.exam-date')?.value;
        const weight = row.querySelector('.exam-weight')?.value || 'midterm';

        if (name && date) {
            exams.push({ name, date, weight });
        }
    });

    // Collect projects
    const projects = [];
    document.querySelectorAll('#projects-container .entry-row').forEach(row => {
        const name = row.querySelector('.project-name')?.value;
        const deadline = row.querySelector('.project-deadline')?.value;
        const hours = parseFloat(row.querySelector('.project-hours')?.value || 0);

        if (name && deadline && hours > 0) {
            projects.push({ name, deadline, estimated_hours: hours });
        }
    });

    return { sleep_hours: sleepHours, subjects, exams, projects };
}

function validateForm(data) {
    return data.subjects.length > 0 || data.exams.length > 0 || data.projects.length > 0;
}

// ==================== Display Results ====================
function displayResults(data) {
    const resultsSection = document.getElementById('results-section');
    const inputSection = document.getElementById('input-section');

    if (!resultsSection || !data.analysis) return;

    // Hide input section, show results
    if (inputSection) inputSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    const analysis = data.analysis;

    // Update Risk Overview
    updateRiskOverview(analysis);

    // Update Breakdown
    updateBreakdown(analysis.score_breakdown || {});

    // Update Causes
    updateCauses(analysis.causes || []);

    // Update Recommendations
    updateRecommendations(analysis.recommendations || []);

    // Update AI Insight
    updateAIInsight(analysis.ai_recommendation || '');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function updateRiskOverview(analysis) {
    const scoreValue = document.getElementById('risk-score');
    const riskProgress = document.getElementById('risk-progress');
    const riskEmoji = document.getElementById('risk-emoji');
    const riskBadge = document.getElementById('risk-badge');
    const riskLabel = document.getElementById('risk-label');
    const riskSummary = document.getElementById('risk-summary');

    const score = analysis.total_score || 0;
    const level = analysis.risk_level || 'Low';

    // Animate score
    if (scoreValue) {
        animateNumber(scoreValue, 0, Math.round(score), 1500);
    }

    // Update circular progress
    if (riskProgress) {
        // circumference = 2 * π * 42 ≈ 264
        const circumference = 264;
        const offset = circumference - (score / 100 * circumference);

        setTimeout(() => {
            riskProgress.style.strokeDashoffset = offset;

            // Update color based on risk level
            if (score >= 70) {
                riskProgress.style.stroke = '#ef4444';
            } else if (score >= 40) {
                riskProgress.style.stroke = '#f59e0b';
            } else {
                riskProgress.style.stroke = '#10b981';
            }
        }, 300);
    }

    // Update emoji
    if (riskEmoji) {
        if (score >= 70) {
            riskEmoji.textContent = '😰';
        } else if (score >= 40) {
            riskEmoji.textContent = '😐';
        } else {
            riskEmoji.textContent = '😊';
        }
    }

    // Update badge
    if (riskBadge) {
        riskBadge.className = 'risk-level-badge ' + level.toLowerCase();
    }
    if (riskLabel) {
        riskLabel.textContent = level + ' Risk';
    }

    // Update summary
    if (riskSummary) {
        riskSummary.textContent = analysis.summary || '';
    }
}

function updateBreakdown(breakdown) {
    const breakdownChart = document.getElementById('breakdown-chart');
    if (!breakdownChart) return;

    const items = [
        { key: 'homework', label: 'Homework Load', icon: 'fa-book-open', color: '#6366f1' },
        { key: 'exams', label: 'Exam Stress', icon: 'fa-file-alt', color: '#ef4444' },
        { key: 'projects', label: 'Project Load', icon: 'fa-tasks', color: '#10b981' },
        { key: 'sleep_deficit', label: 'Sleep Deficit', icon: 'fa-moon', color: '#f59e0b' },
        { key: 'deadline_clustering', label: 'Deadline Crunch', icon: 'fa-calendar-times', color: '#ec4899' }
    ];

    breakdownChart.innerHTML = items.map(item => {
        const value = breakdown[item.key] || 0;
        return `
            <div class="breakdown-item">
                <span class="breakdown-label">
                    <i class="fas ${item.icon}"></i>
                    ${item.label}
                </span>
                <div class="breakdown-bar-container">
                    <div class="breakdown-bar" style="background: ${item.color}; --width: ${value}%"></div>
                </div>
                <span class="breakdown-value">${Math.round(value)}%</span>
            </div>
        `;
    }).join('');

    // Animate bars after a short delay
    setTimeout(() => {
        breakdownChart.querySelectorAll('.breakdown-bar').forEach(bar => {
            bar.style.width = bar.style.getPropertyValue('--width');
        });
    }, 100);
}

function updateCauses(causes) {
    const causesContainer = document.getElementById('causes-list');
    if (!causesContainer) return;

    if (causes.length === 0) {
        causesContainer.innerHTML = '<p class="text-muted">No major stress factors detected! Great job maintaining balance.</p>';
        return;
    }

    causesContainer.innerHTML = causes.map((cause, index) => `
        <span class="cause-tag" style="animation-delay: ${index * 0.1}s">
            <i class="fas fa-exclamation-triangle"></i>
            ${cause}
        </span>
    `).join('');
}

function updateRecommendations(recommendations) {
    const recsContainer = document.getElementById('recommendations-list');
    if (!recsContainer) return;

    if (recommendations.length === 0) {
        recsContainer.innerHTML = '<p class="text-muted">Keep up the good work! Your workload appears manageable.</p>';
        return;
    }

    const priorityIcons = {
        high: '🚨',
        medium: '⚠️',
        low: '💡'
    };

    recsContainer.innerHTML = recommendations.map((rec, index) => `
        <div class="recommendation-item ${rec.priority || 'medium'}" style="animation-delay: ${index * 0.15}s">
            <div class="recommendation-header">
                <span class="recommendation-icon">${priorityIcons[rec.priority] || '💡'}</span>
                <span class="recommendation-title">${rec.title || 'Recommendation'}</span>
            </div>
            <p class="recommendation-description">${rec.description || ''}</p>
            ${rec.action ? `
                <div class="recommendation-action">
                    <strong>Action:</strong> ${rec.action}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function updateAIInsight(aiRecommendation) {
    const aiMessage = document.getElementById('ai-message');
    if (!aiMessage) return;

    // Clear previous content and show typing indicator
    aiMessage.innerHTML = `<div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
    </div>`;

    // Simulate typing delay then show message
    setTimeout(() => {
        aiMessage.innerHTML = '';
    }, 1500);
}

function typeWriter(element, text, index, speed) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1, speed), speed);
    }
}

// ==================== Page Navigation ====================
function initPageNavigation() {
    // Back button (from results to input)
    document.getElementById('back-btn')?.addEventListener('click', () => {
        resetForm();
        document.getElementById('results-section')?.classList.add('hidden');
        document.getElementById('input-section')?.classList.remove('hidden');
        window.scrollTo(0, 0);
    });

    // Analyze Again button
    document.getElementById('analyze-again-btn')?.addEventListener('click', () => {
        resetForm();
        document.getElementById('results-section')?.classList.add('hidden');
        document.getElementById('input-section')?.classList.remove('hidden');
        window.scrollTo(0, 0);
    });
}

function resetForm() {
    // Reset sleep slider
    const sleepSlider = document.getElementById('sleep-range');
    const hiddenInput = document.getElementById('sleep-hours');
    if (sleepSlider) {
        sleepSlider.value = 7;
        if (hiddenInput) hiddenInput.value = 7;
        const valueDisplay = document.getElementById('sleep-display');
        const sliderFill = document.getElementById('slider-fill');
        const statusDisplay = document.getElementById('sleep-status');
        updateSleepDisplay(7, valueDisplay, sliderFill, statusDisplay);
    }

    // Clear entries
    ['subjects-container', 'exams-container', 'projects-container'].forEach(id => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = '';
    });

    // Reset AI message
    const aiMessage = document.getElementById('ai-message');
    if (aiMessage) {
        aiMessage.innerHTML = `<div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>`;
    }

    // Reset risk display
    const riskProgress = document.getElementById('risk-progress');
    if (riskProgress) riskProgress.style.strokeDashoffset = 264;
}


// ==================== Timeline Animation ====================
function initTimelineAnimation() {
    const timeline = document.querySelector('.timeline-progress');
    if (!timeline) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timeline.style.height = '100%';
            }
        });
    }, { threshold: 0.2 });

    const stepsSection = document.querySelector('.steps-timeline');
    if (stepsSection) {
        observer.observe(stepsSection);
    }
}

// ==================== Utility Functions ====================
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeProgress);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        padding: '16px 24px',
        background: type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(99, 102, 241, 0.9)',
        color: 'white',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: '500',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        animation: 'notification-slide 0.4s ease'
    });

    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes notification-slide {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'notification-slide 0.4s ease reverse';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== Add CSS for entry slide out ====================
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes entry-slide-out {
        from {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
        }
    }
    
    .text-muted {
        color: var(--text-muted);
        font-style: italic;
    }
`;
document.head.appendChild(slideOutStyle);
