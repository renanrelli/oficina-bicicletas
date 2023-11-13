import { Usuario } from "../models/Usuario";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export class UsuariosController {
  async list(req: Request, res: Response) {
    let id: number = Number(req.params.id);

    let users: Usuario[] = await Usuario.findBy({
      id: id ? id : undefined,
    });
    return res.status(200).json(users);
  }

  async create(req: Request, res: Response) {
    let body = req.body;

    let senha = await bcrypt.hash(body.senha, 10);

    let usuario: Usuario = await Usuario.create({
      nome: body.nome,
      email: body.email,
      senha: senha,
    }).save();

    let { senha: s, ...usuarioSemSenha } = usuario;

    return res.status(200).json(usuarioSemSenha);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let usuario: Usuario = res.locals.usuario;

    let senha = await bcrypt.hash(body.senha, 10);

    (usuario.nome = body.nome),
      (usuario.email = body.email),
      (usuario.senha = senha);
    await usuario.save();

    let { senha: s, ...usuarioSemSenha } = usuario;

    return res.status(200).json(usuarioSemSenha);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let usuario: Usuario = res.locals.usuario;
    await usuario.remove();

    return res.status(200).json();
  }
}
