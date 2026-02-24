"use client";

import React from 'react';
import type { Column, ColumnDef } from '@tanstack/react-table';
import type { FoodItem } from '@/domain/types';
import { FoodImageCell } from './food-image-cell';
import { StationImageCell } from './station-image-cell';
import { RecipeCell } from './recipe-cell';
import { PrefabCell } from './prefab-cell';
import { SortIndicator } from '@/components/commons';

interface UseFoodColumnsOptions {
  useValharvestStations: boolean;
}

const SortableHeader = ({
  column,
  label,
  className = "",
}: {
  column: Column<FoodItem, unknown>;
  label: string;
  className?: string;
}) => (
  <button
    className={`flex items-center ${className}`}
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {label}
    <SortIndicator direction={column.getIsSorted()} />
  </button>
);

export const useFoodColumns = ({
  useValharvestStations,
}: UseFoodColumnsOptions): ColumnDef<FoodItem>[] => {
  return React.useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Img",
        size: 50,
        enableSorting: false,
        cell: ({ row }) => (
          <FoodImageCell
            imagePath={row.original.image}
            prefab={row.original.prefab}
            name={row.original.name}
          />
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => <SortableHeader column={column} label="Name" />,
        size: 300,
      },
      {
        accessorKey: "food",
        header: ({ column }) => <SortableHeader column={column} label="HP" />,
        size: 30,
      },
      {
        accessorKey: "stamina",
        header: ({ column }) => <SortableHeader column={column} label="Stam" />,
        size: 30,
      },
      {
        accessorKey: "burn",
        header: ({ column }) => <SortableHeader column={column} label="Burn" />,
        size: 65,
      },
      {
        accessorKey: "regen",
        header: ({ column }) => (
          <SortableHeader
            column={column}
            label="RGN"
            className="justify-center w-full"
          />
        ),
        size: 10,
        cell: ({ getValue }) => (
          <span className="block text-center">{getValue() as number}</span>
        ),
      },
      {
        accessorKey: "prefab",
        header: "Prefab ID",
        enableSorting: false,
        size: 120,
        cell: ({ getValue }) => <PrefabCell prefab={getValue() as string} />,
      },
      {
        accessorKey: "station",
        header: ({ column }) => (
          <SortableHeader
            column={column}
            label="Station"
            className="justify-center w-full"
          />
        ),
        size: 50,
        cell: ({ row }) => (
          <StationImageCell
            station={row.original.station}
            useValharvestStations={useValharvestStations}
          />
        ),
      },
      {
        accessorKey: "recipe",
        header: "Ingredients",
        enableSorting: false,
        size: 300,
        cell: ({ row }) => <RecipeCell ingredients={row.original.recipe} />,
      },
    ],
    [useValharvestStations]
  );
};
