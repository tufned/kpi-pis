import app from './app.js';
import env from 'dotenv';
env.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Listening on port ' + port);
})