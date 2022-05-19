require("dotenv").config();

import express from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import "./database";

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.express.use(routes);
  }

  start() {
    const port = process.env.PORT;

    console.log(`Starting server on port ${port}`);

    this.express.listen(port, () => {
      console.log(`Server is running! http://localhost:${port}`);
    });
  }

  async init() {
    console.log("Iniciando servidor");
    this.start();
  }

  async finish() {
    console.log("Servidor finalizado com sucesso");
  }
}

export default App;
