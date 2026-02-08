const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY_CHAT || process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are LoadCheck AI Assistant - a helpful, friendly AI that helps students manage their academic workload and prevent burnout.

ABOUT LOADCHECK:
LoadCheck is an AI-powered student burnout prevention tool that analyzes:
- Sleep hours and quality
- Subject workload (hours per week per subject)
- Upcoming exams (dates and difficulty)
- Project deadlines and complexity

HOW TO USE LOADCHECK:
1. Click "Start Analysis" or navigate to the app section
2. Enter your sleep hours using the slider
3. Add your subjects with weekly study hours
4. Add upcoming exams with dates and difficulty levels
5. Add project deadlines with complexity ratings
6. Click "Analyze My Workload" to get your burnout risk score

FEATURES:
- Real-time AI analysis using Llama 3.3-70B
- Personalized burnout risk score (0-100)
- Breakdown of stress factors
- Custom recommendations

YOUR ROLE:
1. Answer questions about how to use LoadCheck
2. Provide study tips and stress management advice
3. Give personalized recommendations based on user's situation
4. Help students understand their burnout risk factors
5. Suggest time management and productivity strategies

TONE:
- Friendly and supportive
- Concise but helpful
- Use emojis occasionally for warmth
- Be encouraging and positive

Keep responses concise (2-4 sentences typically) unless asked for detailed advice.`;

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build context-aware prompt
        let contextMessage = "";
        if (context && context.analysisResult) {
            const result = context.analysisResult;
            contextMessage = `\n\nUSER'S CURRENT ANALYSIS RESULTS:
- Burnout Risk Score: ${result.risk_score}/100 (${result.risk_level} risk)
- Main Causes: ${result.causes?.join(', ') || 'None identified'}
- Current Recommendations: ${result.recommendations?.join(', ') || 'None'}
- Sleep Hours: ${result.sleep_hours || 'Unknown'}

Use this context to provide personalized advice.`;
        }

        const messages = [
            { role: "system", content: SYSTEM_PROMPT + contextMessage },
            { role: "user", content: message }
        ];

        // Add conversation history if provided
        if (context && context.history && Array.isArray(context.history)) {
            // Insert history before the current message
            const historyMessages = context.history.slice(-6).map(h => ({
                role: h.role,
                content: h.content
            }));
            messages.splice(1, 0, ...historyMessages);
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
        });

        const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

        return res.status(200).json({ 
            success: true,
            reply: reply 
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return res.status(500).json({ 
            error: 'Failed to get AI response',
            details: error.message 
        });
    }
};
