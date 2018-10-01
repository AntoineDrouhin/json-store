
interface DocumentInterface {
    history: HistoryItem[]
}

interface HistoryItem {
    date: string,
    version: object
}

export class Document implements DocumentInterface {
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