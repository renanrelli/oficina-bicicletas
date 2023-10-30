import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ordem } from "./Ordem";
import { Item } from "./Item";

@Entity("itens")
export class Ordens_Itens extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public qtdade: string;

  @Column({
    type: "numeric",
    precision: 7,
    scale: 2,
  })
  public valor: number;

  @Column()
  public idOrdem: number;

  @Column()
  public idItem: number;

  @ManyToOne(() => Ordem, (ordem) => ordem.ordens_itens, { eager: true })
  @JoinColumn({ name: "idOrdem" })
  public ordem: Ordem;

  @ManyToOne(() => Item, (item) => item.ordens_itens, { eager: true })
  @JoinColumn({ name: "idItem" })
  public item: Item;
}
