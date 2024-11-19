"use client";

import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";

const blogPosts = {
  1: {
    title: "Getting Started with Next.js and AI",
    content: `
      # Getting Started with Next.js and AI

      Artificial Intelligence is revolutionizing web development, and Next.js is at the forefront of this transformation. In this comprehensive guide, we'll explore how to integrate AI capabilities into your Next.js applications.

      ## Key Topics Covered

      1. Setting up a Next.js project
      2. Integrating OpenAI's API
      3. Building AI-powered features
      4. Optimizing performance
      5. Best practices and considerations

      Stay tuned for more updates and advanced tutorials!
    `,
    date: "2024-03-20",
  },
  2: {
    title: "Advanced Prompt Engineering",
    content: `
      # Advanced Prompt Engineering

      Prompt engineering is a crucial skill for working with AI models effectively. This guide will help you master the art of crafting prompts that generate the best possible results.

      ## What You'll Learn

      1. Understanding prompt structure
      2. Context and conditioning
      3. Handling edge cases
      4. Optimizing for specific use cases
      5. Common pitfalls to avoid

      Let's dive deep into the world of prompt engineering!
    `,
    date: "2024-03-19",
  },
  3: {
    title: "Building Modern UIs with Tailwind CSS",
    content: `
      # Building Modern UIs with Tailwind CSS

      Tailwind CSS has transformed the way we build user interfaces. This guide explores best practices and advanced techniques for creating beautiful, responsive designs.

      ## Topics Covered

      1. Setting up Tailwind CSS
      2. Component-driven development
      3. Responsive design patterns
      4. Custom configurations
      5. Performance optimization

      Learn how to leverage Tailwind CSS for your next project!
    `,
    date: "2024-03-18",
  },
};

export default function BlogPost() {
  const params = useParams();
  const post = blogPosts[params.id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">Post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-muted-foreground mb-8">{post.date}</p>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content}
          </div>
        </Card>
      </div>
    </div>
  );
}