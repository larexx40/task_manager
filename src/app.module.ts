import { Module  } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthModule } from './auth/auth.module';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateScalar } from './common/scalar/date.scalar';

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
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //     autoSchemaFile: join(process.cwd(), './schema.gql'),
    //   driver: ApolloDriver,
    //   playground: true,
    //   typePaths: [
    //     join(process.cwd(), './src/user/user.schema.gql'),
    //     join(process.cwd(), './src/task/task.schema.gql')
    //   ], // Define additional schema files
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      playground: true,
      typePaths: [
        join(process.cwd(), './src/user/user.schema.gql'),
        join(process.cwd(), './src/task/task.schema.gql')
      ], // Define additional schema files
    }),
      
    UserModule,
    TaskModule,
    JwtAuthModule
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
  
})
export class AppModule {}
