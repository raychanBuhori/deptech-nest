import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employees.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
