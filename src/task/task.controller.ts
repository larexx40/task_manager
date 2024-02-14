import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, BadRequestException, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { RequestWithAuth } from 'src/user/user.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(@Request() req: RequestWithAuth, @Body() createTaskDto: CreateTaskDto) {
    try {
        const userId = req.user.userId;
        createTaskDto.userId = userId;
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
  async updateTask(@Request() req: RequestWithAuth,@Param('id') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
        const userId = req.user.userId;
        updateTaskDto.userId = userId;
        return await this.taskService.updateTask(userId, taskId, updateTaskDto);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id/mark-done')
  async markDone(@Request() req: RequestWithAuth,@Param('id') taskId: string) {
    try {
        const userId = req.user.userId;
        return await this.taskService.markDone(userId,taskId);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteTask(@Request() req: RequestWithAuth,@Param('id') taskId: string) {
    try {
        const userId = req.user.userId;
        return await this.taskService.deleteTask(userId,taskId);
    } catch (error) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}