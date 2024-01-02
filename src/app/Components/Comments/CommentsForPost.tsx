"use client";
import React, { useState } from "react";
import { Posts } from "@/app/types/postsType";
import DisplayComment from "@/app/Components/CommentsDisplay/DisplayComment";
import { postComments } from "@/requestsToAPI/postComments";

type CommentsForPostProps = {
  post: Posts;
};

export type Comments = {
  author: string;
  content: string;
  post_id: number;
};

const initialState: Comments = {
  author: "",
  content: "",
  post_id: -1,
};

const CommentsForPost = ({ post }: CommentsForPostProps) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [comment, setComment] = useState(initialState);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const updatedComments = [...comments, comment];
          //PASS DATA INTO DB
          setComments(updatedComments);
          postComments(comment);
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
          value={comment.author}
          onChange={(e) => {
            setComment({ ...comment, author: e.target.value });
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
          value={comment.content}
          onChange={(e) => {
            setComment({
              ...comment,
              content: e.target.value,
              post_id: post.id,
            });
          }}
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
      {comments &&
        comments.map((comment, key) => (
          <DisplayComment key={key} comment={comment} />
        ))}
    </div>
  );
};

export default CommentsForPost;
