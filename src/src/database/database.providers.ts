import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
    provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
          // mongoose.connect(`mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/?authMechanism=DEFAULT&authSource=admin`,),
          mongoose.connect('mongodb://AJapplication:AJ54321@localhost:61072/User?authMechanism=DEFAULT&authSource=admin')
    }
];


// process.env