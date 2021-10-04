import React, { FunctionComponent, useCallback } from "react";
import { Link, Text, VStack } from "native-base";
import { DataTable } from "react-native-paper";
interface Props {
  name: string;
  sortDirection: "none" | "ascending" | "descending";
  onSortDirectionToggled: (
    name: string,
    direction: "none" | "ascending" | "descending",
  ) => void;
}

const directions: ("none" | "ascending" | "descending")[] = [
  "none",
  "ascending",
  "descending",
];
const HeaderCol: FunctionComponent<Props> = ({
  name,
  sortDirection,
  onSortDirectionToggled,
}) => {
  const _onSortDirectionToggled = useCallback(() => {
    const matchingIdx = directions.findIndex((d) => d === sortDirection);
    const newIdx = (matchingIdx + 1) % directions.length;
    onSortDirectionToggled(name, directions[newIdx]);
  }, [sortDirection, onSortDirectionToggled, name]);

  return (
    <DataTable.Title
      style={{ alignItems: "center", justifyContent: "center" }}
      sortDirection={sortDirection === "none" ? undefined : sortDirection}
    >
      <Link onPress={_onSortDirectionToggled}>
        <VStack alignItems="center">
          <Text fontWeight="bold" fontSize="md">
            {name}
          </Text>
        </VStack>
      </Link>
    </DataTable.Title>
  );
};
export default HeaderCol;
