import { CustomError } from "../../@Types";

const USER_ERROR_CODE = "001";
export const INVALID_USER_ID = new CustomError({
    _code: USER_ERROR_CODE + "001",
    message: "invaild user id",
    status: 400
})