import { Injectable } from "@nestjs/common";
import { InjectRepository } from "nestjs-mikro-orm";
import { Recipe } from "./entities/Recipe";
import { EntityRepository } from "mikro-orm";


@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepository: EntityRepository<Recipe>
    ){}

    async findOne(where: string | Partial<Recipe>) {
        return this.recipeRepository.findOne(where);
    }
    
    async find(where: string | Partial<Recipe>): Promise<Recipe[]> {
        return this.recipeRepository.find(where);
    }

    async create(data: Partial<Recipe>): Promise<Recipe> {
        const recipe = new Recipe(data)
        await this.recipeRepository.persist(recipe)
        return recipe;
    }
}