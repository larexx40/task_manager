import { InputType, Field, Int, ObjectType, ID } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  emailOrUsername: string;

  @Field()
  password: string;
}

@InputType()
export class SignUpInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  // @Field({ nullable: true })
  // age?: number;

  @Field({ nullable: true })
  phoneNumber?: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  username?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  phoneNumber?: string;
}

@ObjectType()
export class UserEntity {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  phoneNumber?: string;
}

@InputType()
export class UserFilter{
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;
}

@ObjectType()
export class UserWithTokenData {
  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  token: string;
}