import {Injectable} from "@nestjs/common";
import {MongooseModuleOptions, MongooseOptionsFactory} from "@nestjs/mongoose";


@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/?authMechanism=DEFAULT&authSource=admin`,
        };
    }
}
