import { DataSource } from "typeorm";
import { dbConfig } from "../config";

export const AppDataSource = new DataSource({
    ...dbConfig,
    type: "mysql",
    synchronize: true,
    logging: false,
    entities: ["**/repositories/entities/*.js"],
    subscribers: [],
    migrations: [],
})