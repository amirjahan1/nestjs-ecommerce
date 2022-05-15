import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(
        {
            envFilePath: '.env',
            isGlobal: true,
            load: [
                () => {
                    return {
                        DATABASE_HOST: parseInt(process.env.DATABASE_HOST),
                        DATABASE_PORT: process.env.DATABASE_PORT,
                        DATABASE_USER: process.env.DATABASE_USER,
                        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
                    };
                },
            ],
        }
    )],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}