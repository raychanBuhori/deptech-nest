// employee-leaves/employee-leave.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employees } from '../employees/employees.entity';

@Entity('employee_leaves')
export class EmployeeLeaves {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employees, (employee) => employee.employeeLeaves, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  employee: Employees;

  @Column({ name: 'leave_start_date', type: 'date' })
  leaveStartDate: Date;

  @Column({ name: 'leave_end_date', type: 'date' })
  leaveEndDate: Date;

  @Column({ type: 'text' })
  reason: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
