import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import chatRouter from './routes/chat.routes.js';

const PORT = Number(env.PORT ?? 3000)

// Strip trailing slashes — browsers send Origin without one, so a mismatch causes CORS failures.
// Also supports multiple comma-separated origins: "https://a.com,https://b.com"
const rawOrigins = (env.FRONTEND_URL ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''));
const FRONTEND_URL = rawOrigins.length === 1 ? rawOrigins[0] : rawOrigins;

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.use('/api/v1/', chatRouter);

app.get('/api/v1/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`   CORS allowed for ${FRONTEND_URL}`);
    console.log(`   POST http://localhost:${PORT}/api/v1/chat`);
});
