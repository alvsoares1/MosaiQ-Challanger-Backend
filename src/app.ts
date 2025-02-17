import "reflect-metadata";
import express from 'express';
import { AppDataSource } from './config/database';
import taskRoutes from './routes/taskRoutes'; 
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./config/swagger";

const app = express();

const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados", error);
    process.exit(1); 
  }
};

const startServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

app.use(express.json());
app.use("/api", taskRoutes);
app.use("/api", authRoutes);

setupSwagger(app);

initializeDatabase().then(startServer);
