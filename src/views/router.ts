import { API } from "../helpers";
import { ViewController } from "./controller";

const api = new API()

api.add('get', '/',ViewController.index)

export const ViewRouter = api.router;