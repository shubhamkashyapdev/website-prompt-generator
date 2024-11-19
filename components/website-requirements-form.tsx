"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Page, WebsiteRequirements } from "@/app/page";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface WebsiteRequirementsFormProps {
  value: WebsiteRequirements;
  onChange: (value: WebsiteRequirements) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function WebsiteRequirementsForm({
  value,
  onChange,
  onSubmit,
  isLoading,
}: WebsiteRequirementsFormProps) {
  const [newSection, setNewSection] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const handleChange = (
    pageName: string,
    sectionIndex: number,
    sectionValue: string
  ) => {
    const pages = [...value.pages];
    const page = pages.find((p) => p.name === pageName);
    if (!page) {
      return toast.error("Page not found");
    }
    page.sections[sectionIndex] = sectionValue;
    onChange({ ...value, pages });
  };

  const addPage = (pageName: string) => {
    const alreadyExists = value.pages.find((page) => page.name === pageName);

    if (alreadyExists) {
      return toast.error("Page already exists");
    }
    const newPage: Page = {
      name: pageName,
      sections: [""],
    };

    onChange({
      ...value,
      pages: [...value.pages, newPage],
    });
  };

  const addSection = (pageName: string) => {
    const page = value.pages.find((page) => page.name === pageName);

    if (!page) {
      return toast.error("Page not found");
    }

    const pages = [...value.pages];
    const index = pages.findIndex((p) => p.name === pageName);
    pages[index].sections = [...page.sections, ""];

    onChange({ ...value, pages });
  };

  const removePage = (pageName: string) => {
    const pages = [...value.pages];
    const index = pages.findIndex((p) => p.name === pageName);
    pages.splice(index, 1);

    onChange({ ...value, pages });
  };

  const removeSection = (pageName: string, index: number) => {
    const pages = [...value.pages];
    const page = pages.find((p) => p.name === pageName);
    if (!page) {
      return toast.error("Page not found");
    }
    page.sections.splice(index, 1);
    onChange({ ...value, pages });
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;

    onChange({
      ...value,
      features: [...value.features, newFeature],
    });
    setNewFeature("");
  };

  const removeFeature = (feature: string) => {
    onChange({
      ...value,
      features: value.features.filter((f) => f !== feature),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Project Description</Label>
          <Textarea
            placeholder="Describe your website's purpose and main objectives..."
            value={value.description}
            onChange={(e) =>
              onChange({ ...value, description: e.target.value })
            }
          />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 mt-2">
            <Button
              onClick={() => {
                const pageName = prompt("Enter the name of the new page:");
                if (!pageName) return;
                addPage(pageName);
              }}
            >
              Add Page +
            </Button>
          </div>
          {value.pages.map((page) => (
            <Card key={page.name} className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">
                  {page.name} Page Sections
                </h3>
                <div className="flex gap-2 items-center">
                  <Button type="button" onClick={() => addSection(page.name)}>
                    Add Section +
                  </Button>
                  <Button type="button" onClick={() => removePage(page.name)}>
                    Remove Page -
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {page.sections.map((section, index) => (
                  <div
                    key={`${page}-${index}`}
                    className="w-full flex items-center gap-2"
                  >
                    <Input
                      placeholder="Add new section..."
                      className="w-full"
                      value={section}
                      onChange={(e) => {
                        handleChange(page.name, index, e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSection(page.name);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSection(page.name, index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 space-y-4">
          <h3 className="font-medium text-lg">Features</h3>

          <div className="space-y-2">
            {value.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className="flex-1 p-2 bg-muted rounded-md">{feature}</div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(feature)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add new feature..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
            />
            <Button type="button" variant="secondary" onClick={addFeature}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="font-medium text-lg">Technical Requirements</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="authentication"
                checked={value.technicalPreferences.authentication}
                onCheckedChange={(checked) =>
                  onChange({
                    ...value,
                    technicalPreferences: {
                      ...value.technicalPreferences,
                      authentication: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="authentication">User Authentication</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="database"
                checked={value.technicalPreferences.database}
                onCheckedChange={(checked) =>
                  onChange({
                    ...value,
                    technicalPreferences: {
                      ...value.technicalPreferences,
                      database: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="database">Database Integration</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="api"
                checked={value.technicalPreferences.api}
                onCheckedChange={(checked) =>
                  onChange({
                    ...value,
                    technicalPreferences: {
                      ...value.technicalPreferences,
                      api: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="api">API Integration</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="seo"
                checked={value.technicalPreferences.seo}
                onCheckedChange={(checked) =>
                  onChange({
                    ...value,
                    technicalPreferences: {
                      ...value.technicalPreferences,
                      seo: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="seo">SEO Optimization</Label>
            </div>
          </div>
        </Card>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Plus className="mr-2 h-4 w-4" />
        )}
        Generate Prompt
      </Button>
    </form>
  );
}
