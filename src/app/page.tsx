import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h2>Welcome to Our Blog</h2>
        <p>
          Explore a world of diverse and engaging content. Our blog covers a
          wide range of topics, from thought-provoking articles to captivating
          stories. Whether you're into technology, lifestyle, or creative arts,
          there's something here for everyone.
        </p>
        <p>
          Stay updated with the latest trends, discover unique perspectives, and
          join the conversation. Our community is passionate about sharing
          knowledge and experiences. Start your journey through the world of
          ideas right here.
        </p>
        <p>
          Ready to dive in? Browse our latest posts below and enjoy the richness
          of content curated just for you.
        </p>
      </div>

      <div>
        <Link href="/posts">
          <button className="btn btn-success">View Posts</button>
        </Link>
      </div>
    </main>
  );
}
