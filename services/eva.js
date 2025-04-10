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