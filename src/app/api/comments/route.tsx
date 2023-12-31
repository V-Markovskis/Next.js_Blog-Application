import executeQuery from "../../../../databaseConnection";
import { ResultSetHeader } from "mysql2";

export async function POST(request: Request) {
  try {
    const { author_name, comment_context, post_id } = await request.json();
    const postResult = (await executeQuery({
      query:
        "INSERT INTO comments (author_name, comment_context, post_id) VALUES (?, ?, ?);",
      values: [author_name, comment_context, post_id],
    })) as ResultSetHeader;

    return Response.json({ message: "Comment created successfully" });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { status: 500, json: { message: "Internal server error" } };
  }
}

export async function PUT(request: Request) {
  try {
    const { comment_context, id } = await request.json();
    console.log("Updating comment: ", id, comment_context);
    const updateResult = (await executeQuery({
      query: "UPDATE comments SET comment_context = ? WHERE id = ?",
      values: [comment_context, id],
    })) as ResultSetHeader;

    return Response.json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating comments:", error);
    return { status: 500, json: { message: "Internal server error" } };
  }
}

export async function DELETE(request: Request) {
  try {
    const { comment_id } = await request.json();
    const deleteResult = (await executeQuery({
      query: "DELETE FROM comments WHERE id = ?",
      values: [comment_id],
    })) as ResultSetHeader;

    return Response.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comments:", error);
    return { status: 500, json: { message: "Internal server error" } };
  }
}
