import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';

const jwtConstants = {
  secret: 'secretKey',
};

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '90d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule implements UsersModule {}

