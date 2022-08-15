import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("specifications")
class Specification {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at?: Date;

  /*
  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;
  */

  constructor(name: string, description: string) {
    if (!this.id) {
      this.id = uuidv4();
    }
    this.name = name;
    this.description = description;
    if (!this.created_at) {
      this.created_at = new Date();
    } else {
      this.updated_at = new Date();
    }
  }
}

export { Specification };
