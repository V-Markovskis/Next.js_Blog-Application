import React from "react";
import styles from "@/app/posts/page.module.css";
import Image from "next/image";
import { Tag } from "@/app/types/tagType";
import DOMPurify from "dompurify";

export async function getPost(id: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      next: {
        revalidate: 60,
      },
    });

    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Error in GET request for single post:", error);
    throw error;
  }
}

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
    </main>
  );
}
