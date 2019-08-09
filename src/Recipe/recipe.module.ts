import { Module } from '@nestjs/common';
import { MikroOrmModule } from "nestjs-mikro-orm";
import { Recipe } from './entities/Recipe';
import { RecipeService } from './recipe.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({entities: [Recipe]})
  ],
  providers: [RecipeService],
  exports: [RecipeService]
})
export class RecipeModule {}
