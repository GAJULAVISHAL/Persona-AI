# 🧠 Persona AI

An AI-powered chat application that lets you have real conversations with AI personas modelled after popular Indian tech educators — **Hitesh Choudhary** and **Piyush Garg**. Each persona replicates the personality, tone, language style (Hinglish), and domain expertise of the real person.

---

## ✨ Features

- 🎭 **Dual Personas** — Chat with AI versions of Hitesh Choudhary or Piyush Garg
- 🧩 **Agentic Pipeline** — Backend uses a structured `INITIAL → THINK → ANALYSE → OUTPUT` reasoning pipeline
- 📺 **YouTube Tool** — Automatically searches and returns relevant YouTube videos from each creator's channel
- 💬 **Hinglish Support** — Responds in Hindi + English just like the real educators
- 🌗 **Dark / Light Mode** — Theme toggle with system preference detection
- ⚡ **Streaming Responses** — Real-time streamed chat output

---

## 🗂️ Project Structure

```
persona/
├── FRONTEND/          # React + Vite + TypeScript + Tailwind CSS v4
│   ├── src/
│   │   ├── component/ # UI components (chat, personas, navbar, hero, etc.)
│   │   ├── pages/     # Home page & Chat page
│   │   ├── hooks/     # useTheme
│   │   └── assets/    # Persona images
│   └── index.html
│
├── backend/           # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/    # Environment config (dotenv)
│   │   ├── controllers/  # Chat controller
│   │   ├── routes/    # API routes
│   │   └── services/  # Agent service (OpenAI + pipeline)
│   └── tools/
│       ├── prompt-builder.ts  # Persona definitions & system prompt
│       └── tools.ts           # YouTube Data API v3 tool
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 19, Vite 8, TypeScript, Tailwind CSS v4 |
| Routing   | React Router DOM v7 |
| Icons     | Lucide React |
| Backend   | Node.js, Express 5, TypeScript |
| AI        | OpenAI API (GPT) |
| Tool      | YouTube Data API v3 (via Axios) |
| Dev       | tsx, ESLint, ts-node |

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- An **OpenAI API key**
- A **YouTube Data API v3** key

---

### 1. Clone the repository

```bash
git clone https://github.com/GAJULAVISHAL/Persona-AI.git
cd Persona-AI
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Start the backend dev server:

```bash
npm run dev
```

The server runs at `http://localhost:3000`.

---

### 3. Setup the Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

---

## 🔌 API Reference

### `POST /api/v1/chat`

Send a message to a persona.

**Request Body:**
```json
{
  "persona": "hitesh",
  "message": "Sir, what is a REST API?",
}
```

**Response:** Streamed JSON steps from the agent pipeline.

---

### `GET /api/v1/health`

Health check endpoint.

```json
{ "status": "ok" }
```

---

## 🎭 Available Personas

### Hitesh Choudhary (`hitesh`)
> *"Haan jii, ye ek bohot hi interesting sawal hai!"*

- 🍵 Tea-loving tech educator with a calm and friendly tone
- Director at Physics Wallah (ex), CTO at iNeuron (ex)
- Runs **Chai aur Code** — cohorts, LMS, tools
- Speaks in Hinglish, explains with real-life analogies

### Piyush Garg (`piyush`)
> *"Bhai, ATTENTION IS ALL YOU NEED!!"*

- Principal Software Engineer at Oraczen, 10+ years in tech
- Expert in System Design & AI, part of Chai aur Code
- Sharp, witty, technically deep, loves cross-questioning
- Rage-baits on Twitter for attention 😄

---

## 🔧 Agent Pipeline

Every chat message goes through a multi-step reasoning pipeline:

```
INITIAL → THINK → ANALYSE → [TOOL_REQUEST] → OUTPUT
```

| Step | Description |
|------|-------------|
| `INITIAL` | Understand what the user is asking |
| `THINK` | Break down the problem |
| `ANALYSE` | Verify the reasoning |
| `TOOL_REQUEST` | Call a tool (e.g., YouTube search) |
| `OUTPUT` | Final response in the persona's tone |

---

## 📦 Available Scripts

### Backend (`/backend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with `tsx` |
| `npm run build` | Compile TypeScript |
| `npm run typecheck` | Type-check without emitting |

### Frontend (`/FRONTEND`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

---

## 📄 License

ISC © [Vishal Gajula](https://github.com/GAJULAVISHAL)
