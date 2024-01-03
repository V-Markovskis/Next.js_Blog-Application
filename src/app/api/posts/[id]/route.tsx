import executeQuery from "../../../../../databaseConnection";
import { Posts } from "@/app/types/postsType";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const singlePost = (await executeQuery({
      query: "SELECT * FROM posts WHERE id = ?;",
      values: [id],
    })) as Posts[];

    if (singlePost.length === 0) {
      return { status: 404, json: { message: "No post found" } };
    }

    const post = singlePost[0];

    const tags = await executeQuery({
      query: `SELECT tags.* FROM tags
              INNER JOIN post_tags ON tags.id = post_tags.tag_id
              WHERE post_tags.post_id = ?;`,
      values: [id],
    });

    const comments = await executeQuery({
      query: `SELECT * FROM comments WHERE post_id = ?`,
      values: [id],
    });

    console.log("comments in backend", comments);

    const postWithTagsAndComments = { ...post, tags, comments };

    // Successfully retrieved post
    return Response.json({ post: postWithTagsAndComments });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { status: 500, json: { message: "Internal server error" } };
  }
}
