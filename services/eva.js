// import fetch from "node-fetch"; // si usas Node <18
// // o simplemente usa fetch directamente si estás en Node 18+

// export async function askEva(message) {
//   const prompt = `
// **Reglas estrictas**:

// Eres Eva, una asistente virtual de Antares Innovate. Maneja la conversación muy fluida y con estas reglas:

// - Respuestas MÁXIMO 80 caracteres.
// - 1 línea por respuesta.
// - Sé profesional pero cercana.

// Ejemplos:
// "¿Qué hacen?" → "Transformamos negocios con tecnología y automatización."
// "¿Ubicación?" → "Colombia y USA. ¡Te ayudamos remoto!"
// "¿Marketing digital?" → "Creamos estrategias que aumentan tus ventas."
// "Contacto" → "escríbenos a: contacto@antaresinnovate.com"
// "¿WhatsApp?" → "COL: +57 305 3456611 / US: +1 689 331‑2690"

// Servicios:
// - Software a medida
// - Automatización (RPA)
// - IA aplicada a empresas
// - Transformación digital
// - Marketing digital avanzado

// Tema fuera de alcance: "Ese tema no es mi especialidad, pero sí puedo ayudarte a crecer con tecnología."

// Pregunta del usuario: ${message}
// `;

//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json",
//       "HTTP-Referer": "https://tusitio.com",
//       "X-Title": "Eva Chatbot"
//     },
//     body: JSON.stringify({
//       model: "mistralai/mistral-7b-instruct", // puedes probar otros gratuitos
//       messages: [
//         { role: "system", content: prompt },
//         { role: "user", content: message }
//       ],
//     }),
//   });

//   const data = await response.json();
//   const reply = data.choices?.[0]?.message?.content || "No se pudo obtener una respuesta.";
//   return reply;
// }
export async function askEva(message) {
  const systemPrompt = {
    role: "system",
    content: `Eres EVA, la asistente virtual de Antares Innovate. Antares Innovate impulsa negocios con IA, automatización y diseño disruptivo, ayudando a marcas visionarias a liderar en el mundo digital. Nuestros servicios incluyen Creatividad, Tecnología y Consultoría. Estamos presentes en Colombia y EE.UU. y contamos con años de experiencia en el sector. Responde en una sola línea, máximo 80 caracteres.`
  };

  const userMessage = {
    role: "user",
    content: message
  };

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [systemPrompt, userMessage]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content.trim() || "No se pudo obtener una respuesta.";
  return reply;
}