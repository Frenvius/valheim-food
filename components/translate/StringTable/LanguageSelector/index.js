import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import languageList from '../../data/languages.json';
import { getTranslatedStringsPercentage, unescapeJson } from '../../data';
import style from '../style.module.scss';
import FormControl from '@mui/material/FormControl';
import React from 'react';

const LanguageSelector = ({ handleChange, language, translated, englishStrings }) => {
	const translatedNotEmpty = translated.length > 0;
	return (
		<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
			<Select
				labelId="demo-simple-select-standard-label"
				id="demo-simple-select-standard"
				value={language}
				onChange={handleChange}
				label="Age"
			>
				{translatedNotEmpty &&
					languageList.map((language) => {
						const languageString = unescapeJson(translated?.filter((item) => item.name === language.code)[0]?.strings);
						const percentage = getTranslatedStringsPercentage(languageString, englishStrings);
						return (
							<MenuItem key={language.code} value={language.code} className={style.languageOption}>
								<span>{language.name}</span>
								{percentage}
							</MenuItem>
						);
					})}
			</Select>
		</FormControl>
	);
};

export default LanguageSelector;
