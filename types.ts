export enum EnhancementStyle {
  PROFESSIONAL = 'Professional',
  TECHNICAL = 'Technical',
  ACADEMIC = 'Academic',
  CREATIVE = 'Creative/Storytelling',
  MARKETING = 'Marketing',
  SIMPLE = 'Simple & Beginner-friendly',
}

export interface StructuredAnalysis {
  role: string;
  task: string;
  context: string;
  instructions: string[];
  constraints: string[];
  outputFormat: string;
}

export interface EnhancedResult {
  enhancedPrompt: string;
  minimalVersion: string;
  structuredAnalysis: StructuredAnalysis;
}

export interface GeminiError {
  message: string;
}

// Schema descriptions for the Gemini API
export const promptEnhancerSchema = {
  type: "OBJECT",
  properties: {
    enhancedPrompt: {
      type: "STRING",
      description: "The fully optimized, polished prompt ready to use."
    },
    minimalVersion: {
      type: "STRING",
      description: "A short, condensed version of the prompt (3-5 lines)."
    },
    structuredAnalysis: {
      type: "OBJECT",
      description: "The breakdown of the prompt components.",
      properties: {
        role: { type: "STRING" },
        task: { type: "STRING" },
        context: { type: "STRING" },
        instructions: { 
          type: "ARRAY", 
          items: { type: "STRING" } 
        },
        constraints: { 
          type: "ARRAY", 
          items: { type: "STRING" } 
        },
        outputFormat: { type: "STRING" }
      },
      required: ["role", "task", "context", "instructions", "constraints", "outputFormat"]
    }
  },
  required: ["enhancedPrompt", "minimalVersion", "structuredAnalysis"]
};