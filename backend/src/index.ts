import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import chatRouter from './routes/chat.routes.js';

const PORT = Number(env.PORT ?? 3000)
const FRONTEND_URL = env.FRONTEND_URL ?? 'http://localhost:5173'

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
