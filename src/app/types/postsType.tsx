import { Tag } from "@/app/posts/page";

export type Posts = {
  id: number;
  image_url: string;
  title: string;
  context: string;
  tags: Tag[];
};
