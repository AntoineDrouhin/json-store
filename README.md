
# Json-store

### Hypotheses

- 1 instance (no load balancing)
- In memory storage for fast access
- No persistence (let say the purpose of the webservice is cache)

- document change dates are set at the upload
- Interfaces && Classes names => UpperCamelCase
- everyOtherName => lowerCamelCase

## Features

### Handle documents and history

#### GET
- ***`/document`*** : get all documents
- ***`/document/:id`*** : get a document matching the id

#### POST
- ***`/document`*** : `{document: *}` : store a new document 
    - *return : {id: string, date: string}*
- ***`/document/:id`*** : `{document: *}` : store a new version of a document
    - *return : {id: string, date: string}*

![](https://thumbs.gfycat.com/WigglyEnviousFlatcoatretriever-size_restricted.gif)

### Diff documents versions

- ***`/document/:id/diff/:date/:date`*** : compute the difference between two versions of the document
    - *return : the diff with a classic user friendly traditionnal git diff format. (line start with + for addition and for deletion)
 
![](https://thumbs.gfycat.com/ThoughtfulDistantIbex-size_restricted.gif)

### next steps :
- Allow to delete documents.
- Handle array with difftool.
- Document with swagger
- Create a get route for documents/:id/:date to get a single version of a document
