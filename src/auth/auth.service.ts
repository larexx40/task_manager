import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthTokenPayload, User as UserData } from "src/user/user.interface";
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, LoginDto } from "src/user/user.dto";
import { User } from "src/user/user.model";
import { compare, hash } from "bcrypt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {};
    
    async signUp(createUserDto: CreateUserDto): Promise<{user: User, token: string}> {
        const{username, email, password} =createUserDto;
    
        //encrypt password
        const hashPassword = await hash(password, 10)
        createUserDto.password = hashPassword;
    
        try {
          //confirm if name or username already in db
          const [emailExist, usernameExist] = await Promise.all([
            await this.userService.checkIfExist({email}),
            await this.userService.checkIfExist({username})
          ])
          if(emailExist) throw new ConflictException(`User with email: ${email} exist`);
          if(usernameExist) throw new ConflictException(`User with username: ${username} exist`);
    
          //save user to db
          let user = await this.userService.createUser(createUserDto);
          user = await user.save()
    
          //generate jwt token
          const token = await this.generateToken(user);
          
          return { user, token};
          
        } catch (error) {
          // throw new InternalServerErrorException("Unable to create user"); 
          throw error;     
        }
    }
    
    async login(loginDto: LoginDto): Promise<{user: User, token: string}>{
        const {password,  emailOrUsername} = loginDto;
        try {
           // Check if the user exists with the provided username or email
           const user = await this.userService.findUserLogin(emailOrUsername);    
          if(!user)throw new NotFoundException("User not found");
    
          const isValid = await compare(password, user.password)
          if(!isValid) throw new NotFoundException("Incorrect password");
    
          //generate jwt token
          const token = await this.generateToken(user);
          return {user, token};
          
          
        } catch (error) {
          // throw new NotFoundException("Invalid login credentials");
          throw error;
          
        }
    }


    async generateToken (user: UserData) {
        const payload: AuthTokenPayload = {
            userId: user._id,
            email: user.email,
            roles: user.roles
        }
        return jwt.sign(payload, process.env.JWT_SECRET_KEY)
    }

    async verifyToken(token: string): Promise<AuthTokenPayload> {
        const payload = jwt.verify(token,  process.env.JWT_SECRET_KEY ) as AuthTokenPayload;
        return payload;
    }
}