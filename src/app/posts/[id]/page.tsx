import React from "react";
import { getPost } from "@/requestsToAPI/getPost";
import DisplaySinglePost from "@/app/Components/DisplaySinglePost/DisplaySinglePost";

export default async function PostDetails({
  params,
}: {
  params: { id: number };
}) {
  const post = await getPost(params.id);

  console.log("post object:", post);

  return <DisplaySinglePost post={post} />;
}
