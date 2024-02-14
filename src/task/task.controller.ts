import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.taskService.createTask(createTaskDto);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getTasks(@Body() whereClause?: any) {
    try {
      return await this.taskService.getTask(whereClause);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') taskId: string) {
    try {
      return await this.taskService.getTaskById(taskId);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateTask(userId,@Param('id') taskId: string, @Body() updateTaskDto: any) {
    try {
      return await this.taskService.updateTask(userId, taskId, updateTaskDto);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id/mark-done')
  async markDone(userId,@Param('id') taskId: string) {
    try {
      return await this.taskService.markDone(userId,taskId);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteTask(userId,@Param('id') taskId: string) {
    try {
      return await this.taskService.deleteTask(userId,taskId);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}