import ejs from 'ejs';
import express from 'express';
import {socket, socketRedirect} from './controllers/socketController.js';

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(express.static('public'));


app.get('/', socketRedirect);
app.get('/socket', socket);

app.use((err, req, res, next) => {
	console.error(err);
});


export default app;