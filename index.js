import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola desde EVA!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
