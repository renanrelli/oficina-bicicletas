import { CONNREFUSED } from "dns";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ordem } from "./Ordem";

@Entity("clientes")
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column({ select: false })
  public senha: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public cpf: string;

  @Column({
    type: "date",
  })
  public data_nascimento: Date;

  @Column()
  public endereco: string;

  @OneToMany(() => Ordem, (ordem) => ordem.cliente)
  public ordem: Promise<Ordem[]>;
}
