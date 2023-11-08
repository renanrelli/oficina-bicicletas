import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import bcrypt from "bcrypt";

export class AutenticacaoController {
  async login(req: Request, res: Response): Promise<Response> {
    let { email, senha } = req.body;

    let usuario: Usuario | null = await Usuario.findOne({
      where: {
        email: email,
      },
      select: ["id", "email", "senha", "nome"],
    });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Usuário e/ou senha inválidos" });
    }
    let resultado = await bcrypt.compare(senha, usuario.senha);

    if (!resultado) {
      return res
        .status(401)
        .json({ mensagem: "Usuário  e/ou senha inválidos" });
    }

    let token: string = Buffer.from(`${email}:${senha}`).toString("base64");

    return res.status(200).json({
      token,
      type: "Basic",
      nome: usuario.nome,
    });
  }
}
