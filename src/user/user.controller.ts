import { Controller, Body, Get, Param, Put, Delete, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { RequestWithAuth } from './user.interface';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async login(@Body() loginDto: LoginDto) {
  //   return await this.userService.login(loginDto);
  // }

  @Post()
  async signup(@Body() createUserDto: CreateUserDto){
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getUsers(@Body() whereClause?: any) {
    return await this.userService.getUser(whereClause);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Put(':id')

  async updateUser(@Request()req: RequestWithAuth, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId;
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUser(userId);
  }

  @Get(':id/exists')
  async checkIfUserExists(@Param('id') userId: string) {
    return await this.userService.checkIfUserExists(userId);
  }
}
