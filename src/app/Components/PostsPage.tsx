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
      <div>
        <Link href="/">
          <button className="btn btn-success">Back to home page</button>
        </Link>
      </div>
      <div className={styles.globalContainer}>
        {posts.map((post: Posts) => (
          <div key={post.id} className={styles.innerContainer}>
            <Image
              src={post.image_url}
              width={200}
              height={200}
              className={styles.image}
              priority={false}
              alt="post picture"
            />
            <Link href={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
            <div>
              {post.tags.map((tag: Tag) => (
                <div key={tag.id}>{tag.tag_name}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {posts.length === 0 && <p className="text-center">No posts created!</p>}
      <br />
    </>
  );
}
