export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
