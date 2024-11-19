import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Code, Layout, Zap } from "lucide-react";

const services = [
  {
    title: "AI Prompt Generation",
    description: "Generate detailed website prompts using advanced AI models",
    icon: Bot,
  },
  {
    title: "Code Generation",
    description: "Convert prompts into production-ready code snippets",
    icon: Code,
  },
  {
    title: "UI/UX Design",
    description: "Get comprehensive design specifications and guidelines",
    icon: Layout,
  },
  {
    title: "Performance Optimization",
    description: "Receive recommendations for optimal website performance",
    icon: Zap,
  },
];

export default function ServicesPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="text-muted-foreground">
            Comprehensive solutions for modern web development
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <ul>
              <li>State-of-the-art AI technology</li>
              <li>Production-ready code generation</li>
              <li>Modern design principles</li>
              <li>Performance-focused solutions</li>
              <li>Comprehensive documentation</li>
              <li>Expert support and guidance</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}