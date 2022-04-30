import * as Joi from 'joi'
import { MIN_NUMBER_OF_RANKS } from '../constants/values'
import { commonValidators } from '../helpers'

const getUserRank = Joi.object({
    params: {
        user_id: commonValidators.Positive(1).required()
    },
    query: {
        ...commonValidators.paginated,
        num_of_ranks: commonValidators.Positive(MIN_NUMBER_OF_RANKS)
    }
})

export const getUserRankReq = commonValidators.genValidator(getUserRank)