export class CreateEmployeeDto {
  initialName: string;
  lastName: string;
  email: string;
  mobilePhoneNumber?: string;
  address?: string;
  gender: string;
  jobRole: string;
  isActive?: boolean;
}
