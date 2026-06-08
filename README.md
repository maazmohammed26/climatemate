# CarbonMate AI

CarbonMate AI is an AI-powered carbon footprint awareness platform that helps individuals understand, track, and reduce their daily carbon emissions through simple activity logging, visual analytics, eco scores, AI-powered insights, and personalized sustainability challenges.

---

## Live Demo

Deployed Link:
`Add your deployed link here`

GitHub Repository:
`Add your GitHub repository link here`

LinkedIn Build Post:
`Add your LinkedIn post link here`

---

## Demo Login Credentials

Use the demo account to explore the platform instantly.

```txt
Email: demo@carbonmate.app
Password: Demo@123
```

You can also click:

```txt
Continue with Demo Account
```

on the login page.

---

## Problem Statement

Most people care about climate change, but they do not clearly understand how their daily habits contribute to carbon emissions. Existing carbon calculators are often complex, static, and not engaging enough for regular use.

CarbonMate AI solves this by making carbon footprint tracking simple, visual, personalized, and actionable.

---

## Solution

CarbonMate AI allows users to log daily activities such as travel, food, electricity, shopping, and waste. The app calculates estimated CO₂ emissions using predefined emission factors and provides personalized insights using AI.

Users can view dashboards, track progress, complete eco challenges, and simulate alternative lifestyle choices to reduce their environmental impact.

---

## Key Features

* Demo login for judges
* Real user activity tracking
* Carbon footprint calculator
* Daily, weekly, and monthly CO₂ dashboard
* Category-wise carbon analytics
* Eco score
* AI Eco Coach
* AI weekly carbon report
* AI challenge generator
* What-if simulator
* Eco challenges
* Glassmorphism UI
* Hidden scrollbar
* Fully responsive design
* Hackathon-ready public deployment

---

## AI Features

CarbonMate AI uses a public no-key AI endpoint:

```txt
POST https://mlvoca.com/api/generate
```

Default model:

```txt
tinyllama
```

Optional reasoning model:

```txt
deepseek-r1:1.5b
```

AI is used for:

1. Personalized carbon reduction tips
2. Weekly carbon report
3. Eco challenge generation
4. Friendly carbon summary explanation

Important:

Carbon calculation is not performed by AI. The app calculates CO₂ using fixed emission factors to keep results consistent and reliable.

---

## Tech Stack

| Layer           | Technology                         |
| --------------- | ---------------------------------- |
| Frontend        | React + Vite (TanStack Start)      |
| Styling         | Tailwind CSS                       |
| Charts          | Recharts                           |
| AI              | Public AI API                      |
| Storage         | LocalStorage / Zustand             |
| Deployment      | Vercel / Cloudflare                |
| Version Control | GitHub                             |

---

## Carbon Calculation Logic

The app calculates carbon emissions using this formula:

```txt
CO₂ = Quantity × Emission Factor
```

Example:

```txt
Car travel = 10 km × 0.192 = 1.92 kg CO₂
```

---

## Emission Factors

| Category    | Activity          | Emission Factor  |
| ----------- | ----------------- | ---------------- |
| Transport   | Car               | 0.192 kg CO₂/km  |
| Transport   | Bike/Scooter      | 0.103 kg CO₂/km  |
| Transport   | Bus               | 0.089 kg CO₂/km  |
| Transport   | Metro/Train       | 0.041 kg CO₂/km  |
| Transport   | Walk/Cycle        | 0 kg CO₂/km      |
| Transport   | Flight            | 0.255 kg CO₂/km  |
| Food        | Veg Meal          | 1.5 kg CO₂/meal  |
| Food        | Non-Veg Meal      | 5.0 kg CO₂/meal  |
| Food        | Dairy Item        | 1.9 kg CO₂/item  |
| Electricity | Electricity Usage | 0.82 kg CO₂/kWh  |
| Shopping    | Online Order      | 2.0 kg CO₂/order |
| Shopping    | Clothing Item     | 6.5 kg CO₂/item  |
| Waste       | Plastic Waste     | 6.0 kg CO₂/kg    |
| Waste       | Food Waste        | 2.5 kg CO₂/kg    |
| Waste       | Recycled Waste    | -1.0 kg CO₂/kg   |

---

## Demo Data

The demo account includes sample data for:

* Car travel
* Metro travel
* Veg meals
* Non-veg meals
* Electricity usage
* Online shopping
* Plastic waste
* Eco score
* AI insights
* Eco challenges

This helps judges quickly verify the working flow.

---

## Main Pages

1. Landing Page
2. Login Page
3. Dashboard
4. Add Activity
5. AI Eco Coach
6. What-If Simulator
7. Challenges
8. Profile

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/carbonmate-ai.git
```

Go to the project folder:

```bash
cd carbonmate-ai
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Environment Variables

This project uses a public AI API that does not require an API key.

---

## Safety Rules

* Do not send passwords or private information to AI.
* Do not expose API keys in frontend code.
* Do not rely on AI for carbon calculations.
* Validate AI output before displaying.
* Show fallback tips if AI service fails.
* Keep calculations inside app logic.

---

## Judge Testing Flow

1. Open the deployed link.
2. Click “Continue with Demo Account.”
3. View dashboard with sample carbon data.
4. Add a new activity.
5. Check updated CO₂ values.
6. Open AI Eco Coach.
7. Generate personalized AI tips.
8. Try the what-if simulator.
9. Complete one eco challenge.
10. View eco score and dashboard update.

---

## Future Improvements

* Firebase authentication
* Cloud database sync
* Monthly PDF carbon report
* Community leaderboard
* Organization dashboard
* College sustainability campaigns
* Carbon reduction streaks
* PWA offline support
* LinkedIn share card
* Multi-language support

---

## Final Pitch

CarbonMate AI is a modern, AI-powered carbon footprint awareness platform that helps users understand their environmental impact and take simple actions to reduce it.

By combining carbon tracking, visual analytics, AI insights, eco scores, challenges, and a premium glassmorphism UI, CarbonMate AI makes sustainability simple, engaging, and practical for everyday users.

---

## Author

Built by Mohammed Maaz A for PromptWars Virtual Main Challenge 3.
