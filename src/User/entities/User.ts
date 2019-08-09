import { Entity, PrimaryKey, Property, IEntity } from "mikro-orm";


@Entity()
export class User {
    @PrimaryKey()
    id: string;

    @Property()
    name: string;

    @Property()
    username: string;

    @Property({default: () => new Date()})
    createdAt: Date = new Date()

    @Property({onUpdate: () => new Date()})
    updatedAt: Date = new Date()

    constructor(data: Partial<User>) {
        Object.assign(this, data)
    }
}

export interface User extends IEntity {}
