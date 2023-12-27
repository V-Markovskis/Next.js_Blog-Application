async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });
  const data = await res.json();
  return data.posts;
}

export type Tag = {
  id: number;
  tags_name: string;
};

export type Posts = {
  id: number;
  image_url: string;
  title: string;
  context: string;
  tags: Tag[];
};

export default async function TicketList() {
  const posts = (await getPosts()) as Posts[];
  console.log(posts);

  return (
    <>
      {posts.map((post: Posts) => (
        <div key={post.id} className="container">
          <h3>{post.title}</h3>
          <div>
            {post.tags.map((tag: Tag) => (
              <div key={tag.id}>{tag.tags_name}</div>
            ))}
          </div>
        </div>
      ))}
      {posts.length === 0 && <p className="text-center">No posts created!</p>}
    </>
  );
}
