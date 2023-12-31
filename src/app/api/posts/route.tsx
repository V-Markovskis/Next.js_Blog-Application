import executeQuery from "../../../../databaseConnection";
import { Posts } from "@/app/types/postsType";

export async function GET() {
  try {
    const posts = (await executeQuery({
      query: "SELECT * FROM posts",
      values: [],
    })) as Posts[];

    if (posts.length === 0) {
      return { status: 404, json: { message: "No posts found" } };
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
