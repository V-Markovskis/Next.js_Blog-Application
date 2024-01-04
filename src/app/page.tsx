import Link from "next/link";
import stylesHome from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={stylesHome.container}>
        <div className={stylesHome.header}>
          <a href="https://git.io/typing-svg" className={stylesHome.image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=30&pause=1000&background=3AFFF000&center=true&repeat=false&random=false&width=435&lines=Welcome+to+Our+Blog"
              alt="Typing SVG"
            />
          </a>
        </div>
        <div className={stylesHome.innerContainer}>
          <p>
            Explore a world of diverse and engaging content. Our blog covers a
            wide range of topics, from thought-provoking articles to captivating
            stories. Whether you're into technology, lifestyle, or creative
            arts, there's something here for everyone.
          </p>
          <p>
            Stay updated with the latest trends, discover unique perspectives,
            and join the conversation. Our community is passionate about sharing
            knowledge and experiences. Start your journey through the world of
            ideas right here.
          </p>
          <p>
            Ready to dive in? Browse our latest posts below and enjoy the
            richness of content curated just for you.
          </p>
        </div>
      </div>

      <div className={stylesHome.buttonContainer}>
        <Link href={"/posts"}>
          <button className="btn btn-success">View Posts</button>
        </Link>
      </div>
    </main>
  );
}
