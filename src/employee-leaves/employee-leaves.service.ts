// employee-leaves/employee-leaves.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeLeaves } from './employee-leaves.entity';
import { CreateEmployeeLeavesDto } from './dto/create-employee-leaves.dto';
import { UpdateEmployeeLeavesDto } from './dto/update-employee-leaves.dto';
import { Users } from '../users/users.entity';

@Injectable()
export class EmployeeLeavesService {
  constructor(
    @InjectRepository(EmployeeLeaves)
    private employeeLeavesRepository: Repository<EmployeeLeaves>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async validateLeaveDates(
    userId: number,
    leaveStartDate: Date,
    leaveEndDate: Date,
  ): Promise<void> {
    const startMonth = leaveStartDate.getMonth();
    const startYear = leaveStartDate.getFullYear();

    const existingLeaves = await this.employeeLeavesRepository
      .createQueryBuilder('employeeLeaves')
      .where('employeeLeaves.userId = :userId', { userId })
      .andWhere('MONTH(employeeLeaves.leave_start_date) = :month', {
        month: startMonth + 1,
      }) // +1 because MONTH() starts from 1
      .andWhere('YEAR(employeeLeaves.leave_start_date) = :year', {
        year: startYear,
      })
      .getMany();

    if (existingLeaves.length > 0) {
      throw new ConflictException(
        'Leave already exists for this month and year.',
      );
    }
  }

  // Create a new leave
  async create(
    createEmployeeLeaveDto: CreateEmployeeLeavesDto,
  ): Promise<EmployeeLeaves> {
    const user = await this.usersRepository.findOne({
      where: { id: createEmployeeLeaveDto.userId },
    });
    if (!user) throw new NotFoundException('Users not found');

    const employeeLeave = this.employeeLeavesRepository.create({
      ...createEmployeeLeaveDto,
      user,
    });
    return await this.employeeLeavesRepository.save(employeeLeave);
  }

  // Get all leave records
  async findAll(): Promise<EmployeeLeaves[]> {
    return await this.employeeLeavesRepository.find({ relations: ['user'] });
  }

  // Get a single leave record by ID
  async findOne(id: number): Promise<EmployeeLeaves> {
    const employeeLeave = await this.employeeLeavesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!employeeLeave)
      throw new NotFoundException(`Leave record with ID ${id} not found`);
    return employeeLeave;
  }

  // Update a leave record by ID
  async update(
    id: number,
    updateEmployeeLeaveDto: UpdateEmployeeLeavesDto,
  ): Promise<EmployeeLeaves> {
    await this.employeeLeavesRepository.update(id, updateEmployeeLeaveDto);
    return await this.findOne(id);
  }

  // Delete a leave record by ID
  async remove(id: number): Promise<void> {
    const result = await this.employeeLeavesRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Leave record with ID ${id} not found`);
  }
}
