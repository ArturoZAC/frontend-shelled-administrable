export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type authStatus = "checking" | "authenticated" | "not-authenticated";
