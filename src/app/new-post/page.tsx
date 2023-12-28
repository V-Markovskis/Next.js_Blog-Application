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

const NewPostCreation = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked");
    console.log(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <header className={styles.header}>New Blog Creation</header>

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={styles.wrapperClass}
        editorClassName={styles.editorClass}
        toolbarClassName={styles.toolbarClass}
      />
      <button>Submit/next?</button>
    </form>
  );
};

export default NewPostCreation;
