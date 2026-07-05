import type { Request, Response } from 'express';
import { PERSONAS } from '../../tools/prompt-builder.js';
import { runAgent } from '../services/agent.service.js';

export interface ChatRequestBody {
    persona: string;
    query: string;
}

/**
 * POST /api/v1/chat
 *
 * Streams agent steps back as Server-Sent Events (SSE).
 *
 * Each event has the shape:
 *   data: { "step": "INITIAL" | "THINK" | "ANALYSE" | "TOOL_REQUEST" | "OUTPUT", "text": "..." }
 *
 * The final event sent by the server is:
 *   data: [DONE]
 *
 * Step rendering guide for the frontend:
 *   - INITIAL / THINK / ANALYSE / TOOL_REQUEST  → show as animated "thinking" text
 *   - OUTPUT                                    → render the final response in full
 */
export async function chatController(req: Request, res: Response): Promise<void> {
    const { persona, query } = req.body as ChatRequestBody;

    // ── Validation ─────────────────────────────────────────────
    if (!persona || typeof persona !== 'string') {
        res.status(400).json({ success: false, error: 'Missing or invalid "persona" field.' });
        return;
    }
    if (!query || typeof query !== 'string') {
        res.status(400).json({ success: false, error: 'Missing or invalid "query" field.' });
        return;
    }
    const validPersonas = Object.keys(PERSONAS);
    if (!validPersonas.includes(persona)) {
        res.status(400).json({
            success: false,
            error: `Unknown persona "${persona}". Valid options: ${validPersonas.join(', ')}.`,
        });
        return;
    }

    // ── SSE headers ────────────────────────────────────────────
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();                // flush immediately so the client starts receiving

    const sendEvent = (data: object | string): void => {
        res.write(`data: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`);
    };

    try {
        console.log(`\n🤖 [${persona}] responding to: "${query}"\n`);

        await runAgent(persona, query, (step) => {
            // Each step is streamed as an SSE event the moment it's ready
            sendEvent({ step: step.step, text: step.text });
        });

        // Signal that the stream is finished
        sendEvent('[DONE]');
    } catch (err) {
        const error = err as Error;
        console.error('Agent error:', error.message);
        sendEvent({ error: 'Internal server error while running agent.' });
    } finally {
        res.end();
    }
}
