import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { UserModule } from './User/user.module';
import { RecipeModule } from './Recipe/recipe.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entitiesDirs: ["./**/entities"],
      entitiesDirsTs: ["./**/entities"],
      baseDir: __dirname,
      // dbName: 'my-db-name.sqlite3',
      // type: 'sqlite',
      dbName: "mikro-orm-test",
      type:"mongo",
      clientUrl: "mongodb://127.0.0.1", // change me
      autoFlush: false,
      debug: true
    }),
    UserModule,
    RecipeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
