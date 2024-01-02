import { Comments } from "@/app/Components/Comments/CommentsForPost";

export async function postComments(comments: Comments) {
  try {
    const res = await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comments),
    });
  } catch (error) {
    throw error;
  }
}
