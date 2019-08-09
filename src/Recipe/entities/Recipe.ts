import { Entity, PrimaryKey, Property, ManyToOne, IEntity } from "mikro-orm";
import { User } from "../../User/entities/User";

@Entity()
export class Recipe {
    @PrimaryKey()
    id: string;

    @Property()
    name: string;

    @Property()
    description: string;

    @ManyToOne()
    author: User;

    @Property()
    createdAt: Date = new Date()

    @Property({onUpdate: () => new Date()})
    updatedAt: Date = new Date()

    constructor(data: Partial<Recipe>) {
        Object.assign(this, data)
    }
}


export interface Recipe extends IEntity {}
