import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto, LoginDto, UpdateUserDto } from './user.dto';
import { hash, compare } from "bcrypt";
import { AuthService } from 'src/auth/auth.service';
import { AuthTokenPayload, User as UserData } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      //save user to db
      let user = new this.userModel(createUserDto);
      user = await user.save()
      return user;
      
    } catch (error) {
      throw new InternalServerErrorException("Unable to create user");    
    }
  }

  async findUserLogin(emailOrUsername: string):Promise<User>{
    // Check if the user exists with the provided username or email
    const user = await this.userModel.findOne({
      $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
    }).exec();
    return user
  }


  async getUser(filter?: Partial<UserData>, search?: string): Promise<User[]> {
    
    //create filter and search object for find option in mongoose
    let query = {};
    if(filter){
      query = {
        ...filter
      }
    }

    if(search){
      const searchRegex = new RegExp(search, "i");
      query = {
        ...query,
        $or: [
          {name: searchRegex},
          {email: searchRegex},
          {username: searchRegex}
        ]
      }
    }
    return await this.userModel.find(query).exec();
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

  async deleteUser(userId: string): Promise<boolean> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return true;
  }

  async checkIfUserExists(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    return !!user;
  }

  async checkIfExist (whereClause: Partial<CreateUserDto>): Promise<boolean>{
    const user = await this.userModel.findOne(whereClause).exec();
    return !!user;
  }

}