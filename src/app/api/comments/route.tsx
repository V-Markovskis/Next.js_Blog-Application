import executeQuery from "../../../../databaseConnection";
import { ResultSetHeader } from "mysql2";

export async function POST(request: Request) {
  try {
    const { author, content, post_id } = await request.json();
    console.log("comment values", author, content, post_id);
    const postResult = (await executeQuery({
      query:
        "INSERT INTO comments (author_name, comment_context, post_id) VALUES (?, ?, ?);",
      values: [author, content, post_id],
    })) as ResultSetHeader;

    return Response.json({ message: "Comment created successfully" });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { status: 500, json: { message: "Internal server error" } };
  }
}
