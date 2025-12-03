import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuizConfig } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuizQuestions = async (topic: string, config: QuizConfig): Promise<Question[]> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `Generate ${config.numberOfQuestions} multiple-choice trivia questions about: ${topic}. 
    Difficulty Level: ${config.difficulty}.
    The questions should be strictly biblical.
    Include the correct Bible reference (Book Chapter:Verse).
    Ensure strict JSON output based on the schema.
    Language: Portuguese (Brazil).`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 possible answers"
              },
              correctAnswerIndex: { 
                type: Type.INTEGER, 
                description: "Zero-based index of the correct answer (0-3)" 
              },
              explanation: { type: Type.STRING, description: "Brief explanation of why it is correct" },
              reference: { type: Type.STRING, description: "Bible Verse Reference" }
            },
            required: ["questionText", "options", "correctAnswerIndex", "explanation", "reference"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const questions = JSON.parse(text) as Question[];
    return questions;

  } catch (error) {
    console.error("Error generating quiz:", error);
    // Fallback static question in case of API failure to prevent app crash during demo
    return [
      {
        questionText: "Erro ao conectar com a IA. Quem derrotou o gigante Golias?",
        options: ["Saul", "Davi", "Salomão", "Samuel"],
        correctAnswerIndex: 1,
        explanation: "Davi derrotou Golias com uma funda e uma pedra.",
        reference: "1 Samuel 17"
      }
    ];
  }
};