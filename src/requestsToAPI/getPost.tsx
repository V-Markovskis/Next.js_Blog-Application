export async function getPost(id: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      next: {
        revalidate: 0,
      },
    });

    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Error in GET request for single post:", error);
    throw error;
  }
}
