"use client";

import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptEditor({ value, onChange }: PromptEditorProps) {
  return (
    <Card className="p-6 relative">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </Card>
  );
}