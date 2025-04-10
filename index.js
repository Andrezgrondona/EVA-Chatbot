// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoute = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/chat', chatRoute);

app.get('/', (req, res) => {
  res.send('Eva está en línea 🧠✨');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


//node index.js