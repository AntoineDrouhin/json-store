
import express from 'express';
import { defaultController } from "./controllers";

const app: express.Application = express();

const port = process.env.PORT || 3000;

app.use("/", defaultController);

app.listen(port, () => {
    console.log(`Listening at localhost:${port}/`);
});
