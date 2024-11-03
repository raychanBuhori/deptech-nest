// employee-leaves/employee-leaves.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeLeavesService } from './employee-leaves.service';
import { CreateEmployeeLeavesDto } from './dto/create-employee-leaves.dto';
import { UpdateEmployeeLeavesDto } from './dto/update-employee-leaves.dto';

@Controller('employee-leaves')
export class EmployeeLeavesController {
  constructor(private readonly employeeLeavesService: EmployeeLeavesService) {}

  // Create a new leave
  @Post()
  async create(@Body() createEmployeeLeaveDto: CreateEmployeeLeavesDto) {
    const newLeave = this.employeeLeavesService.create(createEmployeeLeaveDto);
    return newLeave;
  }

  // Retrieve all leave records
  @Get()
  findAll() {
    return this.employeeLeavesService.findAll();
  }

  // Retrieve a leave record by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeLeavesService.findOne(+id);
  }

  // Update a leave record by ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeLeaveDto: UpdateEmployeeLeavesDto,
  ) {
    return this.employeeLeavesService.update(+id, updateEmployeeLeaveDto);
  }

  // Delete a leave record by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeLeavesService.remove(+id);
  }
}
