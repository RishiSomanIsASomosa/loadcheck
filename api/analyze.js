const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const weights = {
    homework: 1.5,
    exams: 3.0,
    projects: 2.0,
    sleep_deficit: 2.5,
    deadline_clustering: 2.0,
};

function analyzeWorkload(data) {
    const scores = { homework: 0, exams: 0, projects: 0, sleep_deficit: 0, deadline_clustering: 0 };
    const today = new Date();

    // Homework load
    const subjects = data.subjects || [];
    const totalHours = subjects.reduce((sum, s) => sum + (s.hours_per_week || 0), 0);
    scores.homework = Math.min(totalHours * weights.homework, 30);

    // Exam stress - support both 'exams' and 'upcoming_exams' field names
    const exams = data.upcoming_exams || data.exams || [];
    for (const exam of exams) {
        try {
            const examDate = new Date(exam.date);
            const daysUntil = Math.floor((examDate - today) / (1000 * 60 * 60 * 24));
            if (daysUntil >= 0 && daysUntil <= 14) {
                // Support both 'difficulty' and 'type' fields
                const diffValue = exam.difficulty || exam.type || 'medium';
                const diff = { easy: 0.5, quiz: 0.5, medium: 1.0, midterm: 1.0, hard: 1.5, final: 1.5 }[diffValue] || 1.0;
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
                const comp = { low: 0.5, medium: 1.0, high: 1.5 }[project.complexity] || 1.0;
                const urgency = Math.max(0, (21 - daysUntil) / 21);
                scores.projects += urgency * weights.projects * comp * 5;
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
    const examsForDeadlines = data.upcoming_exams || data.exams || [];
    examsForDeadlines.forEach(e => { try { allDeadlines.push(new Date(e.date)); } catch (err) { } });
    projects.forEach(p => { try { allDeadlines.push(new Date(p.deadline)); } catch (err) { } });
    allDeadlines.sort((a, b) => a - b);

    let clusterPenalty = 0;
    for (let i = 0; i < allDeadlines.length - 1; i++) {
        const daysApart = Math.floor((allDeadlines[i + 1] - allDeadlines[i]) / (1000 * 60 * 60 * 24));
        if (daysApart <= 3) clusterPenalty += (4 - daysApart) * weights.deadline_clustering;
    }
    scores.deadline_clustering = Math.min(clusterPenalty, 15);

    // Total score
    let totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    totalScore = Math.min(Math.max(totalScore, 0), 100);

    // Risk level
    let riskLevel = totalScore <= 30 ? "low" : totalScore <= 60 ? "medium" : "high";

    // Causes & recommendations
    const causes = [];
    const recommendations = [];

    if (scores.homework > 15) {
        causes.push("Heavy homework load across subjects");
        recommendations.push("Prioritize assignments by due date and importance");
    }
    if (scores.exams > 15) {
        causes.push("Multiple upcoming exams creating pressure");
        recommendations.push("Create a study schedule with active recall techniques");
    }
    if (scores.projects > 12) {
        causes.push("Project deadlines approaching");
        recommendations.push("Break projects into smaller milestones");
    }
    if (scores.sleep_deficit > 8) {
        causes.push("Insufficient sleep affecting performance");
        recommendations.push("Aim for 7-8 hours of sleep for better focus");
    }
    if (scores.deadline_clustering > 8) {
        causes.push("Multiple deadlines clustered together");
        recommendations.push("Talk to professors about deadline flexibility");
    }
    if (causes.length === 0) {
        causes.push("Workload is manageable");
        recommendations.push("Keep up the good work!");
    }

    return {
        score: Math.round(totalScore * 10) / 10,
        risk_level: riskLevel,
        breakdown: Object.fromEntries(Object.entries(scores).map(([k, v]) => [k, Math.round(v * 10) / 10])),
        causes,
        recommendations,
    };
}

async function getAIRecommendation(analysis, userData) {
    if (!process.env.GROQ_API_KEY) return "Configure GROQ_API_KEY for AI recommendations.";

    try {
        const examsCount = (userData.upcoming_exams || userData.exams || []).length;
        const prompt = `You are a supportive academic wellness advisor. Student situation:
Risk: ${analysis.risk_level.toUpperCase()} (${analysis.score}/100)
Sleep: ${userData.sleep_hours || "?"}h, Subjects: ${(userData.subjects || []).length}, Exams: ${examsCount}, Projects: ${(userData.projects || []).length}
Stress factors: ${analysis.causes.slice(0, 3).join(", ")}

Give ONE specific tip (2-3 sentences). Be warm. Include one emoji.`;

        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 150,
        });
        return completion.choices[0].message.content.trim();
    } catch (e) {
        return "Focus on one task at a time. You've got this! 💪";
    }
}

module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    try {
        const data = req.body;
        if (!data) return res.status(400).json({ error: "No data provided" });

        const analysis = analyzeWorkload(data);
        const aiMessage = await getAIRecommendation(analysis, data);

        // Return in format frontend expects
        return res.status(200).json({
            success: true,
            risk_score: analysis.score,
            risk_level: analysis.risk_level,
            breakdown: {
                sleep: Math.round(analysis.breakdown.sleep_deficit * 5),
                study: Math.round(analysis.breakdown.homework * 3.3),
                exams: Math.round(analysis.breakdown.exams * 3.3),
                projects: Math.round(analysis.breakdown.projects * 4)
            },
            causes: analysis.causes,
            recommendations: analysis.recommendations,
            ai_recommendation: aiMessage
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};
