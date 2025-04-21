import express from "express";
import { askEva } from "../services/eva.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, lang } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensaje no proporcionado." });
  }

  try {
    const reply = await askEva(message, lang || "es");
    //const reply = await askEva(message);
    const maxLength = 300;
    let finalReply = reply;

    if (reply.length > maxLength) {
      const sentences = reply.match(/[^.!?]+[.!?]/g);
      let truncated = "";

      for (const sentence of sentences) {
        if ((truncated + sentence).length <= maxLength) {
          truncated += sentence.trim() + " ";
        } else {
          break;
        }
      }

      finalReply = truncated.trim();
    }

    res.json({ response: finalReply });
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
    res.status(500).json({ error: "Error interno al generar la respuesta." });
  }
});

export default router;
