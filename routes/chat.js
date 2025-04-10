// routes/chat.js
const express = require('express');
const router = express.Router();
const { askEva } = require('../services/eva');

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Mensaje requerido' });

  try {
    const response = await askEva(message);
    res.json({ response });
  } catch (error) {
    console.error('Error al consultar a Eva:', error);
    res.status(500).json({ error: 'Error al procesar la respuesta' });
  }
});

module.exports = router;
