import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TaskService } from "./task.service";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";
import { Task } from "./task.interface";
import { CreateTaskInput, TaskEntity, TaskFilter, UpdateTaskInput } from "./task.entity";
import { Task as TaskModel} from "./task.model";

@Resolver(()=>TaskModel)
export class TaskResolver{
    constructor(private readonly taskService: TaskService){}

  @Query(()=>TaskEntity)
  async getTask(@Args('id')id: string): Promise<TaskEntity>{
    return await this.taskService.getTaskById(id);
  }

  @Mutation(()=> TaskEntity)
  async createTask(@Args('newTask')newTask: CreateTaskInput): Promise<Task>{
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