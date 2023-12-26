import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../../databaseConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await executeQuery({
      query: "SELECT * FROM posts",
      values: [],
    });
    res.status(200).json({ posts: posts });
  }
}
