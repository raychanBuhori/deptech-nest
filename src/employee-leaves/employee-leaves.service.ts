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
import { Employees } from '../employees/employees.entity';

@Injectable()
export class EmployeeLeavesService {
  constructor(
    @InjectRepository(EmployeeLeaves)
    private employeeLeavesRepository: Repository<EmployeeLeaves>,

    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
  ) {}

  // Create a new leave
  async create(
    createEmployeeLeaveDto: CreateEmployeeLeavesDto,
  ): Promise<EmployeeLeaves> {
    const employee = await this.employeesRepository.findOne({
      where: { id: createEmployeeLeaveDto.userId },
    });
    if (!employee) throw new NotFoundException('Users not found');

    const employeeLeave = this.employeeLeavesRepository.create({
      ...createEmployeeLeaveDto,
      employee,
    });
    return await this.employeeLeavesRepository.save(employeeLeave);
  }

  // Get all leave records
  async findAll(): Promise<EmployeeLeaves[]> {
    return await this.employeeLeavesRepository.find({
      relations: ['employee'],
    });
  }

  // Get a single leave record by ID
  async findOne(id: number): Promise<EmployeeLeaves> {
    const employeeLeave = await this.employeeLeavesRepository.findOne({
      where: { id },
      relations: ['employee'],
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
