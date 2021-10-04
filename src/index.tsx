import React from "react";
import { Text, Box, ScrollView, Center } from "native-base";
import Table from "./Table";

export default function Content(): React.ReactElement {
  return (
    <ScrollView w="100vw" h="100vh">
      <Center>
        <Box w="100%" h="100%" maxWidth={1200} minWidth={950}>
          <Text fontSize="3xl">Valheim Food</Text>
          <Table />
        </Box>
      </Center>
    </ScrollView>
  );
}
