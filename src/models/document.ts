
interface DocumentInterface {
    history: HistoryItem[]
}

interface HistoryItem {
    date: string,
    content: object
}

export class Document implements DocumentInterface {
    history : HistoryItem[] = [];

    /**
     * Add a new version
     * @param content The version to add
     * @param date ISO 8601 dates (server timezone) => https://en.wikipedia.org/wiki/ISO_8601
     */
    addVersion(content: object) {
        this.history.push(
            {
                date: new Date().toISOString(),
                content
            })
    }

    getLastVersion() {
        return this.history[this.history.length - 1];
    }
}