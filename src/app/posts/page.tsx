async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return res.json();
}

export default async function TicketList() {
  const posts = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="card my-5">
          <h3>{post.title}</h3>
          <p>{post.body.slice(0, 200)}...</p>
          <div className={`pill ${post.priority}`}>
            {post.priority} priority
          </div>
        </div>
      ))}
      {posts.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
