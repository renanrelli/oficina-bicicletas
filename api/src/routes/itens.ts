import { NextFunction, Request, Response, Router } from "express";
import { ItensController } from "../controllers/ItensController";
import * as yup from "yup";
import { Item } from "../models/Item";
import { Not } from "typeorm";

async function validarPayload(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    valor: yup.number().required().positive(),
  });

  let payload = req.body;

  try {
    req.body = await schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    return next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: "Ops! Algo deu errado." });
  }
}

async function validarSeExiste(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let id = Number(req.params.id);
  let item: Item | null = await Item.findOneBy({ id });
  if (!item) {
    return res.status(422).json({ error: "Item não encontrado!" });
  }

  res.locals.item = item;

  return next();
}

async function validarSeNomeExiste(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let nome: string = req.body.nome;
  let id: number | undefined = req.params.id
    ? Number(req.params.id)
    : undefined;

  let item: Item | null = await Item.findOneBy({
    nome,
    id: id ? Not(id) : undefined,
  });
  if (item) {
    return res.status(422).json({ error: "Item já cadastrado!" });
  }

  return next();
}

let router: Router = Router();

let itensController: ItensController = new ItensController();

router.get("/itens", itensController.list);

router.get("/itens/:id", validarSeExiste, itensController.list);

router.post(
  "/itens",
  validarPayload,
  validarSeNomeExiste,
  itensController.create
);

router.put(
  "/itens/:id",
  validarSeExiste,
  validarPayload,
  validarSeNomeExiste,
  itensController.update
);

router.delete("/itens/:id", validarSeExiste, itensController.delete);

export default router;
