import { Module  } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
    JwtModule.registerAsync({
      useFactory: ()=>({
        secret: process.env.JWT_SECRET_KEY
      })
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    UserModule,
    TaskModule
  ],
  
})
export class AppModule {}
