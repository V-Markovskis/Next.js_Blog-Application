import executeQuery from "../../../../databaseConnection";
import { Posts } from "@/app/types/postsType";
import { saveTags } from "@/app/api/new-post/route";

export async function GET() {
  try {
    const posts = (await executeQuery({
      query: "SELECT * FROM posts",
      values: [],
    })) as Posts[];

    if (posts.length === 0) {
      return Response.json({
        posts: [],
        status: 404,
        json: { message: "No posts found" },
      });
    }

    const postsWithTags = await Promise.all(
      posts.map(async (post) => {
        const tags = await executeQuery({
          query: `SELECT tags.* FROM tags
              INNER JOIN post_tags ON tags.id = post_tags.tag_id
              WHERE post_tags.post_id = ${post.id}`,
        });
        return { ...post, tags };
      })
    );

    // Successfully retrieved posts
    return Response.json({ posts: postsWithTags });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json({
      posts: [],
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}

export async function PUT(request: Request) {
  const { id, image_url, title, content, tags } = await request.json();
  try {
    const postUpdateResult = (await executeQuery({
      query:
        "UPDATE posts SET image_url = ?, title = ?, content = ? WHERE id = ?",
      values: [image_url, title, content, id],
    })) as Posts[];

    const tagsDeleteResult = (await executeQuery({
      query: "DELETE FROM post_tags WHERE post_id = ?",
      values: [id],
    })) as Posts[];

    const tagsUpdateResult = await saveTags(tags, id);

    // Successfully retrieved posts
    return Response.json("Post updates successfully!");
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { status: 500, json: { message: "Internal server error" } };
  }
}

export async function DELETE(request: Request) {
  try {
    const { postId }: { postId: number } = await request.json();

    const postTagsDeleteResult = (await executeQuery({
      query: "DELETE FROM post_tags WHERE post_id = ?",
      values: [postId],
    })) as Posts[];

    const postDeleteResult = (await executeQuery({
      query: "DELETE FROM posts WHERE id = ?",
      values: [postId],
    })) as Posts[];

    const postCommentsDeleteResult = (await executeQuery({
      query: "DELETE FROM comments WHERE post_id = ?",
      values: [postId],
    })) as Posts[];

    // Successfully retrieved posts
    return Response.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { status: 500, json: { message: "Internal server error" } };
  }
}

// type extractIndexType = {
//   id: number;
// };
//
// export async function POST(formValues: valuesToPost) {
//   try {
//     const postResult = (await executeQuery({
//       query: "INSERT INTO posts (image_url, title, content);",
//       values: [formValues.image_url, formValues.title, formValues.content],
//     })) as Posts[];
//
//     const postIdResult = (await executeQuery({
//       query: "SELECT LAST_INSERT_ID() as id",
//     })) as extractIndexType[];
//     const postId = postIdResult[0].id;
//     console.log("last posted ID posts table", postId);
//
//     console.log("formValues.image_url", formValues.image_url);
//     console.log("formValues.title", formValues.title);
//     console.log("formValues.tags", formValues.tags);
//     console.log("formValues.content", formValues.content);
//     const tagPromise = await Promise.all(
//       formValues.tags.map(async (tagName) => {
//         let tagId;
//
//         //check if the tag already exists
//         const tagResult = (await executeQuery({
//           query: "SELECT id FROM tags WHERE tag_name = ?",
//           values: [tagName],
//         })) as extractIndexType[];
//
//         console.log("Tag id is found in tags table", tagResult);
//
//         //if tag exists
//         if (tagResult.length > 0) {
//           tagId = tagResult[0].id;
//         } else {
//           //or insert new tag name
//           await executeQuery({
//             query: "INSERT INTO tags (tag_name) VALUES (?)",
//             values: [tagName],
//           });
//           //get last id of last entered id
//           const newTagIdResult = (await executeQuery({
//             query: "SELECT LAST_INSERT_ID() as id",
//           })) as extractIndexType[];
//           tagId = newTagIdResult[0].id;
//           console.log("Get last inserted ID", tagId);
//         }
//         //populate post_tags with result values
//         return executeQuery({
//           query: "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
//           values: [postId, tagId],
//         });
//       })
//     );
//     return Response.json({ message: "Post and tags created successfully." });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return { status: 500, json: { message: "Internal server error" } };
//   }
// }
