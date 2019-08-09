import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './User/user.service';
import { RecipeService } from './Recipe/recipe.service';
import { Recipe } from './Recipe/entities/Recipe';

@Controller()
export class AppController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService, 
    @Inject(RecipeService)
    private readonly recipeService: RecipeService) {}

  @Get()
  getHello() {
    return "Hello World";
  }
  @Get("test")
  async getTest(): Promise<Recipe> {
    const user = await this.userService.findOrCreate({
      name: "Nick",
      username: "NickBolles"
    });

    const recipe = await this.recipeService.create({
      name: "My Recipe",
      author: user
    })

    return this.recipeService.findOne(recipe.id);
  }

}
