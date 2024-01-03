"use client";
import React from "react";
import { Comments } from "@/app/Components/Comments/CommentsForPost";

type CommentsToDisplayProps = {
  comment: Comments;
};

const DisplayComment = ({ comment }: CommentsToDisplayProps) => {
  return (
    <div>
      <span>{comment.author_name}</span>
      <br />
      <span>{comment.comment_context}</span>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("test");
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default DisplayComment;
