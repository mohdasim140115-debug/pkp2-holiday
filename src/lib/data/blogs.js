import rawBlogs from "../../../data/blogs.json";
import { slugify } from "./packages";
import { travelImage } from "@/lib/images";

export const blogs = rawBlogs.map((b, i) => ({
  ...b,
  slug: slugify(b.title),
  image: travelImage((b.img || "travel").split(","), 1200, 700, `blog-${b.id}`),
}));

export function getBlogBySlug(slug) {
  return blogs.find((b) => b.slug === slug);
}
export function getRelatedBlogs(blog, count = 3) {
  return blogs.filter((b) => b.slug !== blog.slug).slice(0, count);
}
