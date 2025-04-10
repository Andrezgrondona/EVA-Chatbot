import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // ¡Importante para recibir JSON!

app.post('/chat', (req, res) => {
  const { message } = req.body;

  // Aquí va tu lógica de IA o respuesta del bot
  if (!message) {
    return res.status(400).json({ error: 'Mensaje vacío' });
  }

  // Respuesta básica por ahora
  res.json({
    reply: `Recibí tu mensaje: "${message}". Pronto te responderé como EVA 🤖.`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
