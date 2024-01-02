import React from "react";
import { Comments } from "@/app/Components/Comments/CommentsForPost";

type CommentsToDisplayProps = {
  comment: Comments;
};

const DisplayComment = ({ comment }: CommentsToDisplayProps) => {
  return (
    <div>
      <span>{comment.author}</span>
      <br />
      <span>{comment.content}</span>
    </div>
  );
};

export default DisplayComment;
