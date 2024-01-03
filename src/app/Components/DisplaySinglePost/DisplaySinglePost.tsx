"use client";
import React from "react";
import { Tag } from "@/app/types/tagType";
import Image from "next/image";
import pageStyles from "@/app/posts/page.module.css";
import CommentsForPost from "@/app/Components/Comments/CommentsForPost";
import { Posts } from "@/app/types/postsType";
import styles from "./DisplaySinglePost.module.css";
import { deletePost } from "@/requestsToAPI/posts";
import { useRouter } from "next/navigation";

type DisplaySinglePostProps = {
  post: Posts;
};

const DisplaySinglePost = ({ post }: DisplaySinglePostProps) => {
  function createMarkup() {
    return { __html: post.content };
  }
  const router = useRouter();

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
          <div className={styles.buttons_container}>
            <button className={styles.buttons} disabled>
              Edit
            </button>
            <button
              onClick={async () => {
                await deletePost(post.id);
                router.push("/posts");
                router.refresh();
              }}
              className={styles.buttons}
            >
              Delete
            </button>
          </div>
          <Image
            src={post.image_url}
            width={200}
            height={200}
            className={pageStyles.image}
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
