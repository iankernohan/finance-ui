export async function getTransactions() {
  const res = await fetch("http://localhost:5028/getTransactions");
  const data = await res.json();
  return data;
}

export async function getCategories() {
  const res = await fetch("http://localhost:5028/getAllCategories");
  const data = await res.json();
  return data;
}

export async function addTransaction(data: {
  amount: number;
  categoryId: number;
  subCategoryId: number | null;
}) {
  const res = await fetch("http://localhost:5028/addTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    return null;
  }
  const result = await res.json();
  return result;
}
