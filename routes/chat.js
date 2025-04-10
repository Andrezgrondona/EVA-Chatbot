// import express from "express";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": "https://tusitio.com", // opcional, puedes poner tu dominio aquí
//         "X-Title": "Eva Chatbot"
//       },
//       body: JSON.stringify({
//         model: "mistralai/mistral-7b-instruct", // puedes cambiar el modelo
//         messages: [
//           {
//             role: "user",
//             content: message,
//           },
//         ],
//       }),
//     });

//     const data = await response.json();
//     const reply = data.choices?.[0]?.message?.content || "No se pudo obtener una respuesta.";

//     res.json({ response: reply });
//   } catch (error) {
//     console.error("Error al comunicarse con OpenRouter:", error);
//     res.status(500).json({ error: "Error interno al consultar el modelo." });
//   }
// });

// export default router;
import express from 'express';
import { askEva } from '../services/eva.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje no proporcionado.' });
  }

  try {
    const reply = await askEva(message);
    const truncatedReply = reply.length > 80 ? reply.substring(0, 77) + '...' : reply;
    res.json({ response: truncatedReply });
  } catch (error) {
    console.error('Error al procesar el mensaje:', error);
    res.status(500).json({ error: 'Error interno al generar la respuesta.' });
  }
});

export default router;
