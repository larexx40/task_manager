import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';
import { User, UserModel } from 'src/user/user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    UserModule, 
    TaskModule
  ],
  providers: [
    AuthService, // Include AuthService in the providers array
    AuthGuard,
  ],
  controllers: [AuthController], // Export JwtAuthService if needed by other modules
  exports: [AuthService],
})
export class AuthModule {}
