# 🧠 LoadCheck - AI Student Burnout Prevention

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-2.3.0-green?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge&logo=openai&logoColor=white" alt="Groq AI">
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License">
</p>

<p align="center">
  <b>An AI-powered academic workload analyzer that helps students prevent burnout by analyzing their study patterns, sleep habits, and upcoming deadlines.</b>
</p>

---

## ✨ Features

- **🎯 Burnout Risk Assessment** - Get an instant risk score based on your academic workload
- **🤖 AI-Powered Recommendations** - Personalized advice from Groq's Llama 3.3 70B model
- **📊 Detailed Breakdown** - Visual analysis of homework, exams, projects, and sleep impact
- **😴 Sleep Analysis** - Understand how your sleep patterns affect your stress levels
- **📅 Deadline Clustering Detection** - Identifies when you have too many deadlines close together
- **🎨 Beautiful UI** - Modern, animated interface with dark mode

## 🖼️ Screenshots

| Landing Page | Analysis Dashboard |
|--------------|-------------------|
| Hero section with animated dashboard preview | Real-time burnout risk visualization |

## 🚀 Quick Start

### Prerequisites

- Python 3.11 or higher
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RishiSomanIsASomosa/loadcheck.git
   cd loadcheck
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv .venv
   
   # Windows
   .\.venv\Scripts\activate
   
   # macOS/Linux
   source .venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your Groq API key
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   ```
   http://127.0.0.1:5000
   ```

## 📖 How It Works

1. **Enter Your Sleep Hours** - Use the slider to input your average nightly sleep
2. **Add Your Subjects** - List each subject with weekly homework hours
3. **Add Upcoming Exams** - Include exam dates and difficulty levels
4. **Add Projects** - Enter project deadlines and complexity
5. **Get Your Analysis** - Receive a detailed burnout risk assessment with AI recommendations

## 🧮 Risk Calculation

LoadCheck uses a weighted scoring algorithm:

| Factor | Weight | Description |
|--------|--------|-------------|
| Homework | 1.5x | Weekly homework hours per subject |
| Exams | 3.0x | Upcoming exams within 14 days |
| Projects | 2.0x | Active projects and deadlines |
| Sleep Deficit | 2.5x | Hours below recommended 8 hours |
| Deadline Clustering | 2.0x | Multiple deadlines within 3 days |

### Risk Levels

- 🟢 **Low (0-30)** - You're managing well! Keep it up.
- 🟡 **Medium (31-60)** - Some stress detected. Consider balancing your schedule.
- 🔴 **High (61-100)** - High burnout risk! Take immediate steps to reduce load.

## 🛠️ Tech Stack

- **Backend**: Flask 2.3.0 (Python)
- **AI**: Groq API with Llama 3.3-70b-versatile
- **Frontend**: Vanilla JavaScript, CSS3 with animations
- **Font**: Plus Jakarta Sans
- **Icons**: Font Awesome 6.4.0

## 📁 Project Structure

```
loadcheck/
├── app.py                 # Flask backend & API routes
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── .env                  # Your local environment variables (git ignored)
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── static/
│   ├── css/
│   │   └── style.css     # All styling & animations
│   └── js/
│       └── app.js        # Frontend interactivity
└── templates/
    └── index.html        # Main HTML template
```

## 🔒 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Your Groq API key for AI recommendations |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com) for providing fast AI inference
- [Font Awesome](https://fontawesome.com) for icons
- [Google Fonts](https://fonts.google.com) for Plus Jakarta Sans

---

<p align="center">
  Made with ❤️ for students everywhere
</p>

<p align="center">
  <a href="https://github.com/RishiSomanIsASomosa/loadcheck">⭐ Star this repo if you found it helpful!</a>
</p>
