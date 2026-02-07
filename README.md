#   🧠 LoadCheck - AI Student Burnout Prevention

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Groq-Llama_3.3-orange?style=for-the-badge&logo=meta&logoColor=white" alt="Groq AI">
  <img src="https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP">
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Updated-Feb%202026-blue?style=for-the-badge" alt="Updated">
</p>

<p align="center">
  <b>🔥 An AI-powered academic workload analyzer that helps students prevent burnout by analyzing their study patterns, sleep habits, and upcoming deadlines.</b>
</p>

<p align="center">
  <a href="https://loadcheck.vercel.app">🌐 Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

---

## 🌟 Live Demo

**👉 [https://loadcheck.vercel.app](https://loadcheck.vercel.app)**

---

## 📝 Recent Updates

### v2.1.0 (Feb 2026) — Stability & Deployment Fix
- 🐛 **Fixed critical GSAP crash** — `gsap.fromTo()` called with 2 args instead of 3 caused "Cannot set properties of undefined (setting 'parent')" on analysis
- 🐛 **Fixed counter animation** — Replaced fragile `this.targets()[0]` pattern with closure-based object references
- 🐛 **Fixed race condition** — `showResults()` now returns a Promise; `displayResults()` waits for the results section to be fully visible before animating
- 🛡️ **Added null-safety** — All DOM element references in `displayResults()` are null-checked to prevent crashes on missing elements
- 🚀 **Redeployed to Vercel** — Production build at [loadcheck.vercel.app](https://loadcheck.vercel.app)

### v2.0.0 (Feb 2026) — Premium Animation Overhaul
- 🎬 **GSAP + ScrollTrigger** — All scroll animations now powered by GSAP for buttery-smooth reveals
- 🧈 **Lenis Smooth Scroll** — Hardware-accelerated smooth scrolling across the entire page
- ✨ **Preloader** — Elegant character-by-character text reveal with progress counter
- 🎠 **Infinite Marquee** — Auto-scrolling keyword ticker with hover pause
- 🃏 **3D Tilt Cards** — Interactive perspective tilt with spotlight gradient on hover
- 🧲 **Magnetic Buttons** — Cursor-following buttons with elastic snap-back
- 📜 **Timeline Parallax** — Scroll-scrubbed progress line with staggered item reveals
- 🔤 **Text Scramble** — Hacker-style text decode effect on gradient headings
- 📊 **Animated Counters** — ScrollTrigger-powered number count-ups
- 🎭 **Clip-Path Reveals** — Section titles reveal with cinematic clip-path wipes
- 🌊 **Parallax Orbs** — Mouse-tracking gradient orbs in the hero section
- 🔁 **Smooth Page Transitions** — GSAP timeline transitions between landing/app pages
- 🐛 Fixed AOS + GSAP animation conflicts (removed duplicate data-aos attributes)
- 🐛 Fixed CSS `transition: all` fighting GSAP transforms on cards

### v1.1.0 (Jun 2025)
- ✅ Fixed AI avatar icon visibility — z-index layering fix for Font Awesome icon
- ✅ Added missing Sora font import to Google Fonts
- ✅ Fixed wildcard CSS transition glitch — scoped to interactive elements only
- ✅ Removed conflicting section opacity animation that fought with AOS
- ✅ Fixed glass-card hover lift applying to form cards
- ✅ Added client-side fallback analysis when API is unavailable
- ✅ Added real-time form progress bar tracking with MutationObserver
- ✅ Fixed breakdown bar animation (force reflow technique)
- ✅ Slowed loading animation to 4.5s minimum display time
- ✅ Fixed emoji overlapping score in risk circle — resized elements
- ✅ Deployed to Vercel with full production setup

### v1.0.1 (Feb 2025)
- ✅ Fixed sleep hours slider precision — now correctly handles decimal values (7.5, 8.5, etc.)
- ✅ Fixed label alignment on sleep slider to match actual values
- ✅ Initial Vercel deployment

---

## ✨ Features

### 🎯 Core Features
- **Burnout Risk Assessment** - Get an instant risk score (0-100) based on your academic workload
- **🤖 AI-Powered Recommendations** - Personalized advice from Groq's Llama 3.3 70B model
- **📊 Detailed Breakdown** - Visual analysis of homework, exams, projects, and sleep impact
- **😴 Sleep Analysis** - Understand how your sleep patterns affect your stress levels
- **📅 Deadline Clustering Detection** - Identifies when you have too many deadlines close together
- **🔄 Offline Fallback** - Client-side analysis works even when the API is unavailable
- **📈 Real-Time Progress Tracking** - Form progress bar updates as you fill in your data

### 🎨 Premium Animated UI/UX
- **Luxury Dark Theme** — Elegant deep black backgrounds with muted gold accents
- **GSAP ScrollTrigger Animations** — Buttery-smooth scroll-triggered reveals, clip-path wipes, staggered entrances
- **Lenis Smooth Scroll** — Hardware-accelerated smooth scrolling (1.2s eased)
- **Cinematic Preloader** — Character reveal + progress counter before page entry
- **3D Tilt Cards** — Perspective-shifting cards with spotlight gradient on hover
- **Magnetic Buttons** — Cursor-following buttons with elastic snap-back
- **Infinite Marquee** — Auto-scrolling keyword ticker with hover pause
- **Parallax Effects** — Mouse-tracking gradient orbs + scroll-driven depth layers
- **Text Scramble** — Hacker-style decode effect on gradient headings
- **Animated Counters** — ScrollTrigger-powered number count-ups
- **Playfair Display Typography** — Sophisticated serif fonts for a luxury feel
- **Gold Gradient Accents** — Warm gold-to-bronze gradient highlights

---

## 🖼️ Preview

| Landing Page | Analysis Results |
|:------------:|:----------------:|
| Beautiful animated hero with dashboard preview | Real-time burnout risk visualization with AI tips |

---

## 🚀 Quick Start

### Option 1: Use the Live Demo
Just visit **[loadcheck.vercel.app](https://loadcheck.vercel.app)** - no setup required!

### Option 2: Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/RishiSomanIsASomosa/loadcheck.git
   cd loadcheck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   echo "GROQ_API_KEY=your_groq_api_key_here" > .env
   ```
   
   Get a free API key at [console.groq.com](https://console.groq.com)

4. **Run with Vercel CLI**
   ```bash
   npm i -g vercel
   vercel dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📖 How It Works

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  📝 Enter Data  │ -> │  🤖 AI Analysis │ -> │  📊 Get Results │ -> │  🎯 Take Action │
│                 │    │                 │    │                 │    │                 │
│  • Sleep hours  │    │  Weighted       │    │  • Risk score   │    │  Balance your   │
│  • Subjects     │    │  algorithm +    │    │  • Breakdown    │    │  schedule and   │
│  • Exams        │    │  Llama 3.3 AI   │    │  • AI tips      │    │  thrive! 🚀     │
│  • Projects     │    │                 │    │  • Causes       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🧮 Risk Calculation Algorithm

| Factor | Weight | Max Score | Description |
|--------|:------:|:---------:|-------------|
| 📚 Homework | 1.5x | 30 | Weekly homework hours per subject |
| 📝 Exams | 3.0x | 30 | Upcoming exams within 14 days |
| 🎯 Projects | 2.0x | 25 | Active projects and deadlines |
| 😴 Sleep Deficit | 2.5x | 20 | Hours below recommended 7 hours |
| 📅 Deadline Clustering | 2.0x | 15 | Multiple deadlines within 3 days |

### Risk Levels

| Score | Level | Emoji | Meaning |
|:-----:|:-----:|:-----:|---------|
| 0-30 | Low | 😊 | You're managing well! Keep it up. |
| 31-60 | Medium | 😐 | Some stress detected. Consider balancing. |
| 61-100 | High | 😰 | High burnout risk! Take action now. |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js (Vercel Serverless Functions) |
| **AI Model** | Groq API with Llama 3.3-70b-versatile |
| **Hosting** | Vercel |
| **Animations** | GSAP 3.12 + ScrollTrigger, Lenis Smooth Scroll, AOS (secondary) |
| **Fonts** | Playfair Display (Headings) + Inter (Body) + Cormorant Garamond + Sora |
| **Icons** | Font Awesome 6.4.0 |
| **Design** | Modern Bakery-inspired luxury aesthetic with premium scroll animations |

---

## 📁 Project Structure

```
loadcheck/
├── api/
│   └── analyze.js        # Serverless API endpoint
├── index.html            # Main HTML with landing + app
├── style.css             # Premium styling & animations
├── app.js                # Frontend JavaScript
├── vercel.json           # Vercel deployment config
├── package.json          # Node.js dependencies
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── LICENSE               # MIT License
└── README.md             # This file
```

---

## 🔒 Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `GROQ_API_KEY` | ✅ | Your Groq API key for AI recommendations |

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Fork this repository
2. Import to [Vercel](https://vercel.com/new)
3. Add `GROQ_API_KEY` in Environment Variables
4. Deploy! 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RishiSomanIsASomosa/loadcheck&env=GROQ_API_KEY)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) for blazing fast AI inference
- [Vercel](https://vercel.com) for seamless deployment
- [GSAP](https://greensock.com/gsap/) for professional-grade animations
- [Lenis](https://lenis.studiofreight.com/) for buttery smooth scrolling
- [Font Awesome](https://fontawesome.com) for beautiful icons
- [AOS](https://michalsnik.github.io/aos/) for complementary scroll animations
- [Google Fonts](https://fonts.google.com) for Playfair Display, Inter, and Cormorant Garamond
- Animation style inspired by [Modern Bakery](https://www.modernbakery.com/) premium web aesthetics

---

## 👨‍💻 Author

<p align="center">
  <a href="https://github.com/RishiSomanIsASomosa">
    <img src="https://img.shields.io/badge/GitHub-RishiSomanIsASomosa-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

<p align="center">
  <b>Created by <a href="https://github.com/RishiSomanIsASomosa">@RishiSomanIsASomosa</a></b>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge" alt="Made with love">
  <img src="https://img.shields.io/badge/For-Students-blue?style=for-the-badge" alt="For Students">
</p>

<p align="center">
  <b>⭐ Star this repo if you found it helpful!</b>
</p>

<p align="center">
  <a href="https://loadcheck.vercel.app">Try LoadCheck Now →</a>
</p>
