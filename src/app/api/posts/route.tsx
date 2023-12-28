import executeQuery from "../../../../databaseConnection";
import { Posts, Tag } from "@/app/posts/page";

export async function GET() {
  const posts = (await executeQuery({
    query: "SELECT * FROM posts",
    values: [],
  })) as Posts[];

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
  // res.status(200).json({ posts: postsWithTags });
  return Response.json({ posts: postsWithTags });
}

// import type { NextApiRequest, NextApiResponse } from "next";
// import executeQuery from "../../../databaseConnection";
// import { Posts, Tag } from "@/app/posts/page";
//
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     const posts = (await executeQuery({
//       query: "SELECT * FROM posts",
//       values: [],
//     })) as Posts[];
//
//     posts.map(async (post) => {
//       const tags = await new Promise((resolve, reject) =>
//         resolve(getTagsByPostId(post.id))
//       );
//       post.tags = tags as Tag[];
//     });
//
//     console.log("LOG HERE", posts);
//
//     res.status(200).json({ posts: posts });
//   }
// }
//
// const getTagsByPostId = (postId: number) => {
//   return executeQuery({
//     query: `SELECT * FROM post_tags WHERE post_id = ${postId}`,
//   });
// };
