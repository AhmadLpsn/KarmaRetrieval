import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./images";


@Entity()
export class User {

    /**@Attrs */
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('varchar', { unique: true })
    username: string;

    @Column('int', { default: 0 })
    karmaScore?: number;

    /**@Relations */
    @OneToOne(type => Image, Image => Image.user)
    @JoinColumn({ name: 'Image_id' })
    image?: Image;
}