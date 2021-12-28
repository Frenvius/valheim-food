import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MaterialTable from '@material-table/core';
import SaveIcon from '@mui/icons-material/Save';

import TranslateModal from './modal';

const AdminPanel = () => {
	const [password, setPassword] = React.useState('');
	const [auth, setAuth] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [modalData, setModalData] = React.useState({language: 'English', json: '{}'});
	const [open, setOpen] = React.useState(false);

	const handleOpen = rowData => {
		setModalData(rowData);
		setOpen(true);
	};

	React.useEffect(() => {
		if (auth) {
			fetch('/api/getTranslations')
				.then(res => res.json())
				.then(res => {
					setData(res);
				});
		}
	}, [auth]);

	const handleChange = event => {
		setPassword(event.target.value);
	};

	const columns = [
		{
			field: 'id',
			title: 'ID',
			width: '20px',
			editable: 'never',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		},
		{
			field: 'language',
			title: 'Language',
			editable: 'never',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		},
		{
			field: 'json',
			title: 'JSON',
			cellStyle: { padding: '5px' },
			headerStyle: { padding: '5px' }
		}
	];

	const handleSubmit = async event => {
		event.preventDefault();
		const response = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: password
			})
		});

		if (response.ok) {
			setAuth(true);
		} else {
			window.location.href = '/';
		}
	};

	return (
		<>
			{!auth && (
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '25ch' }
					}}
					onSubmit={handleSubmit}
					autoComplete="off"
				>
					<TextField
						id="outlined-multiline-flexible"
						label="Password"
						type={'password'}
						onChange={handleChange}
					/>
				</Box>
			)}
			{auth && (
				<>
					<MaterialTable
						columns={columns}
						data={data}
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
						onRowClick={(event, rowData) => {
							handleOpen(rowData);
						}}
						actions={[
							{
								icon: SaveIcon,
								tooltip: 'Save String',
								onClick: (event, rowData) => {
									fetch('/api/saveToFile', {
										method: 'POST',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify(rowData)
									});
								}
							}
						]}
					/>
					<TranslateModal data={modalData} open={open} setOpen={setOpen} />
				</>
			)}
		</>
	);
};

export default AdminPanel;
