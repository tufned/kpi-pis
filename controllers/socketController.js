import {readData} from '../data/dataUtils.js';
import {io} from '../app.js';

export const redirect = (req, res) => {
	res.redirect('/socket');
}

export const serveIndexView = (req, res) => {
	res.render('index', {
		data: 'hello world',
	});
}


let usersCount = 0;
export const socketHandler = async (socket) => {
	console.log('user connected');
	io.emit('user count', ++usersCount);

	socket.on('message', async (data) => {
		const ipn = data.ipn
		socket.broadcast.emit('person message', {
			success: true,
			data: ipn
		});

		if (isNaN(ipn)) return io.emit('error', {
			success: false,
			message: "Неправильний ІПН"
		});

		const fileData = await readData();
		const record = fileData.find(elem => +elem.ipn === +ipn);
		console.log(record);

		if (record === undefined) return io.emit('error', {
			success: false,
			message: "Орендодавця з таким ІПН не знайдено"
		});

		io.emit('message', {
			success: true,
			data: record
		});
	})

	socket.on('disconnect', () => {
		io.emit('user count', --usersCount);
		console.log('user disconnected');
	});
}