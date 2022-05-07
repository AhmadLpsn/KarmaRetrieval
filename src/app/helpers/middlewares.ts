import { DEFAULT_PAGE_SIZE } from "../constants/values";
import { logger } from "./DDTLogger";

export const reqLogger = (req, res, next) => {

    logger.log(req.originalUrl, "new req")
    logger.log(req.query, "query")
    logger.log(req.body, "body");

    next()
}


export const paginated = (req, _, next) => {

    req.query.size = Number(req.query.size || DEFAULT_PAGE_SIZE)
    req.query.page = Number(req.query.page || 1)

    req.query.offset = (req.query.page - 1) * req.query.size
    req.query.limit = req.query.size

    next()
}