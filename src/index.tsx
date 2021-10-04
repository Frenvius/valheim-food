import React from "react";
import { Text, Container, ScrollView, Center } from "native-base";
import Table from "./Table";

export default function Content(): React.ReactElement {
  return (
    <Center w="100%" h="100vh">
      <Container w="100%" h="100%">
        <ScrollView w="100%" flex={1}>
          <Text fontSize="3xl">Valheim Food</Text>
          <Table />
        </ScrollView>
      </Container>
    </Center>
  );
}
