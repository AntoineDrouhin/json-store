import { uuid } from "../tools/uuid";
import { Document } from "./"

interface DocumentStore {
    documents: Documents;
    addDocument(document: Object): string;
    removeDocument(id: string): number;
}

interface Documents {
    [id: string]: Document
}

export const documentStore: DocumentStore  = {
    documents: {},
    addDocument(document) {
        let id : string;
        do{id = uuid()} while (this.documents[id] !== undefined) // #overkill

        this.documents[id] = new Document();
        this.documents[id].addVersion(document);
        return id;
    },
    removeDocument(id) {
        if (this.documents[id]) {
            delete this.documents[id]
            return 0;
        }
        else {
            return 1;
        }
    },
};
