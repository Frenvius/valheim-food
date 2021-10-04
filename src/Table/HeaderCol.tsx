import React, { FunctionComponent, PropsWithChildren } from "react";
import { Text, VStack } from "native-base";
import { DataTable } from "react-native-paper";

const HeaderCol: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <DataTable.Title style={{ alignItems: "center", justifyContent: "center" }}>
      <VStack alignItems="center">
        <Text fontWeight="bold" fontSize="md">
          {children}
        </Text>
      </VStack>
    </DataTable.Title>
  );
};
export default HeaderCol;
