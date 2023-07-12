export const APP_ROUTES = {
  private: {
    dashboard: {
      name: "/dashboard",
      roles: ["ALL"],
    },
    settings: {
      name: "/settings",
      roles: ["ADMIN"],
    },
  },
  public: {
    login: "/",
    createUser: "/createUser",
  },
};
