import { Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Priority } from "../enums/Priority";
// import { Status } from "../enums/Status";

// used by TypeORM, not by the app
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
