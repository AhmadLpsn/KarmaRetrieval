import { } from '../app/config'
import { logger } from "../app/helpers";
import { AppDataSource } from "../app/repositories/dataSource";
import { Image, User } from "../app/repositories/entities"

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function dataFactory<T>(factory, total) {
    function* gen() {
        for (let i = 0; i < total; i++) {
            yield factory(i);
        }
    }
    return gen;
}
const total = Number(process.env.DB_SEED_SIZE||10000)
const entities = [
    {
        type: Image,
        data: dataFactory((i) => {
            const record: Image = {
                id: i + 1,
                url: `img${i % 5}.jpg`,
            }
            return record;
        }, total)()
    },
    {
        type: User,
        data: dataFactory((i) => {
            const record: User = {
                id: i + 1,
                username: `user${i}`,
                karmaScore: Math.floor(Math.random() * 10000),
                image: <Image>{ id: i + 1 }
            }
            return record;
        }, total)()
    },
]


AppDataSource.initialize().then(async () => {

    logger.log(`start seeding ${total} records`, "seeding")
    for (let i of entities) {
        const repo = AppDataSource.getRepository(i.type)
        if (total > 1000) {
            let inserted = 0;
            do {
                const data = [];
                const remain = Math.min(1000, total - inserted)
                for (let k = 0; k < remain; k++) {
                    data.push(i.data.next().value)
                }
                await repo.insert(data)
                inserted += remain;
            } while (inserted < total);
        } else {
            await repo.insert([...i.data]);
        }
    }
    logger.log("done", "seeding")
    process.exit();
})

