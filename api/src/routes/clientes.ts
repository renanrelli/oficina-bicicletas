import { NextFunction, Request, Response, Router } from "express";
import { ClientesController } from "../controllers/ClientesController";
import * as yup from "yup";
import { Cliente } from "../models/Cliente";
import { Not } from "typeorm";

async function validarPayload(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    email: yup.string().email().required(),
    cpf: yup.string().min(10),
    endereco: yup.string().min(10),
    data_nascimento: yup.date().required(),
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
  let cliente: Cliente | null = await Cliente.findOneBy({ id });
  if (!cliente) {
    return res.status(422).json({ error: "Cliente não encontrado!" });
  }

  res.locals.cliente = cliente;

  return next();
}

async function validarSeEmailExiste(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let email: string = req.body.email;
  let id: number | undefined = req.params.id
    ? Number(req.params.id)
    : undefined;

  let cliente: Cliente | null = await Cliente.findOneBy({
    email,
    id: id ? Not(id) : undefined,
  });
  if (cliente) {
    return res.status(422).json({ error: "Email já cadastrado!" });
  }

  return next();
}

let router: Router = Router();

let clientesController: ClientesController = new ClientesController();

router.get("/clientes", clientesController.list);

router.get("/clientes/:id", validarSeExiste, clientesController.list);

router.post(
  "/clientes",
  validarPayload,
  validarSeEmailExiste,
  clientesController.create
);

router.put(
  "/clientes/:id",
  validarSeExiste,
  validarPayload,
  validarSeEmailExiste,
  clientesController.update
);

router.delete("/clientes/:id", validarSeExiste, clientesController.delete);

export default router;
