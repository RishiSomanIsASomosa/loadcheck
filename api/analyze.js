const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Risk calculation weights
const weights = {
  homework: 1.5,
  exams: 3.0,
  projects: 2.0,
  sleep_deficit: 2.5,
  deadline_clustering: 2.0,
};

function analyzeWorkload(data) {
  const scores = {
    homework: 0,
    exams: 0,
    projects: 0,
    sleep_deficit: 0,
    deadline_clustering: 0,
  };

  const today = new Date();

  // Calculate homework load
  const subjects = data.subjects || [];
  const totalHomeworkHours = subjects.reduce(
    (sum, s) => sum + (s.hours_per_week || 0),
    0
  );
  scores.homework = Math.min(totalHomeworkHours * weights.homework, 30);

  // Calculate exam stress
  const exams = data.exams || [];
  for (const exam of exams) {
    try {
      const examDate = new Date(exam.date);
      const daysUntil = Math.floor(
        (examDate - today) / (1000 * 60 * 60 * 24)
      );
      if (daysUntil >= 0 && daysUntil <= 14) {
        const diffMultiplier =
          { easy: 0.5, medium: 1.0, hard: 1.5 }[exam.difficulty] || 1.0;
        const urgency = Math.max(0, (14 - daysUntil) / 14);
        scores.exams += urgency * weights.exams * diffMultiplier * 5;
      }
    } catch (e) {
      continue;
    }
  }
  scores.exams = Math.min(scores.exams, 30);

  // Calculate project load
  const projects = data.projects || [];
  for (const project of projects) {
    try {
      const deadline = new Date(project.deadline);
      const daysUntil = Math.floor(
        (deadline - today) / (1000 * 60 * 60 * 24)
      );
      if (daysUntil >= 0 && daysUntil <= 21) {
        const compMultiplier =
          { low: 0.5, medium: 1.0, high: 1.5 }[project.complexity] || 1.0;
        const urgency = Math.max(0, (21 - daysUntil) / 21);
        scores.projects += urgency * weights.projects * compMultiplier * 5;
      }
    } catch (e) {
      continue;
    }
  }
  scores.projects = Math.min(scores.projects, 25);

  // Calculate sleep deficit
  const sleepHours = data.sleep_hours || 8;
  if (sleepHours < 7) {
    const deficit = 7 - sleepHours;
    scores.sleep_deficit = deficit * weights.sleep_deficit * 3;
  }
  scores.sleep_deficit = Math.min(scores.sleep_deficit, 20);

  // Calculate deadline clustering
  const allDeadlines = [];
  for (const exam of exams) {
    try {
      allDeadlines.push(new Date(exam.date));
    } catch (e) {}
  }
  for (const project of projects) {
    try {
      allDeadlines.push(new Date(project.deadline));
    } catch (e) {}
  }
  allDeadlines.sort((a, b) => a - b);

  let clusterPenalty = 0;
  for (let i = 0; i < allDeadlines.length - 1; i++) {
    const daysApart = Math.floor(
      (allDeadlines[i + 1] - allDeadlines[i]) / (1000 * 60 * 60 * 24)
    );
    if (daysApart <= 3) {
      clusterPenalty += (4 - daysApart) * weights.deadline_clustering;
    }
  }
  scores.deadline_clustering = Math.min(clusterPenalty, 15);

  // Calculate total score
  let totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  totalScore = Math.min(Math.max(totalScore, 0), 100);

  // Determine risk level
  let riskLevel;
  if (totalScore <= 30) riskLevel = "low";
  else if (totalScore <= 60) riskLevel = "medium";
  else riskLevel = "high";

  // Generate causes and recommendations
  const causes = [];
  const recommendations = [];

  if (scores.homework > 15) {
    causes.push("Heavy homework load across subjects");
    recommendations.push(
      "Consider prioritizing assignments by due date and importance"
    );
  }
  if (scores.exams > 15) {
    causes.push("Multiple upcoming exams creating pressure");
    recommendations.push(
      "Create a study schedule and use active recall techniques"
    );
  }
  if (scores.projects > 12) {
    causes.push("Project deadlines approaching");
    recommendations.push("Break projects into smaller milestones");
  }
  if (scores.sleep_deficit > 8) {
    causes.push("Insufficient sleep affecting your performance");
    recommendations.push(
      "Aim for 7-8 hours of sleep; it improves memory and focus"
    );
  }
  if (scores.deadline_clustering > 8) {
    causes.push("Multiple deadlines clustered together");
    recommendations.push("Talk to professors about deadline flexibility");
  }
  if (causes.length === 0) {
    causes.push("Workload is manageable");
    recommendations.push(
      "Keep up the good work and maintain your current balance!"
    );
  }

  return {
    score: Math.round(totalScore * 10) / 10,
    risk_level: riskLevel,
    breakdown: Object.fromEntries(
      Object.entries(scores).map(([k, v]) => [k, Math.round(v * 10) / 10])
    ),
    causes,
    recommendations,
  };
}

async function getAIRecommendation(analysis, userData) {
  if (!process.env.GROQ_API_KEY) {
    return "AI recommendations require a valid API key. Please check your configuration.";
  }

  try {
    const prompt = `You are a supportive academic wellness advisor. A student has the following situation:

Risk Level: ${analysis.risk_level.toUpperCase()}
Burnout Score: ${analysis.score}/100
Sleep: ${userData.sleep_hours || "unknown"} hours/night
Number of subjects: ${(userData.subjects || []).length}
Upcoming exams: ${(userData.exams || []).length}
Active projects: ${(userData.projects || []).length}

Main stress factors: ${analysis.causes.slice(0, 3).join(", ")}

Give ONE specific, actionable tip (2-3 sentences max) that addresses their biggest challenge. Be warm and encouraging. Include one relevant emoji.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 150,
    });

    return chatCompletion.choices[0].message.content.trim();
  } catch (e) {
    console.error("Groq API error:", e);
    return "Focus on one task at a time and remember to take short breaks. You've got this! 💪";
  }
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "No data provided" });
    }

    // Run analysis
    const analysis = analyzeWorkload(data);

    // Get AI recommendation
    const aiMessage = await getAIRecommendation(analysis, data);

    return res.status(200).json({
      success: true,
      analysis: {
        score: analysis.score,
        risk_level: analysis.risk_level,
        breakdown: analysis.breakdown,
        causes: analysis.causes,
        recommendations: analysis.recommendations,
        ai_message: aiMessage,
      },
    });
  } catch (e) {
    console.error("Analysis error:", e);
    return res.status(500).json({ error: e.message });
  }
};
