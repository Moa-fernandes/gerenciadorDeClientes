# Sistema de Gerenciamento de Clientes

Este é um projeto de sistema de gerenciamento de clientes, desenvolvido utilizando React para o frontend, Node.js com Express para o backend e PostgreSQL como banco de dados.

## Configuração do Banco de Dados PostgreSQL

1. Instale o PostgreSQL no seu sistema.

2. Crie um banco de dados chamado `facilita`.

3. Execute o seguinte script SQL para criar a tabela `clientes`:

   ```sql
   CREATE TABLE public.clientes (
     id SERIAL PRIMARY KEY,
     nome VARCHAR(255),
     email VARCHAR(255),
     telefone VARCHAR(20),
     coordenada_x FLOAT,
     coordenada_y FLOAT
   );

Configuração do Projeto:

1. Clone o repositório: git clone https://github.com/Moa-fernandes/gerenciadorDeClientes.git
                     > cd gerenciadorDeClientes

2. Instale as dependências do backend:  > cd backend
                                        > npm install

3. Configure as variáveis de ambiente no arquivo .env na pasta backend:
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=facilita

4. Execute o backend: node server.js

5. Instale as dependências do frontend: > cd frontend
                                        > npm install

6. Execute o frontend: npm start

7. Clonar o Repositório:git clone https://github.com/Moa-fernandes/gerenciadorDeClientes.git 
 > cd gerenciadorDeClientes 

8. Adicionar Repositório Remoto: git remote add origin https://github.com/Moa-fernandes/gerenciadorDeClientes.git 

9. Adicionar Alterações e Realizar Commit: git add . > git commit -m "Mensagem do commit" 

10. Enviar Alterações para o GitHub: git push -u origin master

11.  Lembre-se de substituir os valores de usuário, senha e outras informações específicas pelos seus próprios. Este README serve como um guia básico; sinta-se à vontade para expandi-lo conforme necessário.

2024 ©Moa Fernandes. Todos os direitos reservados.
