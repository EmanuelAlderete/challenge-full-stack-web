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

export async function updateStudent(updatedStudent) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/students/${updatedStudent.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedStudent),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update student");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to update student:", error);
    throw error;
  }
}

export async function deleteStudent(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/students/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete student");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to delete student:", error);
    throw error;
  }
}
