"""
LoadCheck - AI-based Student Workload & Burnout Risk Checker
Helps students understand their academic load and suggests improvements.
"""

from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Initialize Groq client - Use environment variable for security
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

class LoadCheckAnalyzer:
    """Analyzes student workload and calculates burnout risk."""
    
    def __init__(self):
        # Weight factors for different stress contributors
        self.weights = {
            'homework': 1.5,
            'exams': 3.0,
            'projects': 2.0,
            'sleep_deficit': 2.5,
            'deadline_clustering': 2.0
        }
        
        # Risk thresholds
        self.risk_thresholds = {
            'low': 30,
            'medium': 60,
            'high': 100
        }
    
    def analyze(self, data):
        """
        Analyze student data and return workload assessment.
        
        Args:
            data: Dictionary containing subjects, exams, projects, sleep hours
        
        Returns:
            Dictionary with risk level, score, breakdown, and recommendations
        """
        score_breakdown = {}
        recommendations = []
        main_causes = []
        
        # 1. Calculate homework stress score
        homework_score = self._calculate_homework_score(data.get('subjects', []))
        score_breakdown['homework'] = homework_score
        
        # 2. Calculate exam stress score
        exam_score = self._calculate_exam_score(data.get('exams', []))
        score_breakdown['exams'] = exam_score
        
        # 3. Calculate project stress score
        project_score = self._calculate_project_score(data.get('projects', []))
        score_breakdown['projects'] = project_score
        
        # 4. Calculate sleep deficit score
        sleep_score = self._calculate_sleep_score(data.get('sleep_hours', 8))
        score_breakdown['sleep_deficit'] = sleep_score
        
        # 5. Calculate deadline clustering penalty
        clustering_score = self._calculate_deadline_clustering(
            data.get('exams', []), 
            data.get('projects', [])
        )
        score_breakdown['deadline_clustering'] = clustering_score
        
        # Calculate total score
        total_score = sum(score_breakdown.values())
        
        # Determine risk level
        risk_level = self._determine_risk_level(total_score)
        
        # Identify main causes and generate recommendations
        main_causes, recommendations = self._generate_recommendations(
            score_breakdown, data, total_score
        )
        
        return {
            'total_score': round(total_score, 1),
            'risk_level': risk_level,
            'score_breakdown': {k: round(v, 1) for k, v in score_breakdown.items()},
            'main_causes': main_causes,
            'recommendations': recommendations,
            'summary': self._generate_summary(risk_level, total_score, main_causes)
        }
    
    def _calculate_homework_score(self, subjects):
        """Calculate stress from homework hours."""
        total_hours = sum(s.get('hours_per_week', s.get('hours', 0)) for s in subjects)
        
        # Normal: 2-3 hours/day = 14-21 hours/week
        # High: > 25 hours/week
        if total_hours <= 15:
            return total_hours * 0.5 * self.weights['homework']
        elif total_hours <= 25:
            return total_hours * 1.0 * self.weights['homework']
        else:
            return total_hours * 1.5 * self.weights['homework']
    
    def _calculate_exam_score(self, exams):
        """Calculate stress from upcoming exams."""
        score = 0
        today = datetime.now().date()
        
        for exam in exams:
            try:
                exam_date = datetime.strptime(exam.get('date', ''), '%Y-%m-%d').date()
                days_until = (exam_date - today).days
                
                if days_until < 0:
                    continue  # Past exam
                elif days_until <= 3:
                    score += 15 * self.weights['exams']  # Imminent exam
                elif days_until <= 7:
                    score += 10 * self.weights['exams']  # This week
                elif days_until <= 14:
                    score += 5 * self.weights['exams']   # Next two weeks
                else:
                    score += 2 * self.weights['exams']   # Future exam
            except (ValueError, TypeError):
                score += 5 * self.weights['exams']  # Unknown date
        
        return score
    
    def _calculate_project_score(self, projects):
        """Calculate stress from projects/assignments."""
        score = 0
        today = datetime.now().date()
        
        for project in projects:
            try:
                due_date = datetime.strptime(project.get('deadline', ''), '%Y-%m-%d').date()
                days_until = (due_date - today).days
                complexity = project.get('complexity', 'medium')
                
                # Base score by complexity
                complexity_multiplier = {'low': 0.5, 'medium': 1.0, 'high': 1.5}.get(complexity, 1.0)
                
                if days_until < 0:
                    continue  # Past deadline
                elif days_until <= 2:
                    score += 12 * complexity_multiplier * self.weights['projects']
                elif days_until <= 5:
                    score += 8 * complexity_multiplier * self.weights['projects']
                elif days_until <= 10:
                    score += 4 * complexity_multiplier * self.weights['projects']
                else:
                    score += 2 * complexity_multiplier * self.weights['projects']
            except (ValueError, TypeError):
                score += 5 * self.weights['projects']
        
        return score
    
    def _calculate_sleep_score(self, sleep_hours):
        """Calculate stress from sleep deficit."""
        # Recommended: 7-9 hours for students
        optimal_sleep = 8
        
        if sleep_hours >= 7:
            return 0  # Adequate sleep
        elif sleep_hours >= 6:
            return (optimal_sleep - sleep_hours) * 5 * self.weights['sleep_deficit']
        elif sleep_hours >= 5:
            return (optimal_sleep - sleep_hours) * 8 * self.weights['sleep_deficit']
        else:
            return (optimal_sleep - sleep_hours) * 12 * self.weights['sleep_deficit']
    
    def _calculate_deadline_clustering(self, exams, projects):
        """Calculate penalty for multiple deadlines close together."""
        all_dates = []
        today = datetime.now().date()
        
        for exam in exams:
            try:
                date = datetime.strptime(exam.get('date', ''), '%Y-%m-%d').date()
                if date >= today:
                    all_dates.append(date)
            except (ValueError, TypeError):
                pass
        
        for project in projects:
            try:
                date = datetime.strptime(project.get('deadline', ''), '%Y-%m-%d').date()
                if date >= today:
                    all_dates.append(date)
            except (ValueError, TypeError):
                pass
        
        if len(all_dates) < 2:
            return 0
        
        all_dates.sort()
        clustering_score = 0
        
        # Check for deadlines within 3 days of each other
        for i in range(len(all_dates) - 1):
            gap = (all_dates[i + 1] - all_dates[i]).days
            if gap <= 1:
                clustering_score += 10 * self.weights['deadline_clustering']
            elif gap <= 3:
                clustering_score += 5 * self.weights['deadline_clustering']
        
        return clustering_score
    
    def _determine_risk_level(self, total_score):
        """Determine burnout risk level based on total score."""
        if total_score <= self.risk_thresholds['low']:
            return {
                'level': 'low',
                'emoji': '🟢',
                'label': 'Low Risk',
                'color': '#4CAF50'
            }
        elif total_score <= self.risk_thresholds['medium']:
            return {
                'level': 'medium',
                'emoji': '🟡',
                'label': 'Medium Risk',
                'color': '#FFC107'
            }
        else:
            return {
                'level': 'high',
                'emoji': '🔴',
                'label': 'High Risk',
                'color': '#F44336'
            }
    
    def _generate_recommendations(self, score_breakdown, data, total_score):
        """Generate smart recommendations based on analysis."""
        recommendations = []
        main_causes = []
        
        # Sort factors by their contribution
        sorted_factors = sorted(score_breakdown.items(), key=lambda x: x[1], reverse=True)
        
        for factor, score in sorted_factors:
            if score > 10:  # Significant contributor
                main_causes.append(factor.replace('_', ' ').title())
        
        # Sleep recommendations
        sleep_hours = data.get('sleep_hours', 8)
        if sleep_hours < 6:
            recommendations.append({
                'priority': 'high',
                'icon': '😴',
                'title': 'Critical: Improve Sleep',
                'description': f'You\'re only getting {sleep_hours} hours of sleep. Try to get at least 7 hours tonight. Sleep deprivation significantly increases burnout risk.',
                'action': 'Set a bedtime alarm 8 hours before you need to wake up.'
            })
        elif sleep_hours < 7:
            recommendations.append({
                'priority': 'medium',
                'icon': '🛏️',
                'title': 'Get More Sleep',
                'description': f'At {sleep_hours} hours, you\'re slightly sleep deprived. An extra hour of sleep can improve focus and reduce stress.',
                'action': 'Try going to bed 30 minutes earlier tonight.'
            })
        
        # Homework recommendations
        subjects = data.get('subjects', [])
        if subjects:
            total_homework = sum(s.get('hours', 0) for s in subjects)
            if total_homework > 25:
                heaviest = max(subjects, key=lambda x: x.get('hours', 0))
                recommendations.append({
                    'priority': 'high',
                    'icon': '📚',
                    'title': 'Reduce Homework Load',
                    'description': f'{total_homework} hours/week is very high. Consider focusing on quality over quantity.',
                    'action': f'Try reducing time on {heaviest.get("name", "your heaviest subject")} by using more efficient study techniques.'
                })
        
        # Exam recommendations
        exams = data.get('exams', [])
        today = datetime.now().date()
        urgent_exams = []
        for exam in exams:
            try:
                exam_date = datetime.strptime(exam.get('date', ''), '%Y-%m-%d').date()
                days = (exam_date - today).days
                if 0 <= days <= 3:
                    urgent_exams.append(exam)
            except (ValueError, TypeError):
                pass
        
        if len(urgent_exams) > 1:
            recommendations.append({
                'priority': 'high',
                'icon': '📝',
                'title': 'Multiple Exams Soon',
                'description': f'You have {len(urgent_exams)} exams in the next 3 days. This is a high-stress period.',
                'action': 'Focus only on exam prep. Delay other assignments if possible and take short breaks every 45 minutes.'
            })
        elif urgent_exams:
            recommendations.append({
                'priority': 'medium',
                'icon': '📖',
                'title': 'Exam Coming Up',
                'description': f'You have an exam in the next few days.',
                'action': 'Prioritize exam study over other assignments. Use active recall and practice problems.'
            })
        
        # Project recommendations
        projects = data.get('projects', [])
        urgent_projects = []
        for project in projects:
            try:
                due_date = datetime.strptime(project.get('deadline', ''), '%Y-%m-%d').date()
                days = (due_date - today).days
                if 0 <= days <= 3:
                    urgent_projects.append(project)
            except (ValueError, TypeError):
                pass
        
        if urgent_projects:
            high_complexity = [p for p in urgent_projects if p.get('complexity') == 'high']
            if high_complexity:
                recommendations.append({
                    'priority': 'high',
                    'icon': '🎯',
                    'title': 'Complex Project Due Soon',
                    'description': f'You have a high-complexity project due very soon.',
                    'action': 'Consider asking for an extension or focus on completing the most important parts first.'
                })
        
        # Deadline clustering warning
        if score_breakdown.get('deadline_clustering', 0) > 15:
            recommendations.append({
                'priority': 'medium',
                'icon': '📅',
                'title': 'Deadline Clustering Detected',
                'description': 'Multiple deadlines are very close together, increasing stress.',
                'action': 'Try to negotiate moving one deadline, or identify which task can be completed with "good enough" quality.'
            })
        
        # General recommendations based on risk level
        if total_score > 60:
            recommendations.append({
                'priority': 'low',
                'icon': '🧘',
                'title': 'Take Care of Yourself',
                'description': 'Your workload is high. Remember to take breaks and stay healthy.',
                'action': 'Take a 15-minute walk or do some stretching. Staying healthy improves productivity.'
            })
        
        # Sort by priority
        priority_order = {'high': 0, 'medium': 1, 'low': 2}
        recommendations.sort(key=lambda x: priority_order.get(x['priority'], 3))
        
        return main_causes[:3], recommendations[:5]
    
    def _generate_summary(self, risk_level, total_score, main_causes):
        """Generate a friendly summary message."""
        level = risk_level['level']
        
        if level == 'low':
            return "Great job! Your workload is manageable. Keep maintaining this balance! 🌟"
        elif level == 'medium':
            causes_text = ', '.join(main_causes[:2]) if main_causes else 'your schedule'
            return f"Your workload is elevated, mainly due to {causes_text}. Consider the recommendations below to stay on track. 💪"
        else:
            causes_text = ', '.join(main_causes[:2]) if main_causes else 'multiple factors'
            return f"⚠️ Warning: Your academic load is very high due to {causes_text}. Taking action now can help prevent burnout."


