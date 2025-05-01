export async function fetchStudents() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/students", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const result = await response.json();
  return result.data || result;
}
