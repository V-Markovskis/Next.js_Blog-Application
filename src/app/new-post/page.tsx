"use client";
import React, { useEffect, useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
//https://stackoverflow.com/questions/63451068/window-is-not-defined-react-draft-wysiwyg-used-with-next-js-ssr
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import styles from "./page.module.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";

const initialState = {
  image_url: "",
  title: "",
  tag: "",
  content: "",
};

const NewPostCreation = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [formValues, setFormValues] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked");

    // let check = convertToRaw(editorState?.getCurrentContent());
    // setFormValues({ ...formValues, content: JSON.stringify(check).toString() });

    console.log("formValues", formValues);

    setFormValues(initialState);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <header className={styles.header}>New Post Creation</header>
      <div className="preference">
        <label htmlFor="imageUrl">Enter image URL:</label>
        <br />
        <br />
        <input
          type="url"
          name="imageUrl"
          id="imageUrl"
          placeholder="https..."
          value={formValues.image_url}
          onChange={(e) => {
            setFormValues({ ...formValues, image_url: e.target.value });
          }}
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
          value={formValues.tag}
          onChange={(e) => {
            setFormValues({ ...formValues, tag: e.target.value });
          }}
        />
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
          //convert into JSON = saving all styles with text
          const rawContentState = convertToRaw(contentState);

          setFormValues({
            ...formValues,
            content: JSON.stringify(rawContentState),
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
