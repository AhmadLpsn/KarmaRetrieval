import { Router } from "express";
import { CustomError } from "../@Types";
import { SERVER_ERR } from "../constants/errors";
import { logger } from "./DDTLogger";

require('source-map-support').install(); 

export class API {
    constructor(public router: Router = Router()) { }
    add(
        method: 'post' | 'get' | 'put' | 'delete',
        path: string,
        ...middlewares
    ) {
        this.router[method](path,
            middlewares.map(c => this.wrapCall(c))
        )
        return this
    }
    private wrapCall(call) {
        return async (req, res, next) => {
            try {
                await call(req, res, next)
            } catch (err) {
                logger.log(err, 'error')
                if (err instanceof CustomError)
                    return res.status(err.status).send(err)

                res.status(SERVER_ERR.INVALID_USER_ID.status)
                    .send(SERVER_ERR.INVALID_USER_ID.message)
            }
        }
    }
}