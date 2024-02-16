import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { LoginInput, SignUpInput, UpdateUserInput, UserEntity, UserFilter, UserWithTokenData } from "./user.entity";

@Resolver(() => User)
export class UserResolver{
    constructor(private readonly userService: UserService){}

    @Query(returns => UserEntity) // Specify the return type as User
    async getUser(@Args('id')id: string): Promise<User>{
        return await this.userService.getUserById(id);
    }

    @Mutation(returns => UserWithTokenData)
    async login(@Args('loginInput')loginInput: LoginInput): Promise<UserWithTokenData>{
        const {user, token } = await this.userService.login(loginInput)
        return {user, token }
    }

    @Mutation(() => UserWithTokenData)
    async signup(@Args('createUserInput') createUserInput:SignUpInput): Promise<UserWithToken> {
        return this.userService.createUser(createUserInput);
    }

    @Query(returns => [UserEntity])
    async getUsers(@Args('filter', {nullable: true})filter?: UserFilter): Promise<UserEntity[]> {
        return this.userService.getUser(filter);
    }

    @Mutation(returns => UserEntity)
    async updateUser(@Args('_id') _id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<UserEntity> {
        return this.userService.updateUser(_id, updateUserInput);
    }

    @Mutation(returns => Boolean)
    async deleteUser(@Args('_id') _id: string): Promise<boolean> {
        return this.userService.deleteUser(_id);
    }

    @Query(returns => Boolean)
    async checkIfUserExists(@Args('_id') _id: string): Promise<boolean> {
        return this.userService.checkIfUserExists(_id);
    }

}

class UserWithToken {
    user: User;
    token: string;
}