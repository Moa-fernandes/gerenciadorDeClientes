const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'facilita',
  password: 'moamoamoa',
  port: 5432,
});



const calculateOptimizedRoute = async () => {
  const result = await pool.query('SELECT * FROM clientes WHERE coordenada_x IS NOT NULL AND coordenada_y IS NOT NULL ORDER BY id');
  return result.rows;
};

app.get('/rota-otimizada', async (req, res) => {
  const clientes = await calculateOptimizedRoute();
  res.json(clientes);
});

app.get('/clientes', async (req, res) => {
  const result = await pool.query('SELECT * FROM clientes');
  res.json(result.rows);
});

app.post('/clientes', async (req, res) => {
  try {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

    // Validação das coordenadas para garantir que sejam números válidos
    if (isNaN(coordenada_x) || isNaN(coordenada_y)) {
      return res.status(400).send('Coordenadas inválidas. Certifique-se de fornecer valores numéricos.');
    }

    await pool.query('INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, telefone, coordenada_x, coordenada_y]);

    res.send('Cliente cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
