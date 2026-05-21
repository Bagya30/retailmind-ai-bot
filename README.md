# RetailMind — AI-Powered Customer Care Bot

> Built for FlowZint AI Hackathon 2026 | Category: Customer Care Bot

RetailMind is an intelligent AI customer care assistant for e-commerce businesses, powered by the Claude API.

## Features

- Real-time AI responses powered by Claude (claude-sonnet-4)
- Order tracking with mock order database
- Returns and refund assistance
- Sentiment detection (Happy / Neutral / Frustrated)
- Smart escalation to human agent when needed
- Multi-turn conversation memory
- Clean, responsive chat UI

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (Vercel Serverless Functions)
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Deployment:** Vercel

## Project Structure

```
retailmind/
├── public/
│   └── index.html      # Frontend chat UI
├── api/
│   └── chat.js         # Serverless API route
├── vercel.json         # Vercel config
├── package.json
└── README.md
```

## Deployment on Vercel

1. Fork or clone this repository
2. Go to [vercel.com](https://vercel.com) and import this repo
3. Add environment variable: `ANTHROPIC_API_KEY = your_key_here`
4. Click Deploy

## Demo

Try asking:
- "Track my order #12345"
- "I want to return my product"
- "What is your refund policy?"
- "My order arrived damaged"

## Built By

Bagyalakshmi J — FlowZint AI Hackathon 2026
