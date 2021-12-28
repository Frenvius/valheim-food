import React from 'react';
import MaterialTable from '@material-table/core';

import LanguageSelector from './LanguageSelector';
import style from './style.module.scss';
import { tableStringArray, convertNewTranslate } from '../data';

const StringTable = () => {
	const [language, setLanguage] = React.useState('English');
	const [countPending, setCountPending] = React.useState(0);

	const handleChange = event => {
		setLanguage(event.target.value);
	};

	React.useEffect(() => {
		fetch(`/api/getPending?language=${language}`)
			.then(res => res.json())
			.then(res => {
				if (res) {
					setCountPending(res.count);
				}
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

	const data = tableStringArray(language);

	return (
		<div className={style.stringTable}>
			<LanguageSelector language={language} handleChange={handleChange} />
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
					onBulkUpdate: changes =>
						new Promise((resolve, reject) => {
							const dataUpdate = [...data];
							for (const key in changes) {
								const { newData, oldData } = changes[key];

								const index = oldData.tableData.id;
								dataUpdate[index] = newData;
							}

							const newJson = convertNewTranslate(language, [...dataUpdate]);

							const dataSend = {
								language: language,
								data: newJson
							};

							fetch('/api/saveTranslate', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(dataSend)
							});

							resolve();
						})
				}}
			/>
		</div>
	);
};

export default StringTable;
