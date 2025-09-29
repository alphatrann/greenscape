import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Type,
  mixin,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { JwtAuthGuard } from './jwt-auth.guard';

export const RolesGuard = (role: Role): Type<CanActivate> => {
  class RolesGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user: User = request.user;

      if (!user.roles.includes(role))
        throw new ForbiddenException({
          success: false,
          message:
            'Non-admin users are not allowed to access the resources here',
        });
      return true;
    }
  }

  return mixin(RolesGuardMixin);
};
