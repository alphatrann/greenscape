import { User } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';

class UserResponse implements Omit<User, 'roles'> {
  id: number;

  firstName: string;
  lastName: string;
  email: string;

  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;
}
export class AuthResponse {
  success: boolean;
  accessToken?: string;
  @Type(() => UserResponse)
  data: UserResponse;
}
