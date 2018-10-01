import { uuid } from "./tools/uuid";

export interface Document {
    history: HistoryItem[]
}

export interface HistoryItem {
    date: string,
    version: object
}

export class Document {
    history : HistoryItem[] = [];

    /**
     * Add a new version
     * @param version version to add
     * @param date ISO 8601 dates (server timezone) => https://en.wikipedia.org/wiki/ISO_8601
     */
    addVersion(version: object) {
        this.history.push(
            {
                date: new Date().toISOString(),
                version
            })
    }

    getLastVersion() {

    }
}

export interface DocumentStore {
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
