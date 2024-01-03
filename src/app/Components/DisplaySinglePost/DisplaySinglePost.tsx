"use client";
import React, { useState } from "react";
import { Tag } from "@/app/types/tagType";
import Image from "next/image";
import pageStyles from "@/app/posts/page.module.css";
import CommentsForPost from "@/app/Components/Comments/CommentsForPost";
import { Posts } from "@/app/types/postsType";
import styles from "./DisplaySinglePost.module.css";
import { deletePost, updatePost } from "@/requestsToAPI/posts";
import { useRouter } from "next/navigation";
import NewPost from "@/app/Components/NewPost";
import { useSession } from "next-auth/react";

type DisplaySinglePostProps = {
  post: Posts;
};

const DisplaySinglePost = ({ post }: DisplaySinglePostProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <main>
        <nav>
          <h2>Post Details</h2>
        </nav>
        {session?.user && (
          <>
            <div className={styles.buttons_container}>
              <button
                className={styles.buttons}
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? "Cancel Edit" : "Edit"}
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
          </>
        )}
        {isEditing ? (
          <NewPost isEditing setIsEditing={setIsEditing} initialValue={post} />
        ) : (
          <PostContent post={post} />
        )}
      </main>
    </div>
  );
};

type PostContentProps = {
  post: Posts;
};

const PostContent = ({ post }: PostContentProps) => {
  function createMarkup() {
    return { __html: post.content };
  }

  return (
    <>
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
          className={pageStyles.image}
          priority={false}
          alt="post picture"
        />
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
      <CommentsForPost post={post} isEditing={false} />
    </>
  );
};

export default DisplaySinglePost;
