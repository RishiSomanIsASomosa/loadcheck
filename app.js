// LoadCheck - Premium Animated JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // Initialize cursor glow
    initCursorGlow();
    
    // Initialize particles
    initParticles();
    
    // Animate counters on landing page
    animateCounters();
    
    // Initialize sleep slider
    initSleepSlider();
    
    // Handle form submission
    const form = document.getElementById('loadcheck-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            analyzeWorkload();
        });
    }
});

// Cursor glow effect
function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;
    
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
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
    if (!slider || !display) return;
    
    slider.addEventListener('input', () => {
        display.textContent = slider.value;
    });
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
    if (item) item.remove();
    
    const container = document.getElementById(`${type}-container`);
    if (container && container.children.length === 0) {
        const icons = {
            subjects: 'fa-book-open',
            exams: 'fa-file-alt',
            projects: 'fa-project-diagram'
        };
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas ${icons[type]}"></i>
                <p>No ${type} added yet</p>
            </div>
        `;
    }
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
    
    // Set color based on level
    let color;
    if (level === 'low') color = '#10b981';
    else if (level === 'medium') color = '#f59e0b';
    else color = '#ef4444';
    
    progress.style.stroke = color;
    document.getElementById('risk-score').style.color = color;
    
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
        { key: 'sleep', label: 'Sleep Score', color: '#6366f1' },
        { key: 'study', label: 'Study Load', color: '#f59e0b' },
        { key: 'exams', label: 'Exam Stress', color: '#ef4444' },
        { key: 'projects', label: 'Project Load', color: '#10b981' }
    ];
    
    breakdownItems.forEach(item => {
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
        
        // Animate the bar
        setTimeout(() => {
            div.querySelector('.breakdown-fill').style.width = value + '%';
        }, 100);
    });
    
    // Causes
    const causesList = document.getElementById('causes-list');
    causesList.innerHTML = '';
    (result.causes || []).forEach(cause => {
        const li = document.createElement('li');
        li.textContent = cause;
        causesList.appendChild(li);
    });
    
    // Recommendations
    const recList = document.getElementById('recommendations-list');
    recList.innerHTML = '';
    (result.recommendations || []).forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recList.appendChild(li);
    });
}

// Reset form
function resetForm() {
    document.getElementById('sleep-range').value = 7;
    document.getElementById('sleep-display').textContent = '7';
    
    ['subjects', 'exams', 'projects'].forEach(type => {
        const container = document.getElementById(`${type}-container`);
        const icons = {
            subjects: 'fa-book-open',
            exams: 'fa-file-alt',
            projects: 'fa-project-diagram'
        };
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas ${icons[type]}"></i>
                <p>No ${type} added yet</p>
            </div>
        `;
    });
    
    showInput();
}
