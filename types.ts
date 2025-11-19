export interface Option {
  id: string;
  text: string;
  // 定义该选项对应的性格分值权重，例如 { "外向性": 10, "开放性": 5 }
  scores: { [key: string]: number };
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
  // 我们需要在回答中也传递分数，以便后续计算
  scores: { [key: string]: number };
}

export interface TraitScore {
  name: string;
  score: number; // 0-100
}

export interface PersonalityResult {
  archetype: string;
  tagline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  radarData: TraitScore[];
  advice: string;
}

export enum AppState {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}