import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Base } from "./base";
import { User } from "./users";


@Entity()
export class Image extends Base {

    /**@Attrs */
    @Column('varchar')
    url: string;

    /**@Relations */
    @OneToOne(type => User, user => user.image)
    user?: User;
}