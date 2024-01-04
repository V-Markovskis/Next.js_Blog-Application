"use client";
import React, { useEffect, useState } from "react";
import { Posts } from "@/app/types/postsType";
import { postComments, putComment } from "@/requestsToAPI/comments";
import { useRouter } from "next/navigation";
import DisplayComment from "@/app/Components/CommentsDisplay/DisplayComment";
import styles from "./Comments.module.css";

type CommentsForPostProps = {
  post: Posts;
  initialState?: Comments;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
};

export type Comments = {
  author_name: string;
  comment_context: string;
  post_id: number;
  id?: number;
};

export const emptyState: Comments = {
  author_name: "",
  comment_context: "",
  post_id: -1,
};

const CommentsForPost = ({
  post,
  initialState,
  isEditing,
  setIsEditing,
}: CommentsForPostProps) => {
  const router = useRouter();
  const [comments, setComments] = useState<Comments[]>([]);
  const [comment, setComment] = useState(emptyState);

  useEffect(() => {
    if (initialState && isEditing) {
      setComment(initialState);
    }
  }, [initialState]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const updatedComments = [...comments, comment];
          //PASS DATA INTO DB
          if (isEditing && setIsEditing) {
            putComment(comment);
            setIsEditing(false);
          } else {
            postComments(comment);
            setComments(updatedComments);
            setComment(emptyState);
          }
          router.refresh();
        }}
      >
        <div className={styles.commentsFormContainer}>
          <label htmlFor="author">Author:</label>
          <br />
          <br />
          <input
            type="text"
            id="author"
            placeholder="Enter your name"
            value={comment.author_name}
            disabled={isEditing}
            onChange={(e) => {
              setComment({ ...comment, author_name: e.target.value });
            }}
          />
          <br />
          <br />
          <label htmlFor="comment">Comment</label>
          <br />
          <br />
          <input
            type="text"
            id="comment"
            placeholder="Example: Like it!"
            value={comment.comment_context}
            onChange={(e) => {
              setComment({
                ...comment,
                comment_context: e.target.value,
                post_id: post.id,
              });
            }}
          />
          <br />
          <br />
          <button className="btn btn-success">
            {isEditing ? "Save" : "Submit"}
          </button>
        </div>
      </form>
      <div className={styles.comments_wrapper}>
        {post.comments &&
          post.comments.map((comment, key) => (
            <DisplayComment comment={comment} key={key} post={post} />
          ))}
      </div>
    </div>
  );
};

export default CommentsForPost;
