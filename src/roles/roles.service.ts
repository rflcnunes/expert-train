import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = await this.roleModel.create(createRoleDto);
    return createdRole;
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async delete(id: string) {
    const deletedRole = await this.roleModel
      .findByIdAndRemove({ _id: id })
      .exec();

    return deletedRole;
  }
}
