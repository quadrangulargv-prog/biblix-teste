export interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  reference: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  queryTopic: string;
  imageUrl: string;
}

export interface RowProps {
  title: string;
  categories: QuizCategory[];
  onSelect: (category: QuizCategory) => void;
}

export enum AppView {
  BROWSE = 'BROWSE',
  SEARCH = 'SEARCH',
  SAVED = 'SAVED',
  SETTINGS = 'SETTINGS',
  DETAILS = 'DETAILS',
  QUIZ_LOADING = 'QUIZ_LOADING',
  QUIZ_PLAYING = 'QUIZ_PLAYING',
  QUIZ_RESULT = 'QUIZ_RESULT',
  ERROR = 'ERROR'
}

export interface GameState {
  score: number;
  currentQuestionIndex: number;
  questions: Question[];
  selectedCategory: QuizCategory | null;
  history: boolean[];
}

export enum Difficulty {
  EASY = 'Iniciante',
  MEDIUM = 'Médio',
  HARD = 'Difícil',
  EXPERT = 'Teólogo'
}

export interface QuizConfig {
  difficulty: Difficulty;
  numberOfQuestions: number;
}