"use client";

import React from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { getIngredientImageFallbacks } from "@/components/commons";

interface Ingredient {
  m_amount: number;
  m_resItem: { name: string };
}

export interface RecipeCellProps {
  ingredients: Ingredient[];
}

interface IngredientImageProps {
  name: string;
  className?: string;
}

const IngredientImage: React.FC<IngredientImageProps> = ({
  name,
  className = "w-8 h-8 relative z-10",
}) => {
  const fallbacks = React.useMemo(
    () => getIngredientImageFallbacks(name),
    [name]
  );

  const [imgSrc, setImgSrc] = React.useState(fallbacks[0]);
  const [fallbackIndex, setFallbackIndex] = React.useState(0);

  React.useEffect(() => {
    setImgSrc(fallbacks[0]);
    setFallbackIndex(0);
  }, [fallbacks]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={name}
      className={className}
      onError={() => {
        const nextIndex = fallbackIndex + 1;
        if (nextIndex < fallbacks.length) {
          setFallbackIndex(nextIndex);
          setImgSrc(fallbacks[nextIndex]);
        }
      }}
    />
  );
};

export const RecipeCell: React.FC<RecipeCellProps> = ({ ingredients }) => {
  const recipe = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      if (ingredients?.[i]) {
        items.push({
          amount: ingredients[i].m_amount,
          name: ingredients[i].m_resItem.name,
        });
      }
    }
    return items;
  }, [ingredients]);

  return (
    <div className="flex flex-wrap gap-2 min-w-[270px]">
      {recipe.map((ingredient) => {
        if (!ingredient.name) return null;
        return (
          <Tooltip
            key={ingredient.name}
            content={`${ingredient.amount}x ${ingredient.name}`}
          >
            <span className="inline-flex items-center w-[62px] h-10 rounded-lg overflow-hidden bg-[var(--ingredient-card-bg)] cursor-pointer">
              <span className="w-6 h-full flex items-center justify-center font-bold text-sm text-foreground">
                {ingredient.amount}
              </span>
              <span className="relative flex-1 h-full flex items-center justify-center ingredient-card-bg">
                <IngredientImage name={ingredient.name} />
              </span>
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
};
