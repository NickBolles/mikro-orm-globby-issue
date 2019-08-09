import { Injectable } from "@nestjs/common";
import { InjectRepository } from "nestjs-mikro-orm";
import { User } from "./entities/User";
import { EntityRepository } from "mikro-orm";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>
    ){}

    async find(where: Partial<User>): Promise<User[]> {
        return this.userRepository.find(where);
    }

    async create(data: Partial<User>): Promise<User> {
        const user = new User(data)
        await this.userRepository.persist(user)
        return user;
    }

    async findOrCreate(data: Partial<User>): Promise<User> {
        const users = await this.find(data);
        if (users && users.length) {
            return users[0];
        }

        return this.create(data);
    }
}