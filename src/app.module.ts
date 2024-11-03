import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { EmployeeLeavesModule } from './employee-leaves/employee-leaves.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Adjust to your MySQL host
      port: 3306,
      username: 'root', // Adjust to your MySQL username
      password: 'Armyman1412-', // Adjust to your MySQL password
      database: 'deptech_db', // Adjust to your MySQL database
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    EmployeesModule,
    EmployeeLeavesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
