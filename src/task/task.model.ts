import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.model'; // Import User model

@Schema()
export class Task extends Document {
    @Prop({ type: 'ObjectId', ref: 'User' }) // Reference to User model
    userId: User['_id'];

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    isComplete: boolean;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;
}

export const TaskModel = SchemaFactory.createForClass(Task);