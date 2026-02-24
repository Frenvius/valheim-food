export interface User {
  id: number;
  username: string;
  email: string;
}

/** @deprecated Use User instead - token is now stored in HttpOnly cookie */
export interface UserWithToken extends User {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AdminPanelProps {}
