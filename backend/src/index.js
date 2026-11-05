const express = require('express');
const cors = require('cors');
require('dotenv').config();

const busRoutes = require('./routes/busRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas de buses
app.use('/api', busRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Empresa de Buses funcionando correctamente (Contexto Ecuador)' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});