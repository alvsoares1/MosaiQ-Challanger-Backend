import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root", 
    password: "sa", 
    database: "todolist", 
    synchronize: true, 
    logging: false, 
    entities: ["src/entities/*.ts"],
  });
  
