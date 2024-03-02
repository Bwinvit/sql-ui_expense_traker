export const isAdminOrCreatedBy = ({ req: { user } }) => {
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
