import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EmployeeLeaves } from '../employee-leaves/employee-leaves.entity';

@Entity('employees')
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'initial_name', type: 'varchar', length: 50 })
  initialName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;

  @Column({ unique: true, type: 'varchar', length: 100 })
  email: string;

  @Column({
    name: 'mobile_phone_number',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  mobilePhoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => EmployeeLeaves, (employeeLeave) => employeeLeave.user, {
    nullable: true,
  })
  employeeLeaves: EmployeeLeaves[];
}
