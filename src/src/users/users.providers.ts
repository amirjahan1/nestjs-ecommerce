import { Connection } from 'mongoose';
import { UserSchema } from '../schemas/user.schema';

export const usersProviders = [
<<<<<<< HEAD
    {
    provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
    },
];
=======
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
>>>>>>> 33a699a (finish refresh token)
