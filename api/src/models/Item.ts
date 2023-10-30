import { CONNREFUSED } from "dns";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ordens_Itens } from "./Ordens_Itens";

@Entity("itens")
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column({
    type: "numeric",
    precision: 7,
    scale: 2,
  })
  public valor: number;

  @OneToMany(() => Ordens_Itens, (ordens_itens) => ordens_itens.item)
  public ordens_itens: Promise<Ordens_Itens[]>;
}
