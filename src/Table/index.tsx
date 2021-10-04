import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ImageSourcePropType } from "react-native";
import { Text, Image, HStack, Link, VStack } from "native-base";
import { DataTable } from "react-native-paper";
import foods, { Food } from "../data/food";
import HeaderCol from "./HeaderCol";
import Cell from "./Cell";
import {
  sortByFoodIngredients,
  sortByFoodName,
  sortByPrep,
  sortByHealth,
  sortByDuration,
  sortByStamina,
} from "./sorters";

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
          <Image size="sm" source={icon} alt={name} />
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
        <Image size="xs" source={item.icon} alt={item.name} />
        <Text key={item.name}>{`${item.name} x${amount}`}</Text>
      </HStack>
    </Link>
  );
};

export default function Content(): React.ReactElement<unknown> {
  const [sortedData, setSortedData] = useState<Food[]>([]);
  const [sortRule, setSortRule] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<
    "none" | "ascending" | "descending"
  >("none");

  const sorter = useCallback(
    (a: Food, b: Food) => {
      const reverse = sortDirection === "descending";
      switch (sortRule) {
        case "FOOD":
          return sortByFoodName(a, b) * (reverse ? -1 : 1);
        case "INGREDIENTS":
          return sortByFoodIngredients(a, b) * (reverse ? -1 : 1);
        case "PREP":
          return sortByPrep(a, b) * (reverse ? -1 : 1);
        case "HEALTH":
          return sortByHealth(a, b) * (reverse ? -1 : 1);
        case "STAMINA":
          return sortByStamina(a, b) * (reverse ? -1 : 1);
        case "DURATION":
          return sortByDuration(a, b) * (reverse ? -1 : 1);
        default:
          return 0;
      }
    },
    [sortRule, sortDirection],
  );

  useEffect(() => {
    if (sortDirection !== "none" && sortRule) {
      setSortedData([...foods.sort(sorter)]);
    } else {
      setSortedData(foods);
    }
  }, [sortRule, sortDirection, sorter]);

  const onSortDirectionToggled = useCallback((name, direction) => {
    setSortRule(name);
    setSortDirection(direction);
  }, []);

  const renderContent = useCallback(() => {
    return sortedData.map((food, idx) => {
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
    });
  }, [sortedData]);
  return (
    <DataTable>
      <DataTable.Header>
        <HeaderCol
          sortDirection={sortRule === "FOOD" ? sortDirection : "none"}
          onSortDirectionToggled={onSortDirectionToggled}
          name="FOOD"
        />
        <HeaderCol
          sortDirection={sortRule === "INGREDIENTS" ? sortDirection : "none"}
          onSortDirectionToggled={onSortDirectionToggled}
          name="INGREDIENTS"
        />
        <HeaderCol
          sortDirection={sortRule === "PREP" ? sortDirection : "none"}
          onSortDirectionToggled={onSortDirectionToggled}
          name="PREP"
        />
        <HeaderCol
          sortDirection={sortRule === "HEALTH" ? sortDirection : "none"}
          onSortDirectionToggled={onSortDirectionToggled}
          name="HEALTH"
        />
        <HeaderCol
          sortDirection={sortRule === "STAMINA" ? sortDirection : "none"}
          onSortDirectionToggled={onSortDirectionToggled}
          name="STAMINA"
        />
        <HeaderCol
          sortDirection={sortRule === "DURATION" ? sortDirection : "none"}
          onSortDirectionToggled={onSortDirectionToggled}
          name="DURATION"
        />
      </DataTable.Header>
      {renderContent()}
    </DataTable>
  );
}
