"""
LoadCheck - Vercel Serverless Entry Point
"""

from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta
import json
import os
from groq import Groq

# Create Flask app with correct template/static paths
app = Flask(__name__, 
            template_folder='../templates',
            static_folder='../static',
            static_url_path='/static')

# Initialize Groq client
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

class LoadCheckAnalyzer:
    """Analyzes student workload and calculates burnout risk."""
    
    def __init__(self):
        self.weights = {
            'homework': 1.5,
            'exams': 3.0,
            'projects': 2.0,
            'sleep_deficit': 2.5,
            'deadline_clustering': 2.0
        }
        
        self.risk_thresholds = {
            'low': 30,
            'medium': 60,
            'high': 100
        }
    
    def analyze(self, data):
        """Analyze student data and return workload assessment."""
        scores = {
            'homework': 0,
            'exams': 0,
            'projects': 0,
            'sleep_deficit': 0,
            'deadline_clustering': 0
        }
        
        # Calculate homework load
        subjects = data.get('subjects', [])
        total_homework_hours = sum(s.get('hours_per_week', 0) for s in subjects)
        scores['homework'] = min(total_homework_hours * self.weights['homework'], 30)
        
        # Calculate exam stress
        exams = data.get('exams', [])
        today = datetime.now()
        for exam in exams:
            try:
                exam_date = datetime.strptime(exam.get('date', ''), '%Y-%m-%d')
                days_until = (exam_date - today).days
                if 0 <= days_until <= 14:
                    difficulty = exam.get('difficulty', 'medium')
                    diff_multiplier = {'easy': 0.5, 'medium': 1.0, 'hard': 1.5}.get(difficulty, 1.0)
                    urgency = max(0, (14 - days_until) / 14)
                    scores['exams'] += urgency * self.weights['exams'] * diff_multiplier * 5
            except (ValueError, TypeError):
                continue
        scores['exams'] = min(scores['exams'], 30)
        
        # Calculate project load
        projects = data.get('projects', [])
        for project in projects:
            try:
                deadline = datetime.strptime(project.get('deadline', ''), '%Y-%m-%d')
                days_until = (deadline - today).days
                if 0 <= days_until <= 21:
                    complexity = project.get('complexity', 'medium')
                    comp_multiplier = {'low': 0.5, 'medium': 1.0, 'high': 1.5}.get(complexity, 1.0)
                    urgency = max(0, (21 - days_until) / 21)
                    scores['projects'] += urgency * self.weights['projects'] * comp_multiplier * 5
            except (ValueError, TypeError):
                continue
        scores['projects'] = min(scores['projects'], 25)
        
        # Calculate sleep deficit impact
        sleep_hours = data.get('sleep_hours', 8)
        if sleep_hours < 7:
            deficit = 7 - sleep_hours
            scores['sleep_deficit'] = deficit * self.weights['sleep_deficit'] * 3
        scores['sleep_deficit'] = min(scores['sleep_deficit'], 20)
        
        # Calculate deadline clustering
        all_deadlines = []
        for exam in exams:
            try:
                all_deadlines.append(datetime.strptime(exam.get('date', ''), '%Y-%m-%d'))
            except (ValueError, TypeError):
                continue
        for project in projects:
            try:
                all_deadlines.append(datetime.strptime(project.get('deadline', ''), '%Y-%m-%d'))
            except (ValueError, TypeError):
                continue
        
        all_deadlines.sort()
        cluster_penalty = 0
        for i in range(len(all_deadlines) - 1):
            days_apart = (all_deadlines[i + 1] - all_deadlines[i]).days
            if days_apart <= 3:
                cluster_penalty += (4 - days_apart) * self.weights['deadline_clustering']
        scores['deadline_clustering'] = min(cluster_penalty, 15)
        
        # Calculate total score
        total_score = sum(scores.values())
        total_score = min(max(total_score, 0), 100)
        
        # Determine risk level
        if total_score <= self.risk_thresholds['low']:
            risk_level = 'low'
        elif total_score <= self.risk_thresholds['medium']:
            risk_level = 'medium'
        else:
            risk_level = 'high'
        
        # Generate causes and recommendations
        causes = []
        recommendations = []
        
        if scores['homework'] > 15:
            causes.append("Heavy homework load across subjects")
            recommendations.append("Consider prioritizing assignments by due date and importance")
        
        if scores['exams'] > 15:
            causes.append("Multiple upcoming exams creating pressure")
            recommendations.append("Create a study schedule and use active recall techniques")
        
        if scores['projects'] > 12:
            causes.append("Project deadlines approaching")
            recommendations.append("Break projects into smaller milestones")
        
        if scores['sleep_deficit'] > 8:
            causes.append("Insufficient sleep affecting your performance")
            recommendations.append("Aim for 7-8 hours of sleep; it improves memory and focus")
        
        if scores['deadline_clustering'] > 8:
            causes.append("Multiple deadlines clustered together")
            recommendations.append("Talk to professors about deadline flexibility")
        
        if not causes:
            causes.append("Workload is manageable")
            recommendations.append("Keep up the good work and maintain your current balance!")
        
        return {
            'score': round(total_score, 1),
            'risk_level': risk_level,
            'breakdown': {k: round(v, 1) for k, v in scores.items()},
            'causes': causes,
            'recommendations': recommendations
        }

# Initialize analyzer
analyzer = LoadCheckAnalyzer()

def get_ai_recommendation(analysis_data, user_data):
    """Get personalized AI recommendation from Groq."""
    if not groq_client:
        return "AI recommendations require a valid API key. Please check your configuration."
    
    try:
        prompt = f"""You are a supportive academic wellness advisor. A student has the following situation:

Risk Level: {analysis_data['risk_level'].upper()}
Burnout Score: {analysis_data['score']}/100
Sleep: {user_data.get('sleep_hours', 'unknown')} hours/night
Number of subjects: {len(user_data.get('subjects', []))}
Upcoming exams: {len(user_data.get('exams', []))}
Active projects: {len(user_data.get('projects', []))}

Main stress factors: {', '.join(analysis_data['causes'][:3])}

Give ONE specific, actionable tip (2-3 sentences max) that addresses their biggest challenge. Be warm and encouraging. Include one relevant emoji."""

        chat_completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=150
        )
        
        return chat_completion.choices[0].message.content.strip()
    
    except Exception as e:
        print(f"Groq API error: {e}")
        return "Focus on one task at a time and remember to take short breaks. You've got this! 💪"


@app.route('/')
def index():
    """Render the main page."""
    return render_template('index.html')


@app.route('/analyze', methods=['POST'])
def analyze():
    """Analyze student workload and return results."""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Run analysis
        analysis = analyzer.analyze(data)
        
        # Get AI recommendation
        ai_message = get_ai_recommendation(analysis, data)
        
        return jsonify({
            'success': True,
            'analysis': {
                'score': analysis['score'],
                'risk_level': analysis['risk_level'],
                'breakdown': analysis['breakdown'],
                'causes': analysis['causes'],
                'recommendations': analysis['recommendations'],
                'ai_message': ai_message
            }
        })
        
    except Exception as e:
        print(f"Analysis error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/health')
def health():
    """Health check endpoint."""
    return jsonify({'status': 'healthy', 'app': 'LoadCheck'})


# Export for Vercel
app = app
