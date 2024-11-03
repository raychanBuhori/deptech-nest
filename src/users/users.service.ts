// users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email, password },
    });
    if (user && user.password === password) {
      return user;
    }
    throw new NotFoundException(`Login Failed`);
  }

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  // Get all users
  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  // Get a user by ID
  async findOne(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Users with ID ${id} not found`);
    return user;
  }

  // Update a user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Users with ID ${id} not found`);
    }
  }
}
