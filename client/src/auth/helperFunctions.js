export const checkIfAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt-token")) {
      return JSON.parse(localStorage.getItem("jwt-token"));
    } else {
      return false;
    }
};