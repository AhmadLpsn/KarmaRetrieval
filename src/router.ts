import { Router } from "express";
import { APP_V } from "./constants/values";
import { reqLogger } from "./helpers";
import { UserRouter } from "./users/router";

const router = Router();

router.use(reqLogger)

router.get('/api/v', (req, res) => res.send(APP_V))
router.use('/api/users', UserRouter)

export {
    router
}