import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { Posts } from "@/app/types/postsType";
import { Tag } from "@/app/types/tagType";
import { getPosts } from "@/requestsToAPI/getPosts";

export default async function TicketList() {
  const posts = (await getPosts()) as Posts[];
  console.log(posts);

  return (
    <>
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
            <h3>{post.title}</h3>
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
      <div>
        <Link href="/">
          <button className="btn btn-success">Back to home page</button>
        </Link>
      </div>
    </>
  );
}
