import React from 'react';
import Box from '@mui/material/Box';
import MaterialTable from '@material-table/core';
import Modal from '@mui/material/Modal';

import { diffTableStringArray } from '../../translate/data';
import style from './style.module.scss';

const TranslateModal = ({ data, open, setOpen }) => {
	const handleClose = () => {
		setOpen(false);
	};

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
					data={diffTableStringArray(data.language, JSON.parse(data.json))}
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
