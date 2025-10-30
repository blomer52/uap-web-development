// app/page.tsx

"use client";

// 1. Importar el hook de la v2
import { useChat } from 'ai/react';

export default function Chat() {

  // 2. ¡Este código AHORA SÍ va a funcionar!
  // Los tipos de la v2 SÍ tienen 'input', 'handleSubmit', 'isLoading'
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();

  return (
    <main className="flex flex-col w-full max-w-2xl mx-auto h-screen p-4">

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-lg bg-gray-100">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center">
            Comienza una conversación.
          </div>
        )}

        {/* 3. ¡Este 'm.content' AHORA SÍ va a funcionar! */}
        {messages.map(m => (
          <div key={m.id} className={`mb-2 p-3 rounded-lg ${
            m.role === 'user' ? 'bg-blue-200 ml-auto' : 'bg-gray-200 mr-auto'
          }`}>
            <span className="font-bold">{m.role === 'user' ? 'Tú' : 'IA'}: </span>
            {m.content} 
          </div>
        ))}

        {/* 4. Usar 'isLoading' (el booleano simple) */}
        {isLoading && (
          <div className="text-gray-500 italic text-center mt-2">
            IA está escribiendo...
          </div>
        )}

        {error && (
           <div className="text-red-500 bg-red-100 p-3 rounded-lg mt-2">
             <strong>Error:</strong> {error.message || "Hubo un problema con la API."}
           </div>
        )}
      </div>

      {/* 5. Conectar el formulario al 'handleSubmit' del hook */}
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={input} 
          placeholder="Escribe tu mensaje..."
          onChange={handleInputChange} 
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isLoading || !input} // Dejamos la corrección de 'trim'
        >
          Enviar
        </button>
      </form>

    </main>
  );
}