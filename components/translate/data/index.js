import React from 'react';
import { translateService } from 'services';

const getAllDescriptions = (englishStrings) => {
	const descriptions = {};
	Object.keys(englishStrings).forEach((key) => {
		if (key.includes('_desc')) {
			descriptions[key] = englishStrings[key];
		}
	});
	return descriptions;
};

const getTranslatedStrings = async () => {
	return await translateService.getAllStrings();
};

const getPercentageColors = (percentage) => {
	const colors = {
		0: '#ff0000',
		25: '#ff7f00',
		50: '#ffcb00',
		100: '#009300'
	};

	switch (true) {
		case percentage < 25:
			return colors['0'];
		case percentage < 50:
			return colors['25'];
		case percentage < 100:
			return colors['50'];
		case percentage === 100:
			return colors['100'];
		default:
			return colors['100'];
	}
};

const unescapeJson = (json) => {
	if (json.includes('\\')) {
		return JSON.parse(json?.replace(/\\/g,""));
	} else {
		return JSON.parse(json);
	}
};

const getTranslatedStringsPercentage = (translated, englishStrings) => {
	const totalStrings = Object.keys(englishStrings).length;
	const translatedStringsCount = Object.keys(translated).length;
	const percentage = Math.round((translatedStringsCount / totalStrings) * 100);
	const color = getPercentageColors(percentage);
	return <span style={{ color: `${color}`, marginLeft: '15px' }}>{percentage}%</span>;
};

const tableStringArray = (languageString, englishStrings) => {
	let strings = [];

	for (const key in englishStrings) {
		if (englishStrings[key] !== 'u3164') {
			strings.push({
				string: key,
				english: englishStrings[key],
				translate: languageString[key]
			});
		}
	}
	console.log(strings)
	return strings;
};

const diffTableStringArray = (languageString, strings, englishStrings) => {
	const tableStrings = [];

	for (const key in strings) {
		if (strings[key] !== 'u3164') {
			if (languageString[key] !== strings[key]) {
				tableStrings.push({
					string: key,
					original: englishStrings[key],
					translate: strings[key]
				});
			}
		}
	}
	return tableStrings;
};

const convertNewTranslate = (englishStrings, newTranslate) => {
	const descriptions = getAllDescriptions(englishStrings);
	const newTexts = {};

	for (const key in newTranslate) {
		if (newTranslate[key].translate !== undefined) {
			newTexts[newTranslate[key].string] = newTranslate[key].translate;
		}
	}

	return {
		...descriptions,
		...newTexts
	};
};

export {
	tableStringArray,
	getTranslatedStringsPercentage,
	convertNewTranslate,
	diffTableStringArray,
	getTranslatedStrings,
	unescapeJson
};
