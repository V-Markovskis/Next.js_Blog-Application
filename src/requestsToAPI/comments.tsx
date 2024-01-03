import { Comments } from "@/app/Components/Comments/CommentsForPost";

export async function postComments(comment: Comments) {
  try {
    const res = await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function deleteComment(comment_id: number) {
  try {
    console.log("Deleted comment:", comment_id);
    const res = await fetch("http://localhost:3000/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment_id }),
    });
    return res;
  } catch (error) {
    throw error;
  }
}
