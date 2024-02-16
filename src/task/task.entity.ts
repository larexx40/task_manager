import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';
import { DateScalar} from 'src/common/scalar/date.scalar';

@InputType()
export class CreateTaskInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  isComplete?: boolean;

  @Field(() => DateScalar, { nullable: true })
  startDate?: Date;

  @Field(() => DateScalar, { nullable: true })
  endDate?: Date;

  @Field()
  userId: string;
}

@InputType()
export class TaskFilter{
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  isComplete?: boolean;

  @Field(() => DateScalar, { nullable: true })
  startDate?: Date;

  @Field(() => DateScalar, { nullable: true })
  endDate?: Date;
}

@ObjectType()
export class TaskEntity {
  @Field(() => ID, { nullable: true })
  _id?: string

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  isComplete?: boolean;

  @Field(() => DateScalar, { nullable: true })
  startDate?: Date;

  @Field(() => DateScalar, { nullable: true })
  endDate?: Date;

  @Field()
  userId?: string;
}