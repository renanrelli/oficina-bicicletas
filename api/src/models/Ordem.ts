import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ordens_Itens } from "./Ordens_Itens";
import { Cliente } from "./Cliente";

@Entity("ordens")
export class Ordem extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: "date",
  })
  public data_recebimento: Date;

  @Column({
    type: "date",
    nullable: true,
  })
  public data_entrega: Date;

  @Column()
  public descricao: string;

  @Column({ type: "numeric", precision: 7, scale: 2 })
  public valor_total: number;

  @Column()
  public idCliente: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.ordem, { eager: true })
  @JoinColumn({ name: "idCliente" })
  public cliente: Cliente;

  @OneToMany(() => Ordens_Itens, (ordens_itens) => ordens_itens.ordem)
  public ordens_itens: Promise<Ordens_Itens[]>;
}
