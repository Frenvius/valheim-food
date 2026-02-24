import itemDropList from "@/data/foods/itemdrops.json";
import type { ItemDrop } from "@/domain/types";

class ValheimIconLookupService {
  private prefabToIcon: Map<string, string>;
  private rawNameToIcon: Map<string, string>;

  constructor() {
    this.prefabToIcon = new Map();
    this.rawNameToIcon = new Map();
    const items = itemDropList as ItemDrop[];
    for (const item of items) {
      const { prefab_name, raw_name, icon } = item.shared_data;
      this.prefabToIcon.set(prefab_name, icon);
      this.rawNameToIcon.set(raw_name, icon);
    }
  }

  getIcon(name: string): string | undefined {
    return this.prefabToIcon.get(name) ?? this.rawNameToIcon.get(name);
  }

  getIconPath(name: string): string {
    const icon = this.getIcon(name);
    return icon ? `/img/${icon}` : `/img/${name}.png`;
  }
}

export const valheimIconLookup = new ValheimIconLookupService();
