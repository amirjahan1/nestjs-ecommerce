import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
=======
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
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
>>>>>>> 33a699a (finish refresh token)
