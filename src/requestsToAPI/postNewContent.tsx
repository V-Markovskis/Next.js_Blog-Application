import { valuesToPost } from "@/app/Components/NewPost";

export async function postContent(formValues: valuesToPost) {
  try {
    const res = await fetch("http://localhost:3000/api/new-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });
    console.log("formValues in postContent after", formValues);
  } catch (error) {
    throw error;
  }
}
