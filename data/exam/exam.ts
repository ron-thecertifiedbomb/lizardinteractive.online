// data/exam/exam.ts

export interface Question {
  id: string;
  type: "MCQ" | "TF" | "IDENTIFICATION" | "ESSAY_AI";
  prompt: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
}

export interface ExamData {
  title: string;
  timestamp: string;
  totalNodes: number;
  questions: Question[];
}

export const PHILIPPINE_HISTORY_EXAM: ExamData = {
  title: "NEW_ASSESSMENT_PROTOCOL",
  timestamp: "2026-04-24T19:37:58.450Z",
  totalNodes: 3,
  questions: [
    {
      id: "1ecfb559-4a6e-49c5-ab47-e6ae07ec53bc",
      type: "MCQ",
      prompt: "Capital of the Philippines",
      points: 5,
      options: ["Cebu", "Iloilo", "Manila", "Quezon City"],
      correctAnswer: "Manila",
    },
    {
      id: "27129a4c-dd63-47fb-8466-6b58a579d984",
      type: "TF",
      prompt: "Jose Rizal is our national hero?",
      points: 5,
      options: [],
      correctAnswer: "True",
    },
    {
      id: "de691ff2-fc25-406e-ac7c-b17d96efb799",
      type: "IDENTIFICATION",
      prompt: "What is color red in tagalog?",
      points: 5,
      options: [],
      correctAnswer: "pula",
    },
  ],
};
