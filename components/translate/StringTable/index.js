import React from 'react';
import MaterialTable from '@material-table/core';

import LanguageSelector from './LanguageSelector';
import style from './style.module.scss';
import { tableStringArray, convertNewTranslate, getTranslatedStrings, unescapeJson, downloadStrings } from '../data';
import { translateService, userService } from '../../../services';

const StringTable = () => {
	const [auth, setAuth] = React.useState(false);
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

		const subscription = userService.user.subscribe((x) => setAuth(x));
		return () => subscription.unsubscribe();
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

	const handleDownloadStrings = (strings) => {
		let stringsToDownload = {};
		for (const string of strings) {
			stringsToDownload[string.string] = string.translate;
		}
		const json = JSON.stringify(stringsToDownload);
		downloadStrings(json, language);
	};

	let exportFunction;
	if (auth) {
		exportFunction = {
			exportMenu: [
				{
					label: 'Export Strings',
					exportFunc: (cols, datas) => handleDownloadStrings(data)
				}
			]
		};
	}

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
					},
					...exportFunction
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

							const newJson = convertNewTranslate(englishStrings, [...dataUpdate]);

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
