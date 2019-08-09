import { Module } from '@nestjs/common';
import { MikroOrmModule } from "nestjs-mikro-orm";
import { User } from './entities/User';
import { UserService } from './user.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({entities: [User]})
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
