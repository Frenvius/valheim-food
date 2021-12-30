import React from 'react';
import MaterialTable from '@material-table/core';
import SaveIcon from '@mui/icons-material/Save';

import TranslateModal from './modal';
import { translateService, userService } from 'services';

const AdminPanel = () => {
	const [auth, setAuth] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [modalData, setModalData] = React.useState({ language: 'English', json: '{}' });
	const [open, setOpen] = React.useState(false);
	const [reload, setReload] = React.useState(false);

	const handleOpen = (rowData) => {
		setModalData(rowData);
		setOpen(true);
	};

	React.useEffect(() => {
		translateService.getTranslations().then((res) => {
			setData(res);
		});

		const subscription = userService.user.subscribe((x) => setAuth(x));
		return () => subscription.unsubscribe();
	}, [auth, open, reload]);

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

	return (
		<>
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
									translateService.approveTranslation(rowData).then(() => {
										setReload(true);
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
