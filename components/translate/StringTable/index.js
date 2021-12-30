import React from 'react';
import MaterialTable from '@material-table/core';

import LanguageSelector from './LanguageSelector';
import style from './style.module.scss';
import { tableStringArray, convertNewTranslate, getTranslatedStrings, unescapeJson } from '../data';
import { translateService } from '../../../services';

const StringTable = () => {
	const [data, setData] = React.useState([]);
	const [allStrings, setAllStrings] = React.useState([]);
	const [language, setLanguage] = React.useState('English');
	const [countPending, setCountPending] = React.useState(0);
	const [englishStrings, setEnglishStrings] = React.useState([]);

	const handleChange = (event) => {
		setLanguage(event.target.value);
	};

	React.useEffect(() => {
		translateService.getPendingStrings(language).then((res) => {
			if (res) {
				setCountPending(res.count);
			}
		});

		getTranslatedStrings().then((res) => {
			const englishStrings = unescapeJson(res.filter((item) => item.name === 'English')[0].strings);
			const languageString = unescapeJson(res.filter((item) => item.name === language)[0].strings);
			setEnglishStrings(englishStrings);
			setAllStrings(res);

			setData(tableStringArray(languageString, englishStrings));
		});
	}, [language]);

	const columns = [
		{
			field: 'string',
			title: 'String',
			width: '20px',
			editable: 'never',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		},
		{
			field: 'english',
			title: 'English Name',
			editable: 'never',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		},
		{
			field: 'translate',
			title: 'Translate',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		}
	];

	return (
		<div className={style.stringTable}>
			<LanguageSelector
				language={language}
				handleChange={handleChange}
				translated={allStrings}
				englishStrings={englishStrings}
			/>
			<div className={style.pending} style={{ color: 'red', marginLeft: '15px' }}>
				<span>{countPending} pending translations</span>
			</div>
			<MaterialTable
				title="Foods"
				columns={columns}
				data={data}
				className={style.foodTable}
				options={{
					search: false,
					draggable: false,
					pageSize: 1000,
					emptyRowsWhenPaging: false,
					showTitle: false,
					rowStyle: {
						padding: '0px'
					}
				}}
				editable={{
					onBulkUpdate: (changes) =>
						new Promise((resolve, reject) => {
							const dataUpdate = [...data];
							for (const key in changes) {
								const { newData, oldData } = changes[key];

								const index = oldData.tableData.id;
								dataUpdate[index] = newData;
							}

							const newJson = convertNewTranslate(englishStrings,  [...dataUpdate]);

							const dataSend = {
								language: language,
								data: newJson
							};

							translateService.saveTranslate(dataSend).then(() => {
								resolve();
							});
						})
				}}
			/>
		</div>
	);
};

export default StringTable;
