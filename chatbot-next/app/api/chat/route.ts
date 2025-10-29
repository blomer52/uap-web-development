// 1. Importa las herramientas de la v3 de ai
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'nodejs'; // Opcional: Configurar para que siempre se ejecute en el servidor de Node.js
// export const dynamic = 'force-dynamic'; // Opcional: Forzar a que sea dinámico

// 2. Crea una instancia del cliente OpenAI apuntando a OpenRouter
// El SDK es inteligente y leerá las variables de entorno por nosotros
const openrouter = createOpenAI({
  // Usamos las variables de entorno que ya definimos en .env.local
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

// 3. Define el modelo que usaremos
const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-3-haiku';

// 4. Define la función POST
export async function POST(req: Request) {
  try {
    // 5. Extrae los 'messages' del cuerpo de la petición
    const { messages } = await req.json();

    // 6. Llama a la API de IA usando 'streamText' (¡la nueva forma!)
    const result = await streamText({
      // 7. Pasa la instancia del cliente y el modelo
      model: openrouter(model), // Usamos 'openrouter' como función y le pasamos el string del modelo
      
      // 8. Pasa el historial de mensajes
      messages: messages,
    });

    // 9. Responde con el stream de texto
    // ¡Esto reemplaza a OpenAIStream y StreamingTextResponse!
    return result.toTextStreamResponse();

  } catch (error) {
    // 10. Manejo de errores
    console.error("Error calling OpenRouter API:", error);
    return new Response('An error occurred while processing your request.', { status: 500 });
  }
}