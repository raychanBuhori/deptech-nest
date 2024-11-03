import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeLeavesDto } from './create-employee-leaves.dto';

export class UpdateEmployeeLeavesDto extends PartialType(
  CreateEmployeeLeavesDto,
) {}
