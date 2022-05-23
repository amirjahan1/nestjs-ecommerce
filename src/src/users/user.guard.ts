import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { UsersService } from './users.service';
// test token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjUyOTg4NDY5LCJleHAiOjE2NTM4NTI0Njl9.Y8HqlPJFNtTj-7Ms4AcTw6JeabTbneATfDjsnT5cVaQ
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const bearer_token = req.headers.authorization;
    const access_token = bearer_token && bearer_token.split(' ')[1];
    try {
      const user_access = jwt.verify(access_token, 'secret');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user_access.email;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.userService.findOne(user_access.email);
      return true;
    } catch (error) {
      return false;
    }
  }
}
