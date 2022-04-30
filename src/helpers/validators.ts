import * as Joi from 'joi'
export const Positive = (min = 1) => Joi.number().integer().min(min)
export const EnumSchema = (en) => Joi.string().valid(...Object.values(en))
export const paginated = {
    page: Positive().required(),
    size: Positive().required(),
    limit: Joi.number(),
    offset: Joi.number()
}
export const getList = Joi.object({
    query: Joi.object(paginated)
})
export const idAsParam = (id: string) => {
    const params = {}
    params[id] = Positive().required()

    return Joi.object({
        params: Joi.object(params).required()
    })
}

import { Request, Response } from "express"
import { ObjectSchema } from "joi"

export const genValidator = (schema: ObjectSchema) => {
    return (req:Request, res:Response, next) => {
        const validationResult = schema.unknown(true).validate(req)
        if (validationResult.error)
            return res
                .status(400)
                .send(validationResult.error.message)
        next()
    }
}