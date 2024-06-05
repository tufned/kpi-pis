import express from 'express';
import {serveIndexView, socketHandler, redirect} from './controllers/socketController.js';
import { Server } from 'socket.io';

import env from 'dotenv';
env.config();
const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(express.static('public'));

app.get('/', redirect);
app.get('/socket', serveIndexView);

const server = app.listen(port, () => console.log('Listening on port ' + port))

export const io = new Server(server);

io.on('connection', socketHandler);