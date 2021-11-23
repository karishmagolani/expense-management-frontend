const API_ENDPOINT = "http://localhost:8080";

export const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
];
export const getCategories = async () => {
  const response = await fetch(`${API_ENDPOINT}/expense-categories/`, {
    headers: {
      "x-access-token": window.localStorage.getItem("token"),
    },
  });
  const _categories = await response.json();
  console.log("exp", _categories);
  return _categories;
};
