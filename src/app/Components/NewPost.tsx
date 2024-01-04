"use client";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useEffect, useState } from "react";
import styles from "../new-post/page.module.css";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import dynamic from "next/dynamic";
import { postContent } from "@/requestsToAPI/postNewContent";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/navigation";
import { Posts } from "@/app/types/postsType";
import { updatePost } from "@/requestsToAPI/posts";
import { useSession } from "next-auth/react";

const emptyState: valuesToPost = {
  image_url: "",
  title: "",
  tags: [],
  content: "",
};

//https://stackoverflow.com/questions/63451068/window-is-not-defined-react-draft-wysiwyg-used-with-next-js-ssr
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export type valuesToPost = {
  image_url: string;
  title: string;
  tags: string[];
  content: string;
};

type NewPost = {
  isEditing?: boolean;
  initialValue?: Posts;
  setIsEditing?: (isEditing: boolean) => void;
};

const NewPost = ({ isEditing, initialValue, setIsEditing }: NewPost) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState(emptyState);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tagName, setTagName] = useState("");
  const { data: session } = useSession();

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormValues({ ...formValues, tags: [...formValues.tags, tagName] });
    setTagName("");
  };

  const removeTag = (index: number) => {
    setFormValues((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((_, tagIndex) => tagIndex !== index),
    }));
  };

  //https://github.com/jpuri/react-draft-wysiwyg/issues/1007
  const isEditorEmpty = () => {
    const contentState = editorState.getCurrentContent();
    return !contentState.hasText();
  };

  useEffect(() => {
    if (isEditing && initialValue) {
      const blocksFromHTML = convertFromHTML(initialValue.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
      setFormValues({
        ...initialValue,
        tags: initialValue.tags.map((tag) => tag.tag_name),
      });
    }
  }, [isEditing, initialValue]);

  useEffect(() => {
    if (!session?.user) {
      router.push("/api/auth/signin");
    }
  }, []);

  return (
    <>
      {session?.user && (
        <form
          className={styles.container}
          onSubmit={async (e) => {
            e.preventDefault();

            if (isEditorEmpty()) {
              alert("Enter content for post");
              return;
            } else {
              if (isEditing) {
                await updatePost(formValues);
                if (setIsEditing) {
                  setIsEditing(false);
                }
              } else {
                await postContent(formValues);
                router.push("/posts");
              }
              router.refresh();
            }
            setFormValues(emptyState);
            setEditorState(() => EditorState.createEmpty());
          }}
        >
          <div className={styles.formContainer}>
            <header className={styles.header}>New Post Creation</header>
            <div className="preference">
              <label htmlFor="imageUrl">Enter image URL:</label>
              <br />
              <br />
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                placeholder="https..."
                value={formValues.image_url}
                onChange={(e) => {
                  setFormValues({ ...formValues, image_url: e.target.value });
                }}
                required
              />
            </div>
            <br />
            <br />
            <div className="preference">
              <label htmlFor="title">Enter post title:</label>
              <br />
              <br />
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title should be here..."
                value={formValues.title}
                onChange={(e) => {
                  setFormValues({ ...formValues, title: e.target.value });
                }}
                required
              />
            </div>
            <br />
            <br />
            <div className="preference">
              <label htmlFor="tag">Enter post tag:</label>
              <br />
              <br />
              <input
                type="text"
                name="tag"
                id="tag"
                placeholder="Example: Books"
                value={tagName}
                onChange={(e) => {
                  setTagName(e.target.value);
                }}
              />
              &nbsp;
              <button onClick={handleAddTag} className="btn btn-secondary">
                Add Tag
              </button>
            </div>
            <br />
            <div className={styles.tagContainer}>
              {formValues.tags.map((tag, index) => (
                <>
                  <span key={index} className="tag">
                    {tag}
                  </span>
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      removeTag(index);
                    }}
                  >
                    Remove
                  </button>
                </>
              ))}
            </div>
            <br />
            <br />
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName={styles.wrapperClass}
              editorClassName={styles.editorClass}
              onContentStateChange={() => {
                //get current value = rich text editor instance
                const contentState = editorState.getCurrentContent();
                //convert into JSON = saving all styles with text => converting to HTML with styles
                const contentConvertToHtml = draftToHtml(
                  convertToRaw(contentState)
                );

                setFormValues({
                  ...formValues,
                  content: contentConvertToHtml,
                });
              }}
              toolbarClassName={styles.toolbarClass}
            />
            <br />
            <div className={styles.buttonContainer}>
              <button className="btn btn-success">Submit</button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default NewPost;
