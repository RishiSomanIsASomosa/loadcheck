// LoadCheck - Frontend JavaScript

// Navigation
function showLanding() {
    document.getElementById('landing-page').classList.remove('hidden');
    document.getElementById('app-page').classList.add('hidden');
}

function showApp() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('app-page').classList.remove('hidden');
    document.getElementById('input-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
}

function showInput() {
    document.getElementById('input-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
}

function showResults() {
    document.getElementById('input-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
}

// Sleep slider
const sleepRange = document.getElementById('sleep-range');
const sleepDisplay = document.getElementById('sleep-display');

if (sleepRange && sleepDisplay) {
    sleepRange.addEventListener('input', () => {
        sleepDisplay.textContent = sleepRange.value;
    });
}

// Add Subject
function addSubject() {
    const container = document.getElementById('subjects-container');
    const empty = container.querySelector('.empty-state');
    if (empty) empty.remove();

    const div = document.createElement('div');
    div.className = 'form-item';
    div.innerHTML = `
        <input type="text" placeholder="Subject name" class="subject-name" required>
        <input type="number" placeholder="Hours/week" class="subject-hours" min="0" max="40" required>
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

// Add Exam
function addExam() {
    const container = document.getElementById('exams-container');
    const empty = container.querySelector('.empty-state');
    if (empty) empty.remove();

    const div = document.createElement('div');
    div.className = 'form-item';
    div.innerHTML = `
        <input type="text" placeholder="Exam name" class="exam-name" required>
        <input type="date" class="exam-date" required>
        <select class="exam-difficulty">
            <option value="easy">Easy</option>
            <option value="medium" selected>Medium</option>
            <option value="hard">Hard</option>
        </select>
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

// Add Project
function addProject() {
    const container = document.getElementById('projects-container');
    const empty = container.querySelector('.empty-state');
    if (empty) empty.remove();

    const div = document.createElement('div');
    div.className = 'form-item';
    div.innerHTML = `
        <input type="text" placeholder="Project name" class="project-name" required>
        <input type="date" class="project-deadline" required>
        <select class="project-complexity">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
        </select>
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

// Collect form data
function collectFormData() {
    const sleepHours = parseFloat(document.getElementById('sleep-range').value);

    const subjects = [];
    document.querySelectorAll('#subjects-container .form-item').forEach(item => {
        const name = item.querySelector('.subject-name').value;
        const hours = parseFloat(item.querySelector('.subject-hours').value) || 0;
        if (name) subjects.push({ name, hours_per_week: hours });
    });

    const exams = [];
    document.querySelectorAll('#exams-container .form-item').forEach(item => {
        const name = item.querySelector('.exam-name').value;
        const date = item.querySelector('.exam-date').value;
        const difficulty = item.querySelector('.exam-difficulty').value;
        if (name && date) exams.push({ name, date, difficulty });
    });

    const projects = [];
    document.querySelectorAll('#projects-container .form-item').forEach(item => {
        const name = item.querySelector('.project-name').value;
        const deadline = item.querySelector('.project-deadline').value;
        const complexity = item.querySelector('.project-complexity').value;
        if (name && deadline) projects.push({ name, deadline, complexity });
    });

    return { sleep_hours: sleepHours, subjects, exams, projects };
}

// Display results
function displayResults(data) {
    const analysis = data.analysis;
    
    // Score
    const scoreEl = document.getElementById('risk-score');
    const progressEl = document.getElementById('risk-progress');
    const labelEl = document.getElementById('risk-label');
    const badgeEl = document.getElementById('risk-badge');
    const summaryEl = document.getElementById('risk-summary');

    scoreEl.textContent = Math.round(analysis.score);
    
    // Animate progress ring
    const circumference = 283;
    const offset = circumference - (analysis.score / 100) * circumference;
    progressEl.style.strokeDashoffset = offset;

    // Set colors based on risk
    const colors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
    const color = colors[analysis.risk_level];
    progressEl.style.stroke = color;
    scoreEl.style.color = color;

    // Badge
    badgeEl.textContent = analysis.risk_level.toUpperCase() + ' RISK';
    badgeEl.className = 'risk-badge ' + analysis.risk_level;

    // Label
    const labels = {
        low: 'Looking Good!',
        medium: 'Moderate Stress',
        high: 'High Burnout Risk'
    };
    labelEl.textContent = labels[analysis.risk_level];

    // Summary
    const summaries = {
        low: "Your workload is manageable. Keep maintaining this balance!",
        medium: "Some stress detected. Consider adjusting your schedule.",
        high: "High burnout risk! Take steps to reduce your workload."
    };
    summaryEl.textContent = summaries[analysis.risk_level];

    // AI Message
    document.getElementById('ai-message').textContent = analysis.ai_message;

    // Breakdown
    const breakdownEl = document.getElementById('breakdown-chart');
    breakdownEl.innerHTML = '';
    
    const breakdownLabels = {
        homework: 'Homework Load',
        exams: 'Exam Stress',
        projects: 'Project Load',
        sleep_deficit: 'Sleep Deficit',
        deadline_clustering: 'Deadline Clustering'
    };

    const maxScores = { homework: 30, exams: 30, projects: 25, sleep_deficit: 20, deadline_clustering: 15 };

    Object.entries(analysis.breakdown).forEach(([key, value]) => {
        const max = maxScores[key];
        const percent = (value / max) * 100;
        let barColor = '#6366f1';
        if (percent > 70) barColor = '#ef4444';
        else if (percent > 40) barColor = '#f59e0b';

        breakdownEl.innerHTML += `
            <div class="breakdown-item">
                <span class="breakdown-label">${breakdownLabels[key]}</span>
                <div class="breakdown-bar">
                    <div class="breakdown-fill" style="width:${percent}%; background:${barColor}"></div>
                </div>
                <span class="breakdown-value">${value}</span>
            </div>
        `;
    });

    // Causes
    const causesEl = document.getElementById('causes-list');
    causesEl.innerHTML = analysis.causes.map(c => `<li>${c}</li>`).join('');

    // Recommendations
    const recsEl = document.getElementById('recommendations-list');
    recsEl.innerHTML = analysis.recommendations.map(r => `<li>${r}</li>`).join('');

    showResults();
}

// Form submit
const form = document.getElementById('loadcheck-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = collectFormData();
        const loading = document.getElementById('loading');
        
        loading.classList.remove('hidden');
        
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                displayResults(data);
            } else {
                alert(data.error || 'Analysis failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please try again.');
        } finally {
            loading.classList.add('hidden');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
