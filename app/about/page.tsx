import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Bot className="h-20 w-20" />
          </div>
          <h1 className="text-4xl font-bold">About Our AI Prompt Generator</h1>
          <p className="text-muted-foreground">
            Empowering developers to create better websites through AI
          </p>
        </div>

        <Card className="p-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>Our Mission</h2>
            <p>
              We believe in making web development more accessible and efficient
              through the power of artificial intelligence. Our AI prompt generator
              helps developers create detailed, production-ready website
              specifications in seconds.
            </p>

            <h2>How It Works</h2>
            <p>
              Our platform leverages advanced AI models to generate comprehensive
              website prompts that include:
            </p>
            <ul>
              <li>Detailed component structures</li>
              <li>Responsive design specifications</li>
              <li>Data management strategies</li>
              <li>Performance optimization guidelines</li>
              <li>Best practices and recommendations</li>
            </ul>

            <h2>Technology Stack</h2>
            <p>
              Built with cutting-edge technologies including:
            </p>
            <ul>
              <li>Next.js for the frontend framework</li>
              <li>Tailwind CSS for styling</li>
              <li>OpenAI's GPT-4 for AI capabilities</li>
              <li>Vercel for deployment and hosting</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}