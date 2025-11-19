export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Answer {
  questionId: number;
  questionText: string;
  selectedOptionText: string;
}

export interface TraitScore {
  name: string;
  score: number; // 0-100
}

export interface PersonalityResult {
  archetype: string; // e.g., "The Visionary"
  tagline: string; // e.g., "Dreaming with open eyes"
  description: string;
  strengths: string[];
  weaknesses: string[];
  radarData: TraitScore[]; // For chart
  advice: string;
}

export enum AppState {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}