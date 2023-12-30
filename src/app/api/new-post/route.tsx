import executeQuery from "../../../../databaseConnection";
import { Tag } from "@/app/types/tagType";
import { ResultSetHeader } from "mysql2";

type extractIndexType = {
  id: number;
};

export async function POST(request: Request) {
  try {
    // Destructure the fields from request.body
    const { image_url, title, tags, content } = await request.json();
    const postResult = (await executeQuery({
      query: "INSERT INTO posts (image_url, title, content) VALUES (?, ?, ?);",
      values: [image_url, title, content],
    })) as ResultSetHeader;

    const postId = postResult.insertId;

    const tagPromise = await Promise.all(
      tags.map(async (tagName: Tag) => {
        let tagId;

        //check if the tag already exists
        const tagResult = (await executeQuery({
          query: "SELECT id FROM tags WHERE tag_name = ?",
          values: [tagName],
        })) as extractIndexType[];

        console.log("Tag id is found in tags table", tagResult);

        //if tag exists
        if (tagResult.length > 0) {
          tagId = tagResult[0].id;
        } else {
          //or insert new tag name
          const newTag = (await executeQuery({
            query: "INSERT INTO tags (tag_name) VALUES (?)",
            values: [tagName],
          })) as ResultSetHeader;
          tagId = newTag.insertId;
          console.log("Get last inserted ID", tagId);
        }
        //populate post_tags with result values
        await executeQuery({
          query: "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
          values: [postId, tagId],
        });
      })
    );
    return Response.json({ message: "Post and tags created successfully." });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { status: 500, json: { message: "Internal server error" } };
  }
}

// export async function POST(request: Request) {
//     try {
//         // Destructure the fields from request.body
//         const { image_url, title, tags, content } = await request.json();
//         const postResult = (await executeQuery({
//             query: "INSERT INTO posts (image_url, title, content) VALUES (?, ?, ?);",
//             values: [image_url, title, content],
//         })) as valuesToPost[];
//
//         const postIdResult = (await executeQuery({
//             query: "SELECT LAST_INSERT_ID() as id",
//         })) as extractIndexType[];
//         const postId = postIdResult[0].id;
//         console.log("last posted ID posts table", postId);
//
//         const tagPromise = await Promise.all(
//             tags.map(async (tagName: Tag) => {
//                 let tagId;
//
//                 //check if the tag already exists
//                 const tagResult = (await executeQuery({
//                     query: "SELECT id FROM tags WHERE tag_name = ?",
//                     values: [tagName],
//                 })) as extractIndexType[];
//
//                 console.log("Tag id is found in tags table", tagResult);
//
//                 //if tag exists
//                 if (tagResult.length > 0) {
//                     tagId = tagResult[0].id;
//                 } else {
//                     //or insert new tag name
//                     await executeQuery({
//                         query: "INSERT INTO tags (tag_name) VALUES (?)",
//                         values: [tagName],
//                     });
//                     //get last id of last entered id
//                     const newTagIdResult = (await executeQuery({
//                         query: "SELECT LAST_INSERT_ID() as id",
//                     })) as extractIndexType[];
//                     tagId = newTagIdResult[0].id;
//                     console.log("Get last inserted ID", tagId);
//                 }
//                 //populate post_tags with result values
//                 await executeQuery({
//                     query: "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
//                     values: [postId, tagId],
//                 });
//             })
//         );
//         return Response.json({ message: "Post and tags created successfully." });
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         return { status: 500, json: { message: "Internal server error" } };
//     }
// }
