import { GetListResponse } from "../@Types";
import { UserSerivce } from "./service";

const getUserRank = async (req, res) => {
    const { user_id } = req.params;
    const { num_of_ranks, offset, limit } = req.query

    const result = await UserSerivce.getUserRank(user_id, num_of_ranks || 5, limit, offset);

    res.send(new GetListResponse(result,offset, limit))
}

export const UserController = {
    getUserRank
}