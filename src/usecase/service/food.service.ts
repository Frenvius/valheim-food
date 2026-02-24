import { HttpClient } from "@/adapter/http";

class FoodService extends HttpClient {
}

export const foodService = new FoodService();
