import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Task } from 'src/task/task.model';

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    username: string;

    @Prop()
    age: number;

    @Prop()
    phoneNumber: string;

    @Prop()
    roles: string[];

    @Prop({ type: [{ type: MongooseSchema.ObjectId, ref: 'Task' }] }) // Define relation with Task
    tasks: Task[]; // Array of Task references
}

export const UserModel = SchemaFactory.createForClass(User);