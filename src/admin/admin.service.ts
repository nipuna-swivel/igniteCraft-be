import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from 'src/admin/schemas/admin.schema';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      createAdminDto.password = await bcrypt.hash(
        createAdminDto.password,
        saltOrRounds,
      );

      const createdAdmin = new this.adminModel(createAdminDto);
      return createdAdmin.save();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async getAllAdmins(): Promise<Admin[]> {
    try {
      return this.adminModel.find();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async getAdminByName(username: string): Promise<Admin> {
    try {
      return this.adminModel.findOne({ username: username });
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      return this.adminModel.updateOne(
        { _id: id },
        { $set: { ...updateAdminDto } },
      );
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async deleteAdmin(id: string) {
    try {
      return this.adminModel.deleteOne({ _id: id });
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }
}
