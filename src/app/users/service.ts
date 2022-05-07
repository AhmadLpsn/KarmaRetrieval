import { USER_ERR } from "../constants/errors";
import { UsersRepo } from "../repositories"

const getUserRank = async (userId: number, numOfUserToShow: number, limit: number, offset: number)
    : Promise<[data: any[], count: number]> => {
    const [result, count] = await Promise.all([
        UsersRepo.getUserRank(userId, numOfUserToShow, limit, offset),
        UsersRepo.count()
    ])
    if (!result.length) {
        throw USER_ERR.INVALID_USER_ID
    }
    return [
        result,
        count > numOfUserToShow ? numOfUserToShow : count
    ]
}

export const UserSerivce = {
    getUserRank
}