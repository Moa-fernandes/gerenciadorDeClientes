CREATE TABLE public.clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  coordenada_x FLOAT,
  coordenada_y FLOAT
);
