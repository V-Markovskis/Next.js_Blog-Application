import PostsPage from "@/app/Components/PostsPage";
import { getPosts } from "@/requestsToAPI/posts";
import { Posts } from "@/app/types/postsType";

export default async function Page() {
  const posts = (await getPosts()) as Posts[];

  return <PostsPage posts={posts} />;
}
