import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto, LoginDto, UpdateUserDto } from './user.dto';
import { hash, compare } from "bcrypt";
import { JwtAuthService } from 'src/auth/auth.service';
import { AuthTokenPayload } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{user: User, token: string}> {
    const{username, email, password} =createUserDto;

    //encrypt password
    const hashPassword = await hash(password, 10)
    createUserDto.password = hashPassword;

    try {
      //confirm if name or username already in db
      const [emailExist, usernameExist] = await Promise.all([
        await this.checkIfExist({email}),
        await this.checkIfExist({username})
      ])
      if(emailExist) throw new ConflictException(`User with email: ${email} exist`);
      if(usernameExist) throw new ConflictException(`User with username: ${username} exist`);

      //save user to db
      let user = new this.userModel(createUserDto);
      user = await user.save()

      //generate jwt token
      const token = await this.generateJwtToken(user);
      
      return { user, token};
      
    } catch (error) {
      throw new InternalServerErrorException("Unable to create user");      
    }
  }

  async login(loginDto: LoginDto): Promise<{user: User, token: string}>{
    const {password,  emailOrUsername} = loginDto;
    try {
       // Check if the user exists with the provided username or email
       const user = await this.userModel.findOne({
        $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
      }).exec();

      if(!user)throw new NotFoundException("User not found");

      const isValid = await compare(password, user.password)
      if(!isValid) throw new NotFoundException("Incorrect password");

      //generate jwt token
      const token = await this.generateJwtToken(user);
      return {user, token};
      
      
    } catch (error) {
      throw new NotFoundException("Invalid login credentials");
      
    }
  }

  async getUser(whereClause?: any): Promise<User[]> {
    return await this.userModel.find(whereClause || {}).exec();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }

  async checkIfUserExists(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    return !!user;
  }

  private async checkIfExist (whereClause: Partial<CreateUserDto>): Promise<boolean>{
    const user = await this.userModel.findOne(whereClause).exec();
    return !!user;
  }

  private async generateJwtToken(user: User): Promise<string>{
    const payload: AuthTokenPayload = {
      userId: user._id,
      email: user.email,
      roles: user.roles
    }
    return await this.jwtAuthService.generateToken(payload)
  
  }
}