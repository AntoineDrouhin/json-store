
import {Router, Request, Response} from "express";
import { HistoryItem, documentStore } from "../store"

const router = Router();

router.post('/', function(req: Request, res: Response) {
    
    // if (invalid) => res.send("NONONO")

    const document : Object = req.body.document;
    
    const id = documentStore.addDocument(document);

    res.send(id);
    
});

router.post('/:id', function(req: Request, res: Response) {
    
    // if invalid => res.send("NONONO")

    // if valid => save
    
});

// router.get('/', function(req: Request, res: Response) {    
// });

// router.get('/:id', function(req: Request, res: Response) {
// });

// router.get('/:id/current', function(req: Request, res: Response) {
// });


export const documentController: Router = router;