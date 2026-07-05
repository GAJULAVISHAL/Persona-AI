import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.js';
import { env } from '../config/env.js';
import { PERSONAS, buildSystemPrompt } from '../../tools/prompt-builder.js';
import { youtubeVideoForCourse } from '../../tools/tools.js';

const apiKey = env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY environment variable.');
}

const client = new OpenAI({
    apiKey,
});

export interface AgentStep {
    step: string;
    text: string;
    functionName?: string;
    input?: string;
}

export type StepCallback = (step: AgentStep) => void;

/**
 * Runs the full agent loop for a given persona and user query.
 * Calls `onStep` immediately each time a step is produced so the
 * caller can stream it to the client in real time.
 */
export async function runAgent(personaKey: string, prompt: string, onStep: StepCallback): Promise<void> {
    const persona = PERSONAS[personaKey] ?? PERSONAS.hitesh;
    const SYSTEM_PROMPT = buildSystemPrompt(personaKey);

    const Messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
    ];

    while (true) {
        const completion = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: Messages,
        });

        const result = completion.choices[0].message.content ?? '';
        const parsedResult: AgentStep = JSON.parse(result);
        Messages.push({ role: 'assistant', content: result });

        // ── Emit step immediately ──────────────────────────────
        onStep(parsedResult);

        console.log(`[${persona.name}] (${parsedResult.step}): ${parsedResult.text}`);

        if (parsedResult.step.toLowerCase() === 'output') break;

        if (parsedResult.step.toUpperCase() === 'TOOL_REQUEST') {
            const { functionName, input } = parsedResult;
            switch (functionName) {
                case 'youtubeVideoForCourse': {
                    const toolResult = await youtubeVideoForCourse(input ?? '', persona.youtubeChannelIds ?? []);
                    console.log(`  🔧 (tool) ${functionName}("${input}") →`, toolResult);
                    Messages.push({
                        role: 'developer',
                        content: JSON.stringify({ step: 'TOOL_OUTPUT', output: toolResult }),
                    });
                    break;
                }
                default:
                    console.log(`  ⚠️  Unknown tool: ${functionName}`);
            }
        }
    }
}
