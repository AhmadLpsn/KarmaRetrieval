import { logger } from "../helpers";
import { AppDataSource } from "../repositories/dataSource";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
AppDataSource.initialize().then(async () => {
    logger.log("start", "dropping")
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    for (let { name } of AppDataSource.entityMetadatas) {
        await AppDataSource.query(`DROP TABLE ${name} CASCADE ;`)
    }
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
    logger.log("Done", "dropping")
    process.exit();
})