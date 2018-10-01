
import {Router, Request, Response} from "express";
import { documentStore } from "../models"
import compareObjects from "../tools/compareObjects";

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

/**
 * Ensure that provided id is valid
 */
router.use("/:id", function(req: Request, res: Response, next) {
    if (documentStore.documents[req.params.id] == undefined) {
        return res.status(400).send("Unknown document id");
    }
    next();
})

/**
 * Post new document
 */
router.post('/', function(req: Request, res: Response) {
    const document : Object = req.body.document;    
    const id = documentStore.addDocument(document);
    res.send({id, date: documentStore.documents[id].history[0].date}); 
});

/**
 * Add a new version to an existing document
 */
router.post('/:id', function(req: Request, res: Response) {
    const document : Object = req.body.document;
    documentStore.documents[req.params.id].addVersion(document)
    const history = documentStore.documents[req.params.id].history
    res.send({id: req.params.id, date: history[history.length -1].date });
    
});

/**
 * get all documents
 */
router.get('/', function(req: Request, res: Response) {    
    res.send(documentStore.documents);
});

/**
 * Get a document by id
 */
router.get('/:id', function(req: Request, res: Response) {
    res.send(documentStore.documents[req.params.id]);
});

/**
 * Get the last version of a document
 */
router.get('/:id/current', function(req: Request, res: Response) {
    res.send(documentStore.documents[req.params.id].getLastVersion());
});

/**
 * Diff 2 versions of an object, by providing the date of the versions
 */
router.get('/:id/diff/:date1/:date2', function(req: Request, res: Response) {
    let document = documentStore.documents[req.params.id];
    let version1: any =  document.history.filter(item => item.date === req.params.date1);
    let version2: any =  document.history.filter(item => item.date === req.params.date2);
    
    (version1.length == 0 || version2.length == 0) && res.status(400).send("Invalid date");

    version1 = version1[0];
    version2 = version2[0];

    const diff = compareObjects(version1.content, version2.content);

    res.send(diff);
});


export const documentController: Router = router;