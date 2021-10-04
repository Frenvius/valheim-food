import React, { FunctionComponent } from "react";
import { ImageSourcePropType } from "react-native";
import { Text, Image, HStack, Link, VStack } from "native-base";
import { DataTable } from "react-native-paper";
import foods, { Food } from "../data/food";
import HeaderCol from "./HeaderCol";
import Cell from "./Cell";

interface FoodCellProps {
  name: string;
  icon: ImageSourcePropType;
  link: string;
}
const FoodCell: FunctionComponent<FoodCellProps> = ({ name, icon, link }) => {
  return (
    <Cell>
      <Link href={link}>
        <VStack alignItems="center">
          <Image size="sm" source={icon} />
          {name}
        </VStack>
      </Link>
    </Cell>
  );
};
interface IngredientItemProps {
  item: Food;
  amount: ImageSourcePropType;
}
const IngredientItem: FunctionComponent<IngredientItemProps> = ({
  item,
  amount,
}) => {
  return (
    <Link href={item.link}>
      <HStack alignItems="center">
        <Image size="xs" source={item.icon} />
        <Text key={item.name}>{`${item.name} x${amount}`}</Text>
      </HStack>
    </Link>
  );
};

export default function Content(): React.ReactElement<unknown> {
  return (
    <DataTable>
      <DataTable.Header>
        <HeaderCol>FOOD</HeaderCol>
        <HeaderCol>INGREDIENTS</HeaderCol>
        <HeaderCol>Preparation</HeaderCol>
        <HeaderCol>HEALTH</HeaderCol>
        <HeaderCol>STAMINA</HeaderCol>
        <HeaderCol>DURATION</HeaderCol>
      </DataTable.Header>
      {foods.map((food, idx) => {
        return (
          <DataTable.Row key={`${food.name}-${idx}`}>
            <FoodCell name={food.name} icon={food.icon} link={food.link} />
            <Cell>
              {food.ingredients.length > 0 ? (
                food.ingredients.map((ing) => {
                  return (
                    <IngredientItem
                      key={ing.item.name}
                      item={ing.item}
                      amount={ing.amount}
                    />
                  );
                })
              ) : (
                <Text>-</Text>
              )}
            </Cell>
            <Cell>
              <Text>{food.cookedAt}</Text>
            </Cell>
            <Cell>
              <Text>{food.health}</Text>
            </Cell>
            <Cell>
              <Text>{food.stamina}</Text>
            </Cell>
            <Cell>
              <Text>{`${food.duration}s`}</Text>
            </Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
}
