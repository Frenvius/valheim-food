import React, { FunctionComponent, PropsWithChildren } from 'react';
import { VStack } from 'native-base';
import { DataTable } from 'react-native-paper';

const Cell: FunctionComponent<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<DataTable.Cell style={{ justifyContent: 'center' }}>
			<VStack alignItems="center">{children}</VStack>
		</DataTable.Cell>
	);
};

export default Cell;
