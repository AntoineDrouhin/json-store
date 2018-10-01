
import express from 'express';
import { documentController } from "./controllers";
import bodyParser from "body-parser";

const app: express.Application = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/document", documentController);

app.listen(port, () => {
    console.log(`Listening at localhost:${port}/`);
});
