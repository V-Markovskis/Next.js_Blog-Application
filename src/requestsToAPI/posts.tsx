import { valuesToPost } from "@/app/Components/NewPost";

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

export async function deletePost(postId: number) {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });

    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
}

export async function updatePost(formValues: valuesToPost) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
}
