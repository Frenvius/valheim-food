import React from "react";
import { Text, Box, ScrollView, Center, Icon, Link } from "native-base";
import Table from "./Table";
import { Feather } from "@expo/vector-icons";

export default function Content(): React.ReactElement {
  return (
    <ScrollView w="100vw" h="100vh">
      <Center>
        <Box w="100%" h="100%" maxWidth={1200} minWidth={950}>
          <Text fontSize="3xl">Valheim Food</Text>
          <Text fontSize="md">
            Check out the project on{" "}
            <Link href={"https://github.com/MayaSaringan/valheim-food"}>
              <Icon size="xs" as={<Feather name="github" />} color={"black"} />
              Github.
            </Link>
          </Text>
          <Text fontSize="md">
            Displays food items from Valheim and their stats. Sort for each stat
            by clicking the headers. All stats and images were pulled from the
            Valheim Wiki
          </Text>
          <Table />
        </Box>
      </Center>
    </ScrollView>
  );
}
