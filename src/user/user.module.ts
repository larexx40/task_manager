import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserModel } from './user.model';
import { JwtAuthModule } from 'src/auth/auth.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    JwtAuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports:[UserService]
})
export class UserModule {}