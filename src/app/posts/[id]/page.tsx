import React from "react";
import styles from "@/app/posts/page.module.css";
import Image from "next/image";
import { Tag } from "@/app/types/tagType";
import { getPost } from "@/requestsToAPI/getPost";
import CommentsForPost from "@/app/Components/Comments/CommentsForPost";

export default async function PostDetails({
  params,
}: {
  params: { id: number };
}) {
  const post = await getPost(params.id);

  function createMarkup() {
    return { __html: post.content };
  }

  return (
    <main>
      <nav>
        <h2>Post Details</h2>
      </nav>
      <div>
        <h3>{post.title}</h3>
        <small>
          {post.tags.map((tag: Tag) => (
            <div key={tag.id}>{tag.tag_name}</div>
          ))}
        </small>
        <Image
          src={post.image_url}
          width={200}
          height={200}
          className={styles.image}
          priority={false}
          alt="post picture"
        />
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
      <CommentsForPost post={post} />
    </main>
  );
}
