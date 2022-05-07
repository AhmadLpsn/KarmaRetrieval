import { API, paginated } from "../helpers";
import { UserController } from "./controller";
import { getUserRankReq } from "./validators";

const api = new API()

api.add('get', '/:user_id/rank', paginated,
    getUserRankReq, UserController.getUserRank)

export const UserRouter = api.router;