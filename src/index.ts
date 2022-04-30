import express from 'express';
import { logger } from './helpers';
import cors from 'cors'
import { port } from './config'
import { AppDataSource } from './repositories/dataSource';
import { router } from './router'

console.log("starting")
const start = async () => {
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

    App.listen(port || 3000, () => {
        logger.log(`Start listening to port ${port} ... `, 'Successfully Started');
        console.log("___________success____________")
    })
}
start().catch(err => console.log(err))