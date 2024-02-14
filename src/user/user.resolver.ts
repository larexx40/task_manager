import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.interface";
import { CreateUserDto, LoginDto, UpdateUserDto } from "./user.dto";

@Resolver('User')
export class UserResolver{
    constructor(private readonly userService: UserService){}

    @Query('getUser')
    async getUser(@Args(':id')id: string): Promise<User>{
        return await this.userService.getUserById(id);
    }

    @Mutation('createUser')
    async login(@Args('loginInput')loginInput: LoginDto): Promise<{user: User,token: string}>{
        return await this.userService.login(loginInput)
    }

    @Mutation()
  async signup(@Args('createUserInput') createUserInput: CreateUserDto): Promise<{user: User,token: string}> {
    return this.userService.createUser(createUserInput);
  }

  @Query()
  async getUsers(@Args('where') where?: any): Promise<User[]> {
    return this.userService.getUser(where);
  }

  @Mutation()
  async updateUser(@Args('_id') _id: string, @Args('updateUserInput') updateUserInput: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(_id, updateUserInput);
  }

  @Mutation()
  async deleteUser(@Args('_id') _id: string): Promise<User> {
    return this.userService.deleteUser(_id);
  }

  @Query()
  async checkIfUserExists(@Args('_id') _id: string): Promise<boolean> {
    return this.userService.checkIfUserExists(_id);
  }

}