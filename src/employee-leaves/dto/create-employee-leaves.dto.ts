export class CreateEmployeeLeavesDto {
  userId: number;
  leaveStartDate: Date;
  leaveEndDate: Date;
  reason: string;
  isActive?: boolean;
}
