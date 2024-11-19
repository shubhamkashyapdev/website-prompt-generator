"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const agents = [
  {
    id: "architect",
    name: "System Architect",
    description: "Focuses on system design, architecture, and best practices",
  },
  {
    id: "ui-expert",
    name: "UI/UX Expert",
    description: "Specializes in user interface and experience design",
  },
  {
    id: "performance",
    name: "Performance Engineer",
    description: "Optimizes for speed, efficiency, and scalability",
  },
  {
    id: "security",
    name: "Security Specialist",
    description: "Focuses on security best practices and implementations",
  },
];

interface AgentSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function AgentSelector({ value, onChange }: AgentSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select AI Agent Role</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {agents.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              <div className="space-y-1">
                <div className="font-medium">{agent.name}</div>
                <div className="text-xs text-muted-foreground">
                  {agent.description}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}