import { FoodTable } from "@/components/food-table";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          Check out this project repos on Github:{" "}
          <a
            href="https://github.com/Frenvius/valheim-food"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            This Table
          </a>{" "}
          <a
            href="https://github.com/Frenvius/valharvest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Valharvest mod
          </a>
        </p>
        <p>
          Displays food items from Valharvest mod and their stats. Sort for
          each stat by clicking the headers. All stats and images were pulled
          from the Valheim Wiki
        </p>
        <p className="text-yellow-600">Page under construction</p>
      </div>
      <FoodTable />
    </div>
  );
}
