import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task} from './task.model';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task as TaskData } from './task.interface';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskData> {
    try {
      const task = new this.taskModel(createTaskDto);
      return await task.save();
    } catch (error) {
      throw new InternalServerErrorException('Error connecting to DB server');
    }
  }

  async getTask(filter?: Partial<CreateTaskDto>, search?: string): Promise<Task[]> {
    try {
      //create filter and search object for find option in mongoose
      let query = {}
      if(filter){
        query = {
          ...filter
        }
      }

      if(search){
        const searchRegex = new RegExp(search, "i");
        query = {
          ...query,
          $or:[
            {name: searchRegex},
            {description: searchRegex}
          ]
        }
      }

      return await this.taskModel.find(query).exec();
    } catch (error) {
      throw new NotFoundException('Tasks not found');
    }
  }

  async updateTask(userId: string, taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
        const task = await this.getTaskById(taskId);
        if (task.userId !== userId) {
        throw new ForbiddenException('You are not authorized to update this task');
        }
        const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, {...updateTaskDto, userId}, { new: true }).exec();
        if (!updatedTask) {
            throw new NotFoundException('Task not found');
        }
        return updatedTask;
    } catch (error) {
        throw new InternalServerErrorException('Error connecting to DB server');
    }
  }

  async markDone(userId: string, taskId: string): Promise<Task> {
    try {
        let task = await this.getTaskById(taskId) as Task;
        if (task.userId !== userId) {
        throw new ForbiddenException('You are not authorized to update this task');
        }
        return await task.save();
    } catch (error) {
        throw new InternalServerErrorException('Error connecting to DB server');
    }
  }

  async deleteTask(userId: string, taskId: string): Promise<Task> {
    try {
        const task = await this.getTaskById(taskId);
        if (task.userId !== userId) {
            throw new ForbiddenException('You are not authorized to update this task');
        }
        const deletedTask = await this.taskModel.findByIdAndDelete(taskId).exec();
        if (!deletedTask) {
            throw new NotFoundException('Task not found');
        }
        return deletedTask;
    } catch (error) {
        throw new InternalServerErrorException('Error connecting to DB server');
    }
  }

  private async checkIfExists(taskId: string): Promise<boolean> {
    try {
      const task = await this.taskModel.findById(taskId).exec();
      return !!task;
    } catch (error) {
        throw new InternalServerErrorException('Error connecting to DB server');
    }
  }

  async getTaskById(taskId: string): Promise<TaskData> {
    try {
      const task = await this.taskModel.findById(taskId).exec();
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return task;
    } catch (error) {
        throw new InternalServerErrorException('Error connecting to DB server');
    }
  }
}