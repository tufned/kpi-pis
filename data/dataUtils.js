import fs from 'node:fs';
import path from "node:path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readData = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(path.join(__dirname, './data.json'), "utf-8", (err, data) => {
			if (err) return reject(err);
			resolve(JSON.parse(data));
		});
	});
};