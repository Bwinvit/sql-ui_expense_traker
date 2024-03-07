import { Access } from "payload/config";

export const isAdminOrCreatedBy: Access = async ({ req: { user } }) => {
  if (user && user.role === "admin") {
    return true;
  }
  if (user) {
    return {
      createdBy: {
        equals: user.id,
      },
    };
  }

  return false;
};

export const isAdmin: Access = async ({ req: { user } }) => {
  if (user && user.role === "admin") {
    return true;
  }
  return false;
}

export const isAuthenticated: Access = async ({ req: { user } }) => {
  if (user) {
    return true;
  }
  return false;
}