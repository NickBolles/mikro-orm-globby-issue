import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRepositoryToken } from 'nestjs-mikro-orm';
import { Recipe } from './Recipe/entities/Recipe';
import { EntityRepository } from 'mikro-orm';
import { RecipeService } from './Recipe/recipe.service';
import { UserService } from './User/user.service';
import { User } from './User/entities/User';
import { UserModule } from './User/user.module';
import { RecipeModule } from './Recipe/recipe.module';

const testRecipe = new Recipe({name: "foo", id: "123456789111"})
class MockRecipeService {
  async findOne(where: string | Partial<Recipe>): Promise<Recipe> {
    return testRecipe
  }  
  async find(where: string | Partial<Recipe>): Promise<Recipe[]> {
    return [testRecipe, new Recipe({name: "bar"})]
  }
  async create(data: Partial<Recipe>): Promise<Recipe> {
    return testRecipe
  }
}
const testUser = new User({name: "foo", id: "123456789111"})
class MockUserService {
  async find(where: Partial<User>): Promise<User[]> {
    return [testUser]
  }  
  async create(data: Partial<User>): Promise<User> {
    return testUser
  }
  async findOrCreate(data: Partial<User>): Promise<User> {
    return testUser
  }


}

describe('AppController', () => {
  let appController: AppController;



  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // imports: [UserModule,RecipeModule],
      controllers: [AppController],
    })
    .overrideProvider(RecipeService)
    .useValue(MockRecipeService)
    .overrideProvider(UserService)
    .useValue(MockUserService)
    .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
    it('should return a recipe', () => {
      expect(appController.getTest()).toBe(testRecipe);
    });
  });
});
