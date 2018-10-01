
import {Router, Request, Response} from "express";
const router = Router();

router.get('/', function(req: Request, res: Response) {
    res.send('hello world');
});

export const defaultController: Router = router;