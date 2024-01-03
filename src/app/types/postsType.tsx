import { Tag } from "@/app/types/tagType";
import { Comments } from "@/app/Components/Comments/CommentsForPost";

export type Posts = {
  id: number;
  image_url: string;
  title: string;
  content: string;
  tags: Tag[];
  comments: Comments[];
};
