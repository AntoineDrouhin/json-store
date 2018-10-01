
import {Router, Request, Response} from "express";
import { HistoryItem, documentStore } from "../store"

const router = Router();

/**
 * Ensure that post operation have a "document" element in their body
 */
router.post('*', function(req: Request, res: Response, next) {
    if (req.body.document == undefined) {
        res.status(400).send("No document defined");
    }
    next();
})

router.post('/', function(req: Request, res: Response) {
    const document : Object = req.body.document;    
    const id = documentStore.addDocument(document);
    res.send(id); 
});

router.post('/:id', function(req: Request, res: Response) {
    if (documentStore.documents[req.params.id] == undefined) {
        return res.status(400).send("Unknown document id");
    }

    const document : Object = req.body.document;
    res.send(documentStore.documents[req.params.id].addVersion(document));
    
});

router.get('/', function(req: Request, res: Response) {    
    res.send(documentStore.documents);
});

// router.get('/:id', function(req: Request, res: Response) {
// });

// router.get('/:id/current', function(req: Request, res: Response) {
// });


export const documentController: Router = router;