import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const websitePrompt = `
  <agent role="Website Developer">
    <expertise>
      - Modern web development
      - Component architecture
      - UI/UX best practices
      - Responsive design
      - Performance optimization
      - Accessibility standards
    </expertise>
    <components>
      - Headers (Navigation, Branding)
      - Heroes (Text-focused, Image-background, Video-background)
      - Feature Sections (Grid, List, Cards)
      - Content Sections (Text, Image, Mixed)
      - CTAs (Newsletter, Contact, Download)
      - Testimonials (Cards, Carousel, Grid)
      - Pricing Tables
      - Team Sections
      - Blog Sections
      - Contact Forms
      - FAQs (Accordion, Grid)
      - Statistics/Metrics
      - Logo Clouds (Partners, Clients)
      - Footers (Simple, Complex, Multi-column)
    </components>
    <output_format>
      <sections>
        - Component Architecture
        - Layout Structure
        - Data Requirements
        - Interactive Elements
        - Responsive Design
        - Performance Considerations
        - Accessibility Guidelines
      </sections>
    </output_format>
  </agent>
`;
export const dynamic = "force-static";
export async function POST(req: Request) {
  const { prompt, customInstructions, requirements } = await req.json();

  let finalPrompt = prompt;

  if (customInstructions && prompt.includes("Current prompt:")) {
    finalPrompt = `
      ${websitePrompt}
      
      Task: Refine the following website prompt based on these instructions:
      ${customInstructions}

      ${prompt}
    `;
  } else {
    finalPrompt = `
      ${websitePrompt}
      
      Task: Generate a detailed, production-ready website specification that includes:
      - Component architecture for each page section
      - Data structure and management
      - Interactive elements and animations
      - Responsive design approach
      - Performance optimization strategies
      - Accessibility implementation

      Requirements:
      ${JSON.stringify(requirements, null, 2)}

      Format the response in markdown with clear sections and code examples where relevant.
    `;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: finalPrompt,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
