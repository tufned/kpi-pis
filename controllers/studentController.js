import env from 'dotenv';
env.config();

const validLogin = process.env.MOODLE_LOGIN || "is-23fiot-22-114";

export const getStudent = (req, res, next) => {
	const login = req.params.moodleLogin;

	if (login !== validLogin) {
		res.status(401).json({
			success: false,
			message: "Unauthorized",
		})
	}

	res.status(200).json({
		success: true,
		data: {
			firstName: "Денис",
			lastName: "Фундерат",
			year: "2 курс",
			group: "ІС-23",
		}
	})
}