export async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      next: {
        revalidate: 0, // use 0 to opt out of using cache
      },
    });

    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
}
