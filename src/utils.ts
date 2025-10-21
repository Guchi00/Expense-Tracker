export const getExpenseFromLocalStorage = () => {
  const stored = localStorage.getItem("expenses");
  return stored ? JSON.parse(stored) : [];
};

export const getExpenseFromAPI = async () => {
  const response = await fetch(
    `https://68e8e709f2707e6128ccb333.mockapi.io/expenses`
  );
  if (!response.ok) throw new Error("Failed to fetch from API");
  return await response.json();
};
