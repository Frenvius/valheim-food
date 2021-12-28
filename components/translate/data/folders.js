const fs = require('fs');

const languageList = require('../data/languages.json');

for (const language of languageList) {
	if (!fs.existsSync(`./${language.code}/`)) {
		console.log(`Creating folder for ${language.name}`);
		fs.mkdirSync(`./${language.code}/`);
	}

	const files = ['strings.json'];

	for (const file of files) {
		console.log(`Creating file for ${language.name}`);
		fs.writeFileSync(`./${language.code}/${file}`, '{}');
	}
}
