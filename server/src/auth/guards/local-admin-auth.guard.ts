import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Type,
  mixin,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

export const LocalAdminAuthGuard = (role: Role): Type<CanActivate> => {
  class LocalAdminAuthGuardMixin extends AuthGuard('local') {
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

  return mixin(LocalAdminAuthGuardMixin);
};