# Initialize analyzer
analyzer = LoadCheckAnalyzer()


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
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        result = analyzer.analyze(data)
        
        # Get AI-powered insights from Groq
        ai_recommendation = get_ai_recommendation(data, result)
        
        # Format response for frontend
        response = {
            'success': True,
            'analysis': {
                'total_score': result['total_score'],
                'risk_level': result['risk_level']['label'],
                'score_breakdown': result['score_breakdown'],
                'causes': result['main_causes'],
                'recommendations': result['recommendations'],
                'summary': result['summary'],
                'ai_recommendation': ai_recommendation
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


def get_ai_recommendation(data, analysis_result):
    """Get personalized AI recommendation from Groq."""
    try:
        # Build context for AI
        subjects_info = ", ".join([f"{s.get('name', 'Unknown')} ({s.get('hours_per_week', s.get('hours', 0))}h/week)" for s in data.get('subjects', [])])
        exams_info = ", ".join([f"{e.get('name', 'Exam')} on {e.get('date', 'TBD')}" for e in data.get('exams', [])])
        projects_info = ", ".join([f"{p.get('name', 'Project')} due {p.get('deadline', 'TBD')}" for p in data.get('projects', [])])
        
        prompt = f"""You are an empathetic academic wellness advisor for students. Based on this student's data, provide a SHORT, personalized, and actionable response (max 3 sentences).

Student's Situation:
- Sleep: {data.get('sleep_hours', 7)} hours/night
- Subjects & Study Hours: {subjects_info or 'None specified'}
- Upcoming Exams: {exams_info or 'None'}
- Projects Due: {projects_info or 'None'}
- Burnout Risk Score: {analysis_result['total_score']}/100 ({analysis_result['risk_level']['label']})
- Main Stress Factors: {', '.join(analysis_result['main_causes']) or 'None identified'}

Give ONE specific, encouraging tip that addresses their biggest challenge. Be warm and supportive. Don't use bullet points."""

        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a caring academic wellness coach. Keep responses brief, warm, and actionable."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=150
        )
        
        return chat_completion.choices[0].message.content.strip()
    
    except Exception as e:
        print(f"Groq API error: {e}")
        return "Focus on one task at a time and remember to take short breaks. You've got this! 💪"


@app.route('/health')
def health():
    """Health check endpoint."""
    return jsonify({'status': 'healthy', 'app': 'LoadCheck'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
