import { Cliente } from "../models/Cliente";
import { Request, Response } from "express";
import { ILike } from "typeorm";

export class ClientesController {
  async list(req: Request, res: Response) {
    let id: number = Number(req.query.id);

    let users: Cliente[] = await Cliente.findBy({
      id: id ? id : undefined,
    });
    return res.status(200).json(users);
  }

  async create(req: Request, res: Response) {
    let body = req.body;

    let cliente: Cliente = await Cliente.create({
      nome: body.nome,
      email: body.email,
      cpf: body.cpf,
      data_nascimento: body.data_nascimento,
      endereco: body.endereco,
    }).save();

    return res.status(200).json(cliente);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let cliente = res.locals.cliente;
    return res.status(200).json(cliente);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let cliente: Cliente = res.locals.cliente;

    (cliente.nome = body.nome),
      (cliente.email = body.email),
      (cliente.cpf = body.cpf),
      (cliente.data_nascimento = body.data_nascimento),
      (cliente.endereco = body.endereco),
      await cliente.save();

    return res.status(200).json(cliente);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let cliente: Cliente = res.locals.cliente;

    await cliente.remove();

    return res.status(200).json();
  }
}
