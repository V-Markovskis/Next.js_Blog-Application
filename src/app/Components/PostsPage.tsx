"use client";
import React from "react";
import Link from "next/link";
import styles from "../posts/page.module.css";
import Image from "next/image";
import { Posts } from "@/app/types/postsType";
import { Tag } from "@/app/types/tagType";

export default function PostsPage({ posts }: { posts: Posts[] }) {
  return (
    <>
      <div className={styles.globalContainer}>
        <div>
          <Link href="/">
            <button className="btn btn-success">&larr; Back to Home</button>
          </Link>
        </div>
        <div className={styles.postContainer}>
          {posts.map((post: Posts) => (
            <div key={post.id} className={styles.innerContainer}>
              <div className={styles.imageTitleContainer}>
                <Image
                  src={post.image_url}
                  width={200}
                  height={200}
                  className={styles.image}
                  priority={false}
                  alt="post picture"
                />
                <div
                  className={styles.titleContainer}
                  style={{ width: "200px", whiteSpace: "normal" }}
                >
                  <Link
                    href={`/posts/${post.id}`}
                    className="link-primary link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover"
                  >
                    <h3 className={styles.title}>{post.title}</h3>
                  </Link>
                </div>
              </div>
              <div className={styles.tagContainer}>
                {post.tags.map((tag: Tag) => (
                  <div key={tag.id} className={styles.tag}>
                    {tag.tag_name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {posts.length === 0 && <p className="text-center">No posts created!</p>}
        <br />
      </div>
    </>
  );
}
