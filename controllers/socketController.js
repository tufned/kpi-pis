
export const socketRedirect = (req, res) => {
	res.redirect('/socket');
}

export const socket = (req, res) => {
	res.render('index', {data: 'hello world'});
}