import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TaskService } from "./task.service";
import { Task } from "./task.interface";
import { CreateTaskInput, TaskEntity, TaskFilter, UpdateTaskInput } from "./task.entity";
import { Task as TaskModel} from "./task.model";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.gaurd";
import { GraphQLAuthGuard } from "src/auth/graphql.auth.guard";
import { RequestWithAuth } from "src/user/user.interface";

@Resolver(()=>TaskModel)
export class TaskResolver{
    constructor(private readonly taskService: TaskService){}

  @Query(()=>TaskEntity)
  async getTask(@Args('id')id: string): Promise<TaskEntity>{
    return await this.taskService.getTaskById(id);
  }

  @Mutation(()=> TaskEntity)
  @UseGuards(GraphQLAuthGuard)
  async createTask(@Args('newTask')newTask: CreateTaskInput, @Context() context:{req: RequestWithAuth}): Promise<Task>{
    const user = context.req.user;
    newTask = {
      ...newTask,
      userId: user.userId
    }
    return await this.taskService.createTask(newTask)
  }

  @Mutation(()=> TaskEntity)
  async updateTask(@Args('userId')userId: string, @Args('taskId')taskId: string, @Args('updateTask') updateInput: UpdateTaskInput): Promise<Task> {
    return this.taskService.updateTask(userId, taskId, updateInput);
  }

  @Query(()=>[TaskEntity])
  async getTasks(@Args('filter', { nullable: true })filter?: TaskFilter): Promise<Task[]> {
    return this.taskService.getTask(filter);
  }

  @Query(()=>TaskEntity)
  async markDone(@Args('userId')userId: string,@Args('_id')_id: string): Promise<Task>{
    return await this.taskService.markDone(userId, _id);
  }

}