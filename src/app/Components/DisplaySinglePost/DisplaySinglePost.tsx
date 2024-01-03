"use client";
import React from "react";
import { Tag } from "@/app/types/tagType";
import Image from "next/image";
import styles from "@/app/posts/page.module.css";
import CommentsForPost, {
  Comments,
} from "@/app/Components/Comments/CommentsForPost";
import { Posts } from "@/app/types/postsType";

type DisplaySinglePostProps = {
  post: Posts;
};

const DisplaySinglePost = ({ post }: DisplaySinglePostProps) => {
  function createMarkup() {
    return { __html: post.content };
  }
  return (
    <div>
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
        <CommentsForPost post={post} isEditing={false} />
      </main>
    </div>
  );
};

export default DisplaySinglePost;
