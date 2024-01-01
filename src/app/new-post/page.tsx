"use client";
import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import DOMPurify from "dompurify";

//https://stackoverflow.com/questions/63451068/window-is-not-defined-react-draft-wysiwyg-used-with-next-js-ssr
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import styles from "./page.module.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { postContent } from "@/requestsToAPI/postNewContent";
import draftToHtml from "draftjs-to-html";

export type valuesToPost = {
  image_url: string;
  title: string;
  tags: string[];
  content: string;
};

const initialState: valuesToPost = {
  image_url: "",
  title: "",
  tags: [],
  content: "",
};

const NewPostCreation = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [tagName, setTagName] = useState("");

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

  const [formValues, setFormValues] = useState(initialState);

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        console.log("formValues", formValues);

        if (isEditorEmpty()) {
          alert("Enter content for post");
          return;
        } else {
          postContent(formValues);
        }
        setFormValues(initialState);
        setEditorState(() => EditorState.createEmpty());
      }}
    >
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
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
      <br />
      <div className="tags-display">
        {formValues.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button onClick={() => removeTag(index)}>Remove</button>
          </span>
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
          const contentConvertToHtml = draftToHtml(convertToRaw(contentState));
          //sanitize the HTML content
          const sanitizedHtml = DOMPurify.sanitize(
            JSON.stringify(contentConvertToHtml)
          );

          setFormValues({
            ...formValues,
            content: contentConvertToHtml,
          });
        }}
        toolbarClassName={styles.toolbarClass}
      />
      <br />
      <button className="btn btn-success">Submit</button>
    </form>
  );
};

export default NewPostCreation;
