import { User } from "@/functions/auth.functions";

export const userTable: User[] = [
  {
    id: "34899291-0d04-4d0b-8908-77ead3d95441",
    fullName: "System Admin",
    email: "admin@nodeb.com.br",
    password: "n0d3bSys",
    roles: ["ADMIN"],
  },
  {
    id: "58f6b8a6-44e8-4d18-9248-0c3a3286ac9a",
    fullName: "Demo User",
    email: "demo@nodeb.com.br",
    password: "demoNodeb",
    roles: ["DEMO"],
  },
];
