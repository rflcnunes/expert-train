import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Role } from './schemas/role.schema';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      await this.rolesService.create(createRoleDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Role already exists');
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<Role[]> {
    try {
      return this.rolesService.findAll();
    } catch (error) {
      throw new BadRequestException({ message: error });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const response = await this.rolesService.delete(id);
      return {
        data: {
          message: 'Delete Success',
          name: response.name,
        },
      };
    } catch (error) {
      return { message: error };
    }
  }
}
