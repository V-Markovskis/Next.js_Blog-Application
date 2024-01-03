"use client";
import React, { useState } from "react";
import CommentsForPost, {
  Comments,
} from "@/app/Components/Comments/CommentsForPost";
import { Posts } from "@/app/types/postsType";
import styles from "./DisplayComment.module.css";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/requestsToAPI/comments";

type CommentsToDisplayProps = {
  post: Posts;
  comment: Comments;
};

const DisplayComment = ({ comment, post }: CommentsToDisplayProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<Comments>();

  return isEditing ? (
    <div className={styles.comment_container}>
      <CommentsForPost
        post={post}
        initialState={editedComment!}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  ) : (
    <ShowComment
      comment={comment}
      setIsEditing={() => setIsEditing(!isEditing)}
      isEditing={isEditing}
      setEditedComment={(comment) => setEditedComment(comment)}
    />
  );
};

type ShowCommentProps = {
  comment: Comments;
  setIsEditing: (editing: boolean) => void;
  setEditedComment: (comment: Comments) => void;
  isEditing: boolean;
};

const ShowComment = ({
  comment,
  isEditing,
  setEditedComment,
  setIsEditing,
}: ShowCommentProps) => {
  const router = useRouter();

  return (
    <div className={styles.comment_container}>
      <div>
        <span>Author: </span>
        <span>{comment.author_name}</span>
      </div>
      <div className={styles.comment_content_container}>
        <span>{comment.comment_context}</span>
      </div>
      <br />
      <div className={styles.comment_buttons_container}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(!isEditing);
            setEditedComment(comment);
          }}
        >
          {isEditing ? "Cancel Edit" : "Edit"}
        </button>
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
    </div>
  );
};

export default DisplayComment;
