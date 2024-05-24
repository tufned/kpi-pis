import {google} from "googleapis";
import env from "dotenv";
env.config();

const googleClientKey = process.env.GOOGLE_CLIENT_KEY;
const spreadsheetId = process.env.SHEET_ID;


export const connection = async (req, res, next) => {
	try {
		const auth = new google.auth.GoogleAuth({
			keyFile: googleClientKey,
			scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
		});

		const client = await auth.getClient();

		const sheets = google.sheets({ version: 'v4', auth: client });

		const metaData = await sheets.spreadsheets.get({ auth, spreadsheetId });

		req.auth = auth;
		req.sheets = sheets;
		req.metaData = metaData;
		next();

	} catch (err) {
		next(new Error(err));
	}
}


export const getSheet = async (req, res) => {
	const { auth, sheets, metaData } = req;

	const sheetTitle = req.params.sheetName || metaData.data.sheets[0].properties.title;

	const rowsMetaData = await sheets.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: sheetTitle
	});
	const sheetTable = rowsMetaData.data.values;

	res.status(200).json({
		success: true,
		title: sheetTitle,
		data: sheetTable
	})
}


export const errorHandler = (err, req, res, next) => {
	console.error(err);
	res.status(500).json({
		success: false,
		message: "Щось пішло не так"
	})
}