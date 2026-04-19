# US Election NLP Project

This is a modern frontend-only web application built to simulate an NLP Sentiment Analysis pipeline for US Election text data.

It features a premium, dark-mode glassmorphism UI, interactive data visualizations, and realistic mock prediction logic suited for college-level viva presentations or hackathon demonstrations.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`
- **Icons**: [Lucide React](https://lucide.dev/)

## 🧠 Features

- **Mock NLP Prediction Engine**: Uses keyword-based heuristics ("good", "terrible", etc.) with weighted randomized probability to generate fake but realistic NLP sentiment (Positive, Negative, Neutral).
- **Interactive Data Visualization**: Animated Doughnut charts representing confidence distributions.
- **State-of-the-art UI**: Custom animated gradients, frosted glass panels, and smooth hover interactions.

## 🛠️ How to run locally

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone or download this repository.
3. Open a terminal in the project directory.
4. Install all dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000`.

## ☁️ How to deploy on Vercel

Vercel is the easiest and recommended platform for deploying Next.js applications.

1. Create a free account on [Vercel](https://vercel.com/).
2. Push your project code to a GitHub, GitLab, or Bitbucket repository.
3. On the Vercel dashboard, click **"Add New..." -> "Project"**.
4. Import your repository from Git.
5. Leave the default settings (Vercel automatically detects Next.js builds: `npm run build` and `npm run start`).
6. Click **Deploy**.
7. In under 2 minutes, Vercel will provide you with a live, shareable URL!

## 🎓 Note for College Viva
Since this project does *not* include a Python backend or API keys to keep the setup as simple as possible, remember to explain that the underlying machine learning logic is currently *simulated* on the frontend. If a professor demands real Python processing later, you can replace the `@/lib/mockPredict.ts` file with a real `fetch()` request pointing to a Flask/FastAPI server.
