# Desafio Fullstack Hubbi

##  Funcionalidades Principais

- Criação de usuários;
- Autenticação de usuários;
- Crud de Tasks;

## Tecnologias Utilizadas

**Frontend:**
- React.js
- TypeScript
- Vite
- Axios
- React Router DOM

**Backend:**
- Node.js

- Express.js

- TypeScript

- JWT

- Tsyringe

- TypeORM

- Swagger

- Bcrypt

- PostgreSQL


## Configuração do banco de dados

1. **Criar banco de dados:**

    Conecte-se ao PostgreSQL e crie um banco de dados:

    CREATE DATABASE nome_do_banco;


2. Configurar bando de dados no projeto:

    Configurar no arquivo `database.ts`

            type: "postgres",

                host: "localhost",

                 port: 5432,

                 username: "root", 
            
                password: "sa", 

                 database: "todolist"


3. Scripts das tabelas:

    CREATE TABLE User (

    id INTEGER PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(100) NOT NULL
);  

    CREATE TABLE Task (

    id INTEGER PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    status VARCHAR(100),

createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
## Como executar o projeto

1. **Instale as dependências:**
    ```bash
    npm install
    ```

2. **Inicie a aplicação back-end:**

    ```bash
   npm run dev
    ```

3. **Inicie a aplicação front-end:**

    ```bash
    npm run dev
    ```



