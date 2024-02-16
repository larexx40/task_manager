import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskModel } from "./task.model";
import { JwtAuthModule } from "src/auth/auth.module";
import { TaskResolver } from "./task.resolver";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Task.name,
            schema: TaskModel
        }]),
        JwtAuthModule
    ],
    controllers:[TaskController],
    providers:[TaskService,TaskResolver]
})

export class TaskModule{} 