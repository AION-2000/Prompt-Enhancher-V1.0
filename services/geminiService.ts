import { GoogleGenAI, Type } from "@google/genai";
import { EnhancedResult, EnhancementStyle } from "../types";

// Master System Prompt as the system instruction for the model
const SYSTEM_INSTRUCTION = `
You are Prompt Enhancer Engine v1.0, a highly advanced module designed to transform any user-provided prompt into a superior version that is clearer, more structured, more actionable, and more effective.

Your tasks:
1. Prompt Cleaning: Fix grammar, remove ambiguity, remove unnecessary words, clarify objective, identify missing context.
2. Intent Detection: Detect what the user actually wants, identify task type, detect tone.
3. Prompt Enhancement: Transform the raw prompt into a high-quality enhanced prompt including:
    A. Role (Assign an appropriate AI role)
    B. Task (Explain clearly what the user wants)
    C. Context (Add relevant missing details)
    D. Instructions (Create steps or guidelines)
    E. Constraints (Important boundaries)
    F. Output Format (Specify exact format)
4. Style Enhancement: Apply the requested style.
5. Quality Rules: No hallucinations, no personal opinions, no fluff, stay aligned with user intention.

Output JSON matching the provided schema exactly.
`;

export const generateEnhancedPrompt = async (
  rawPrompt: string,
  style: EnhancementStyle
): Promise<EnhancedResult> => {
// filepath: e:\Project\Enhancher\services\geminiService.ts
// ...existing code...
if (!process.env.GEMINI_API_KEY) {
  throw new Error("API Key is missing. Please set process.env.GEMINI_API_KEY.");
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// ...existing code...

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Enhance this prompt.\n\nRAW PROMPT:\n"${rawPrompt}"\n\nTARGET STYLE:\n${style}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            enhancedPrompt: { type: Type.STRING },
            minimalVersion: { type: Type.STRING },
            structuredAnalysis: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                task: { type: Type.STRING },
                context: { type: Type.STRING },
                instructions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                constraints: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                outputFormat: { type: Type.STRING },
              },
              required: ["role", "task", "context", "instructions", "constraints", "outputFormat"],
            },
          },
          required: ["enhancedPrompt", "minimalVersion", "structuredAnalysis"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const data = JSON.parse(text) as EnhancedResult;
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};