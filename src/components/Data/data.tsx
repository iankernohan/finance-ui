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
