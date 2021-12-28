import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import languageList from '../../data/languages.json';
import { getTranslatedStringsPercentage } from '../../data';
import style from '../style.module.scss';
import FormControl from '@mui/material/FormControl';
import React from 'react';

const LanguageSelector = ({handleChange, language}) => {
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
				{languageList.map(language => {
					const percentage = getTranslatedStringsPercentage(language.code);
					return (
						<MenuItem key={language.code} value={language.code} className={style.languageOption}>
							<span>{language.name}</span>
							{percentage}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	)
}

export default LanguageSelector;