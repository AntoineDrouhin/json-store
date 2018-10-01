
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
- ***`/document/:id`*** : get a document matching an id
- ***`/document/:id/current`*** : get the last version of a document


#### POST
- ***`/document`*** : `{document: *}` : store a new document 
    - *return : {id: string, date: string}*
- ***`/document/:id`*** : `{document: *}` : store a new version of a document
    - *return : {id: string, date: string}*

<img src="https://thumbs.gfycat.com/WigglyEnviousFlatcoatretriever-size_restricted.gif" width="600"/>

### Diff documents versions

- ***`/document/:id/diff/:date/:date`*** : compute the difference between two versions of the document
    - *return : the diff with a classic user friendly traditionnal git diff format. (line start with + for addition and for deletion)

<img src="https://ibin.co/4HeFTca66LUW.png" width="600"/>
 

<img src="https://thumbs.gfycat.com/ThoughtfulDistantIbex-size_restricted.gif" width="600"/>
 
### Automated tests with tape

<img src="https://ibin.co/4HeEkLk0HEsZ.png" width="600"/>

### next steps :
- Allow to delete documents.
- Handle array with difftool.
- Document with swagger
- Create a get route for documents/:id/:date to get a single version of a document
