<div align="center">

# 🧠 LoadCheck

### AI-Powered Student Burnout Prevention

<br>

[![Live Demo](https://img.shields.io/badge/🌐_LIVE_DEMO-loadcheck.vercel.app-6366f1?style=for-the-badge&labelColor=0a0a0a)](https://loadcheck.vercel.app)

<br>

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-FF6B35?style=flat-square&logo=meta&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat-square&logo=greensock&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-a855f7?style=flat-square)

<br>

<p>
  <strong>Analyze your academic workload • Get personalized AI recommendations • Prevent burnout</strong>
</p>

<br>

---

<br>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="rainbow line" width="100%">

</div>

<br>

## ⚡ What is LoadCheck?

**LoadCheck** is an intelligent wellness tool designed for students. It analyzes your **sleep patterns**, **homework load**, **upcoming exams**, and **project deadlines** to calculate your burnout risk and provide AI-powered recommendations.

<br>

<div align="center">

| 😴 Sleep Analysis | 📚 Workload Tracking | 🤖 AI Chatbot | 📊 Risk Score |
|:---:|:---:|:---:|:---:|
| Track sleep hours | Monitor study load | Get personalized tips | 0-100 burnout meter |

</div>

<br>

---

<br>

## ✨ Features

<br>

<table>
<tr>
<td width="50%">

### 🎯 **Core Features**

- 📈 **Dual Score System** — Sleep score + Burnout risk
- 🤖 **AI Chatbot** — Ask questions, get personalized advice
- 📊 **Stress Breakdown** — Visual analysis of each factor
- 📅 **Deadline Detection** — Identifies clustered deadlines
- 🔄 **Offline Fallback** — Works without internet

</td>
<td width="50%">

### 🎨 **Premium UI/UX**

- ✨ **Luxury Dark Theme** — Elegant gold accents
- 🎬 **GSAP Animations** — Buttery-smooth reveals
- 🧈 **Smooth Scroll** — Lenis-powered scrolling
- 🃏 **3D Tilt Cards** — Interactive hover effects
- 🧲 **Magnetic Buttons** — Cursor-following buttons

</td>
</tr>
</table>

<br>

---

<br>

## 🚀 Quick Start

<br>

### Use the Live Demo
> 👉 **[loadcheck.vercel.app](https://loadcheck.vercel.app)** — No setup required!

<br>

### Run Locally

```bash
# Clone the repository
git clone https://github.com/RishiSomanIsASomosa/loadcheck.git
cd loadcheck

# Install dependencies
npm install

# Add your API key
echo "GROQ_API_KEY=your_key_here" > .env

# Start development server
npx vercel dev
```

> 🔑 Get a free Groq API key at [console.groq.com](https://console.groq.com)

<br>

---

<br>

## 📖 How It Works

<br>

<div align="center">

```
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │              │     │              │     │              │     │              │
  │   📝 INPUT   │ ──▶ │   🤖 AI      │ ──▶ │   📊 SCORE   │ ──▶ │   💡 TIPS    │
  │              │     │              │     │              │     │              │
  │  Sleep hrs   │     │  Llama 3.3   │     │  Risk: 32    │     │  Personalized│
  │  Subjects    │     │  Analysis    │     │  Sleep: 85   │     │  Advice      │
  │  Exams       │     │              │     │              │     │              │
  │  Projects    │     │              │     │              │     │              │
  └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

</div>

<br>

---

<br>

## 🧮 Scoring System

<br>

<div align="center">

| Factor | Weight | Impact |
|:------:|:------:|:------:|
| 📚 **Homework** | 1.5x | Weekly study hours per subject |
| 📝 **Exams** | 3.0x | Upcoming exams (14-day window) |
| 🎯 **Projects** | 2.0x | Approaching deadlines |
| 😴 **Sleep** | 2.5x | Hours below 7hr threshold |
| 📅 **Clustering** | 2.0x | Multiple deadlines ≤3 days apart |

</div>

<br>

<div align="center">

| Score | Level | Status |
|:-----:|:-----:|:------:|
| `0-30` | 😊 **Low** | Great balance! |
| `31-60` | 😐 **Medium** | Getting heavy... |
| `61-100` | 😰 **High** | Take action! |

</div>

<br>

---

<br>

## 🛠️ Tech Stack

<br>

<div align="center">

| | Technology | Purpose |
|:---:|:---|:---|
| 🎨 | **HTML5 / CSS3 / JS** | Frontend |
| ⚡ | **Vercel Functions** | Serverless API |
| 🧠 | **Groq Llama 3.3-70B** | AI recommendations |
| 🎬 | **GSAP + ScrollTrigger** | Premium animations |
| 🧈 | **Lenis** | Smooth scrolling |
| 🔤 | **Playfair Display** | Typography |
| 🎨 | **Font Awesome 6.4** | Icons |

</div>

<br>

---

<br>

## 📁 Project Structure

```
loadcheck/
├── 📁 api/
│   ├── analyze.js      # Burnout analysis endpoint
│   └── chat.js         # AI chatbot endpoint
├── 📄 index.html       # Main HTML
├── 🎨 style.css        # 5000+ lines of premium CSS
├── ⚙️ app.js           # Frontend JavaScript
├── 📦 package.json     # Dependencies
└── 🔧 vercel.json      # Deployment config
```

<br>

---

<br>

## 🌐 Deploy Your Own

<br>

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RishiSomanIsASomosa/loadcheck&env=GROQ_API_KEY)

</div>

<br>

**Manual deployment:**
1. Fork this repository
2. Import to [Vercel](https://vercel.com/new)
3. Add `GROQ_API_KEY` environment variable
4. Deploy! 🚀

<br>

---

<br>

## 📝 Recent Updates

<br>

<details>
<summary><b>v2.2.0 — AI Chatbot & Dual Scores</b> (Feb 2026)</summary>

- 🤖 Added floating AI chatbot for help & tips
- 🤖 Added in-results AI assistant chat
- 😴 Added Sleep Score alongside Burnout Risk
- 🎨 New dual-score card layout
- 🔧 Fixed CSS empty ruleset error

</details>

<details>
<summary><b>v2.1.0 — Stability Fixes</b> (Feb 2026)</summary>

- 🐛 Fixed GSAP crash on analysis
- 🐛 Fixed counter animation
- 🐛 Fixed race condition in results display
- 🛡️ Added null-safety checks

</details>

<details>
<summary><b>v2.0.0 — Premium Animation Overhaul</b> (Feb 2026)</summary>

- 🎬 GSAP + ScrollTrigger animations
- 🧈 Lenis smooth scroll
- ✨ Cinematic preloader
- 🃏 3D tilt cards
- 🧲 Magnetic buttons
- 📜 Timeline parallax

</details>

<br>

---

<br>

## 🤝 Contributing

Contributions welcome! Feel free to:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. 💾 Commit your changes
4. 🚀 Push and open a PR

<br>

---

<br>

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

<br>

---

<br>

<div align="center">

## 👨‍💻 Author

<br>

[![GitHub](https://img.shields.io/badge/GitHub-RishiSomanIsASomosa-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RishiSomanIsASomosa)

<br>

---

<br>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="rainbow line" width="100%">

<br>

![Made with Love](https://img.shields.io/badge/Made_with-❤️-ff0000?style=for-the-badge)
![For Students](https://img.shields.io/badge/For-Students-6366f1?style=for-the-badge)

<br>

### ⭐ Star this repo if it helped you!

<br>

<a href="https://loadcheck.vercel.app">
  <img src="https://img.shields.io/badge/🚀_Try_LoadCheck_Now-6366f1?style=for-the-badge&labelColor=0a0a0a" alt="Try LoadCheck">
</a>

</div>
