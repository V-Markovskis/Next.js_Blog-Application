import { Tag } from "@/app/types/tagType";

export type Posts = {
  id: number;
  image_url: string;
  title: string;
  content: string;
  tags: Tag[];
};
