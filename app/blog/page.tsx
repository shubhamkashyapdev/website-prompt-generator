import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js and AI",
    excerpt: "Learn how to integrate AI capabilities into your Next.js applications",
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "Advanced Prompt Engineering",
    excerpt: "Master the art of crafting effective prompts for AI models",
    date: "2024-03-19",
  },
  {
    id: 3,
    title: "Building Modern UIs with Tailwind CSS",
    excerpt: "Discover best practices for creating beautiful user interfaces",
    date: "2024-03-18",
  },
];

export default function BlogPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground">
            Latest insights about AI and web development
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <p className="text-sm text-muted-foreground mt-2">{post.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}