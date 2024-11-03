export class CreateUserDto {
  initialName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  gender: string;
  role: string;
  password: string;
  isActive?: boolean;
}
