// employees/employees.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from './employees.entity';
import { CreateEmployeeDto } from './dto/create-employees.dto';
import { UpdateEmployeeDto } from './dto/update-employees.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employees> {
    const employee = this.employeesRepository.create(createEmployeeDto);
    return await this.employeesRepository.save(employee);
  }

  async findAll(): Promise<Employees[]> {
    return await this.employeesRepository.find();
  }

  async findOne(id: number): Promise<Employees> {
    const employee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['employeeLeaves'],
    });
    if (!employee)
      throw new NotFoundException(`Employee with ID ${id} not found`);
    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employees> {
    await this.employeesRepository.update(id, updateEmployeeDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
