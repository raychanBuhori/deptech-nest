import { Module } from '@nestjs/common';
import { EmployeeLeavesService } from './employee-leaves.service';
import { EmployeeLeavesController } from './employee-leaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeLeaves } from './employee-leaves.entity';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeLeaves, Users])],
  providers: [EmployeeLeavesService],
  controllers: [EmployeeLeavesController],
})
export class EmployeeLeavesModule {}
