export async function getUser(email: string) {
  try {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return { isAdmin: data.isAdmin };
  } catch (error) {
    throw error;
  }
}
