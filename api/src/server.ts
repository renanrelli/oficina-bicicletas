import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

let server: Express = express();
let port: number = Number(process.env.SERVER_PORT || 3000);

server.use(cors());
server.use(express.json());

server.get("/teste", async (req, res) => {
  res.send("Olá");
});

export default {
  start() {
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  },
};
