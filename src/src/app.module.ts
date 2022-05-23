<<<<<<< HEAD
import { Module} from '@nestjs/common';
=======
import { Module } from '@nestjs/common';
>>>>>>> 33a699a (finish refresh token)
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

<<<<<<< HEAD

=======
>>>>>>> 33a699a (finish refresh token)
@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
