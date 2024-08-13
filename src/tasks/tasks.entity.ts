import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";

// used by TypeORM, not by the app
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Column decorater by TypeORM
  @Column({
    type: "text",
  })
  title: string;

  @Column({ 
    type: "varchar",
    length: 255
  })
  date: string;

  @Column({
    type: "longtext",
  })
  description: string;

  @Column({
    type: "enum",
    enum: Priority,
    default: Priority.normal
  })
  priority: Priority;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.completed
  })
  status: Status;
}
