export async function fetchEmployees() {
  const response = await fetch("https://dummyjson.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  const data = await response.json();
  return data.users;
}

