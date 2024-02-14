import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserModel } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserModel }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}