import foodStrings from './English/foods.json';
import ingredientStrings from './English/ingredients.json';
import pieceStrings from './English/pieces.json';
import plantStrings from './English/plants.json';
import React from 'react';

const allStrings = {
	...foodStrings,
	...ingredientStrings,
	...pieceStrings,
	...plantStrings
};

const getAllDescriptions = () => {
	const descriptions = {};
	Object.keys(allStrings).forEach(key => {
		if (key.includes('_desc')) {
			descriptions[key] = allStrings[key];
		}
	});
	return descriptions;
};

const getTranslatedStrings = language => {
	try {
		const food = require(`./${language}/foods.json`);
		const ingredient = require(`./${language}/ingredients.json`);
		const piece = require(`./${language}/pieces.json`);
		const plant = require(`./${language}/plants.json`);

		return {
			...food,
			...ingredient,
			...piece,
			...plant
		};
	} catch (error) {
		const strings = require(`./${language}/strings.json`);

		return {
			...strings
		};
	}
};

const getPercentageColors = percentage => {
	const colors = {
		'0': '#ff0000',
		'25': '#ff7f00',
		'50': '#ffcb00',
		'100': '#009300'
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

const getTranslatedStringsPercentage = language => {
	const translatedStrings = getStringsWithoutDesc(language);
	const totalStrings = Object.keys(getStringsWithoutDesc('English')).length;
	const translatedStringsCount = Object.keys(translatedStrings).length;
	const percentage = Math.round((translatedStringsCount / totalStrings) * 100);
	const color = getPercentageColors(percentage);
	return <span style={{ color: `${color}`, marginLeft: '15px' }}>{percentage}%</span>;
};

const tableStringArray = language => {
	let strings = [];

	const allTexts = getTranslatedStrings(language);

	for (const key in allStrings) {
		if (allStrings[key] !== 'ㅤ') {
			strings.push({
				string: key,
				english: allStrings[key],
				translate: allTexts[key]
			});
		}
	}
	return strings;
};

const diffTableStringArray = (language, strings) => {
	const tableStrings = [];
	const allTexts = getTranslatedStrings(language);

	for (const key in strings) {
		if (strings[key] !== 'ㅤ') {
			if (allTexts[key] !== strings[key]) {
				tableStrings.push({
					string: key,
					original: allStrings[key],
					translate: strings[key]
				});
			}
		}
	}
	return tableStrings;
};

const getStringsWithoutDesc = language => {
	let strings = {};

	const allTexts = getTranslatedStrings(language);

	for (const key in allStrings) {
		if (allStrings[key] !== 'ㅤ') {
			if (allTexts[key] !== undefined) {
				strings[key] = allTexts[key];
			}
		}
	}
	return strings;
};

const convertNewTranslate = (language, newTranslate) => {
	const descriptions = getAllDescriptions();
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

export { tableStringArray, getTranslatedStringsPercentage, convertNewTranslate, diffTableStringArray };
