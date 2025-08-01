# 🙌 Contributing to Flavor AI

Welcome, and thank you for showing interest in contributing to **Flavor AI** — your AI-powered culinary companion! Whether you're here to report bugs, suggest features, write documentation, or contribute code, we're happy to have you 💖

---

## 📌 Why This Guide Exists

This `CONTRIBUTING.md` file is here to make your onboarding experience smoother and more efficient. It provides a roadmap for how to:
- Understand the tech stack
- Set up the project locally
- Submit quality Pull Requests (PRs)
- Follow best practices

Following these steps helps us **reduce confusion**, **boost collaboration**, and **maintain consistent code quality**.

---

## ⚙️ Prerequisites & Tech Stack Overview

### 📦 Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- **AI Integration**: OpenAI / Groq API
- **Hosting**: Vercel
- **Backend**: Custom API endpoints within the Next.js framework

Ensure you have the following installed:
- **Node.js** (v18 or later)
- **npm** or **yarn**
- A GitHub account to fork and clone the repository

---

## 🧑‍💻 Project Setup

1. **Fork the Repository**  
   Click on the top-right "Fork" button to create your own copy of this repo.

2. **Clone the Repo Locally**
   ```bash
   git clone https://github.com/your-github-username/flavor-ai.git
   cd flavor-ai
   ```

3. **Set Up Environment Variables**
   Rename `.env.sample` to `.env.local` and insert your API keys:
   ```env
   GROQ_API_KEY=your_api_key_here
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

6. **Open the App in Browser**  
   Navigate to [http://localhost:3000](http://localhost:3000) and you're good to go!

---

## 🔁 How to Contribute

### 🐞 Report Issues
- Go to the [Issues](https://github.com/Ayushjhawar8/Flavor-ai/issues) tab
- Search for existing issues before creating a new one
- Include screenshots, logs, and steps to reproduce if possible

### 🛠 Suggest Enhancements
- Propose new features or improvements through a well-defined issue
- Provide examples if available

### 👩‍💻 Submit a Pull Request

1. **Create a New Branch**
   ```bash
   git checkout -b your-feature-name
   ```

2. **Make Your Changes**

3. **Commit Your Work**
   ```bash
   git add .
   git commit -m "Add: Your descriptive commit message"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin your-feature-name
   ```

5. **Open a Pull Request**
   - Go to your forked repo
   - Click **"Compare & pull request"**
   - Add a meaningful PR description: What, Why, How
   - Link related issues (e.g., “Closes #12”)

---

## 🧭 Best Practices

- ✅ Keep your code clean and readable
- ✅ Follow the existing **folder structure** and **naming conventions**
- ✅ Test your changes before committing
- ✅ Be respectful in comments and PR discussions
- ✅ Don’t commit sensitive info (API keys, `.env` files)

---

## 🤝 Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). Please take a moment to review it before participating.

---

## 🆘 Need Help?

If you're stuck:
- Open an issue describing the problem
- Tag the maintainers in comments for guidance

---

Thank you for contributing to **Flavor AI** 🌟  
We can't wait to see what you build! 🍽️✨
