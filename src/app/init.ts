import express from 'express';
import { logger } from './helpers';
import cors from 'cors'
import { port } from './config'
import { AppDataSource } from './repositories/dataSource';
import { router } from './router'

export const init = async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(`SET sql_mode = 'NO_UNSIGNED_SUBTRACTION';`)
    const App = express()

    App.use(cors({ origin: '*' }))

    App.use(express.json())

    App.use(express.urlencoded({
        extended: true
    }))

    App.use(router)

    App.use("/public", express.static('public'))

    return await new Promise((res, rej) => {
        App.listen(port || 3000, () => {
            logger.log(`Start listening to port ${port} ... `, 'Successfully Started');
            logger.log("___________success____________")
            res(App);
        })
    })
}