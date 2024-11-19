"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import { Copy, Loader2, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { PromptEditor } from "@/components/prompt-editor";
import { WebsiteRequirementsForm } from "@/components/website-requirements-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Page {
  name: string;
  sections: string[];
}

export interface WebsiteRequirements {
  description: string;
  pages: Page[];
  features: string[];
  designPreferences: {
    style: string;
    colorScheme: string;
    typography: string;
  };
  technicalPreferences: {
    authentication: boolean;
    database: boolean;
    api: boolean;
    seo: boolean;
  };
}

const defaultRequirements: WebsiteRequirements = {
  description: "",
  pages: [
    {
      name: "Home",
      sections: ["Hero Section"],
    },
  ],
  features: [],
  designPreferences: {
    style: "",
    colorScheme: "",
    typography: "",
  },
  technicalPreferences: {
    authentication: false,
    database: false,
    api: false,
    seo: false,
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("requirements");
  const [copied, setCopied] = useState(false);
  const [customInstructions, setCustomInstructions] = useState("");
  const [requirements, setRequirements] =
    useState<WebsiteRequirements>(defaultRequirements);

  const { complete, completion, isLoading, setCompletion } = useCompletion({
    api: "/api/completion",
    body: {
      customInstructions,
      requirements,
    },
    onFinish: () => {
      setActiveTab("output");
      toast.success("Prompt generated successfully!");
    },
  });

  const handleGenerate = async () => {
    if (!requirements.description) {
      toast.error("Please fill in the project description");
      return;
    }
    if (requirements.pages.some((page) => page.sections.length === 0)) {
      toast.error("Please add at least one section to each page");
      return;
    }
    await complete(
      "Generate a detailed Next.js website prompt based on the provided requirements"
    );
  };

  const handleRefine = async () => {
    if (!completion) return;
    await complete(
      `Refine the following prompt with these instructions: ${customInstructions}\n\nCurrent prompt:\n${completion}`
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(completion);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Website Component Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate detailed, production-ready website specifications
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="requirements">Website Requirements</TabsTrigger>
            <TabsTrigger value="output" disabled={!completion}>
              Generated Prompt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requirements">
            <Card className="p-6">
              <div className="flex gap-3 items-center justify-end">
                <Button
                  onClick={() => {
                    localStorage.setItem(
                      "website-requirements",
                      JSON.stringify(requirements)
                    );
                  }}
                >
                  Save To Local Storage
                </Button>
                <Button
                  onClick={() => {
                    const a = localStorage.getItem("website-requirements");
                  }}
                >
                  Load From Local Storage
                </Button>
              </div>
              <WebsiteRequirementsForm
                value={requirements}
                onChange={setRequirements}
                onSubmit={handleGenerate}
                isLoading={isLoading}
              />
            </Card>
          </TabsContent>

          <TabsContent value="output">
            {completion && (
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Refine Your Prompt
                    </h3>
                    <textarea
                      placeholder="Enter instructions to refine the prompt (e.g., 'Add more details about animations', 'Focus more on accessibility')"
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleRefine}
                        disabled={isLoading || !customInstructions}
                        variant="secondary"
                        className="w-full transition-colors hover:bg-secondary/80"
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="mr-2 h-4 w-4" />
                        )}
                        Refine Prompt
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyToClipboard}
                        className="shrink-0 transition-colors hover:bg-muted"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <PromptEditor value={completion} onChange={setCompletion} />
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
