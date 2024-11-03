import { Module } from '@nestjs/common';
import { EmployeeLeavesService } from './employee-leaves.service';
import { EmployeeLeavesController } from './employee-leaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeLeaves } from './employee-leaves.entity';
import { Employees } from 'src/employees/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeLeaves, Employees])],
  providers: [EmployeeLeavesService],
  controllers: [EmployeeLeavesController],
})
export class EmployeeLeavesModule {}
