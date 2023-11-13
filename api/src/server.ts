import express, { Express } from "express";
import cors from "cors";
import { basicAuth } from "./middlewares/basic-auth";
import autenticacaoRoutes from "./routes/autenticacao";
import usuariosRoutes from "./routes/usuarios";
import clientesRoutes from "./routes/clientes";
import itensRoutes from "./routes/itens";

let server: Express = express();
let port: number = Number(process.env.SERVER_PORT || 3333);

server.use(cors());
server.use(express.json());

server.use(autenticacaoRoutes);
server.use(basicAuth, usuariosRoutes);
server.use(basicAuth, clientesRoutes);
server.use(basicAuth, itensRoutes);

export default {
  start() {
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  },
};
