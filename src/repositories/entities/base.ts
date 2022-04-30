import { PrimaryGeneratedColumn } from "typeorm";

export class Base {
    /**@Attr */
    @PrimaryGeneratedColumn()
    id?: number;
}