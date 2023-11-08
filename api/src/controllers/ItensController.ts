import { Item } from "../models/Item";
import { Request, Response } from "express";
import { ILike } from "typeorm";

export class ItensController {
  async list(req: Request, res: Response) {
    let nome = req.query.nome;

    let users: Item[] = await Item.findBy({
      nome: nome ? ILike(`${nome}`) : undefined,
    });
    return res.status(200).json(users);
  }

  async create(req: Request, res: Response) {
    let body = req.body;

    let item: Item = await Item.create({
      nome: body.nome,
      valor: body.valor,
    }).save();

    return res.status(200).json(item);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let item = res.locals.item;
    return res.status(200).json(item);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let item: Item = res.locals.item;

    (item.nome = body.nome), (item.valor = body.valor);
    await item.save();

    return res.status(200).json(item);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let item: Item = res.locals.item;

    await item.remove();

    return res.status(200).json();
  }
}
