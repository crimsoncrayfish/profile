import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

const readingList = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reading-list" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(["done", "in-progress", "to-read"]),
    order: z.number(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    url: z.string().url(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

export const collections = { blog, "reading-list": readingList, projects };
