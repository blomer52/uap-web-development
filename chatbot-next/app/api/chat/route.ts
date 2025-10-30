// app/api/chat/route.ts

import OpenAI from 'openai';
// ¡Importamos las herramientas de la v2!
import { OpenAIStream, StreamingTextResponse } from 'ai';

// 1. Inicializa el cliente de OpenAI apuntando a OpenRouter
const openrouter = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL, // De tu .env.local
  apiKey: process.env.OPENROUTER_API_KEY,   // De tu .env.local
});

// 2. Define la función POST
export async function POST(req: Request) {
  try {
    // 3. Extrae los 'messages' del cuerpo de la petición
    const { messages } = await req.json();

    // 4. Llama a la API de OpenRouter
    const response = await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-haiku',
      stream: true, // ¡Streaming!
      messages: messages,
    });

    // 5. Crea el stream de datos usando el Vercel AI SDK (v2)
    const stream = OpenAIStream(response as any);

    // 6. Responde al frontend con el stream (v2)
    return new StreamingTextResponse(stream);

  } catch (error) {
    // 7. Manejo de errores
    console.error("Error calling OpenRouter API:", error);
    return new Response('An error occurred while processing your request.', { status: 500 });
  }
}