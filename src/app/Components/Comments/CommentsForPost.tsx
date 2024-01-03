"use client";
import React, { useState } from "react";
import { Posts } from "@/app/types/postsType";
import DisplayComment from "@/app/Components/CommentsDisplay/DisplayComment";
import { deleteComment, postComments } from "@/requestsToAPI/comments";
import { useRouter } from "next/navigation";

type CommentsForPostProps = {
  post: Posts;
};

export type Comments = {
  author_name: string;
  comment_context: string;
  post_id: number;
  id?: number;
};

const initialState: Comments = {
  author_name: "",
  comment_context: "",
  post_id: -1,
};

const CommentsForPost = ({ post }: CommentsForPostProps) => {
  const router = useRouter();
  const [comments, setComments] = useState<Comments[]>([]);
  const [comment, setComment] = useState(initialState);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const updatedComments = [...comments, comment];
          //PASS DATA INTO DB
          postComments(comment);
          router.refresh();
          setComments(updatedComments);
          setComment(initialState);
        }}
      >
        <label htmlFor="author">Author:</label>
        <br />
        <br />
        <input
          type="text"
          id="author"
          placeholder="Enter your name"
          value={comment.author_name}
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
        <button>Submit</button>
      </form>
      {post.comments &&
        post.comments.map((comment, key) => (
          <div key={key}>
            <div>{comment.author_name}</div>
            <div>{comment.comment_context}</div>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteComment(comment.id as number);
                router.refresh();
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default CommentsForPost;
