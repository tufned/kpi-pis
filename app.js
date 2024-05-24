import express from 'express';
import {connection, errorHandler, getSheet} from "./controllers/sheetsController.js";
import {getStudent} from "./controllers/studentController.js";

const app = express();
app.use(express.json());

app.use('/sheets', connection);
app.get('/sheets/:sheetName', getSheet);

app.get('/student/:moodleLogin', getStudent);

app.use(errorHandler);


export default app;