# 🔍 GitHub Profile Fetcher

A professional, production-grade frontend utility that allows users to search GitHub profiles by **name or username**, get **real-time suggestions**, and view complete profile details using the **GitHub REST API**.

This project focuses on **real-world UX patterns**, **API efficiency**, and **clean vanilla JavaScript architecture**.

---

## 🌐 Live Demo

👉 **Hosted Link:**  
https://akhilbharti510.github.io/GitHub-Profile-Fetcher/  
👉 [Click Here](https://akhilbharti510.github.io/GitHub-Profile-Fetcher/)

---


---

## ✨ Features

- 🔍 Search GitHub users by **name or username**
- 💡 **Real-time suggestions** using GitHub Search API
- ⏳ **Debounced input** to minimize API calls
- ⌨️ **Keyboard navigation** (↑ ↓ Enter)
- 🖱️ Click-outside detection to close suggestions
- 🎯 Highlighted matched text in suggestions
- 🧠 **In-memory caching** for faster repeat searches
- ⚠️ Graceful handling of API errors & rate limits
- 👤 Fetch and display full GitHub profile details
- 📱 Clean, responsive, and accessible UI

---

## 🛠️ Tech Stack

- **HTML5** – Semantic structure
- **CSS3** – Modern, responsive styling
- **Vanilla JavaScript (ES6+)**
  - Fetch API
  - Async / Await
  - DOM Manipulation
  - Debouncing & Caching
- **GitHub REST API**

---


---

## ⚙️ How It Works

1. User types a **name or username**
2. App calls **GitHub Search API** with debounce
3. Matching users are shown as suggestions
4. User selects a profile (mouse or keyboard)
5. App fetches exact profile data using **Users API**
6. Profile details are rendered dynamically

---

## 🧠 Key Learnings

- Implementing **real-world search UX patterns**
- Managing **API rate limits** responsibly
- Improving performance using **debounce & caching**
- Keyboard accessibility & focus management
- Writing clean, maintainable vanilla JavaScript
- Structuring frontend projects professionally

---

## 🚀 Getting Started (Local Setup)

1. Clone the repository
```bash
git clone https://github.com/your-username/github-profile-fetcher.git


2. Open the project folder

cd github-profile-fetcher


3. Open index.html in your browser
(No build tools required)



