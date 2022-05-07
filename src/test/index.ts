import { expect } from 'expect';
import supertest from 'supertest'
import { describe } from 'mocha'
import { init } from '../app/init';
import Joi from 'joi';
import { Positive } from '../app/helpers/validators';
process.env.NODE_ENV = "test"
let app = undefined;
const getApp = async () => {
    if (app)
        return app
    app = await init()
    return app
}
const pagenatedResult = (item) => Joi.object({
    data: Joi.array().items(item).required(),
    meta: {
        currentPage: Positive(1).required(),
        lastPage: Positive(1).required(),
        perPage: Positive(1).required(),
        total: Positive(0).required()
    }
})

const userRankItem = Joi.object({
    id: Positive(1).required(),
    username: Joi.string().required(),
    rk: Positive().required(),
    karmaScore: Positive().required(),
    image: Joi.string().required()
})

describe('get /api/users/:user_id/rank/', function () {
    it('respond with valid HTTP status code and pagenated results', async function () {
        const app = await getApp()

        const response = await supertest(app).get('/api/users/1/rank/')

        expect(response.status).toBe(200);
        
        const resultSheama = pagenatedResult(userRankItem).validate(response.body)

        expect(resultSheama.error).toBe(undefined)
    });
});