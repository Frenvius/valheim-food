import React from 'react';
import Box from '@mui/material/Box';
import MaterialTable from '@material-table/core';
import Modal from '@mui/material/Modal';

import { diffTableStringArray, getTranslatedStrings, tableStringArray, unescapeJson } from '../../translate/data';
import style from './style.module.scss';

const TranslateModal = ({ data, open, setOpen }) => {
	const [dataTable, setDataTable] = React.useState([]);
	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		getTranslatedStrings().then((res) => {
			const englishStrings = unescapeJson(res.filter((item) => item.name === 'English')[0].strings);
			const languageString = unescapeJson(res.filter((item) => item.name === data.language)[0].strings);

			setDataTable(diffTableStringArray(languageString, JSON.parse(data.json), englishStrings));
		});
	}, [open]);

	const columns = [
		{
			field: 'original',
			title: 'Original',
			editable: 'never',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		},
		{
			field: 'translate',
			title: 'Translated',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		}
	];

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
		>
			<Box className={style.modal}>
				<MaterialTable
					columns={columns}
					data={dataTable}
					options={{
						search: false,
						draggable: false,
						emptyRowsWhenPaging: false,
						showTitle: false,
						pageSize: 1000,
						rowStyle: {
							padding: '0px'
						}
					}}
				/>
			</Box>
		</Modal>
	);
};

export default TranslateModal;
