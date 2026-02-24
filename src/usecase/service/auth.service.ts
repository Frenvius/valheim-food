import { HttpClient } from "@/adapter/http";
import { API_ROUTES } from "@/domain/constants";
import type { User, LoginCredentials } from "@/domain/types";

class AuthService extends HttpClient {
  async login(credentials: LoginCredentials): Promise<User> {
    return this.post<User>(API_ROUTES.AUTH.LOGIN, credentials);
  }
}

export const authService = new AuthService();
