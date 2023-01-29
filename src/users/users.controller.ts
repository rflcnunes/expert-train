import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('User already exists');
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new BadRequestException({ message: error });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const response = await this.usersService.delete(id);
      return {
        data: {
          message: 'Delete Success',
          name: response.name,
          email: response.email,
        },
      };
    } catch (error) {
      return { message: error };
    }
  }
}
