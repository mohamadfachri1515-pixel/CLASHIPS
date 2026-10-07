export type DifficultyLevel = 'Mudah' | 'Menengah' | 'Sulit';

export interface Question {
  id: number;
  cardNumber: number; // 1 to 30
  level: 1 | 2 | 3;
  points: number;
  difficulty: DifficultyLevel;
  question: string;
  keywords: string[];
  rubric: string;
  exampleAnswer: string;
}

export type AnswerStatus = 'PENDING' | 'CORRECT' | 'WRONG' | 'CANCELLED';

export type CardVisualStatus = 'AVAILABLE' | 'SELECTED' | 'PENDING' | 'CORRECT' | 'WRONG' | 'LOCKED';

export interface AnswerSubmission {
  id: string;
  playerId: string;
  playerName: string;
  cardId: number;
  cardNumber: number;
  level: number;
  points: number;
  questionText: string;
  answerText: string;
  status: AnswerStatus;
  submittedAt: number;
  validatedAt?: number;
  validatedBy?: string;
  pointsAwarded: number;
  feedbackNote?: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  correctCards: number[]; // Card IDs that this player answered correctly
  submittedCards: number[]; // Card IDs attempted
  wrongCards: number[]; // Card IDs answered wrong
  createdAt: number;
  lastActiveAt: number;
}

export interface GameSettings {
  teacherPin: string;
  allowRetryOnWrong: boolean;
  rankingBroadcastIntervalMinutes: number; // Default 8 minutes
  bgmVolume: number; // 0.0 - 1.0
  sfxVolume: number; // 0.0 - 1.0
}

export type GameStatus = 'RUNNING' | 'WAITING' | 'PAUSED' | 'GAMEOVER';

export interface GameState {
  status: GameStatus;
  musicEnabled: boolean;
  startTime: number;
  lastBroadcastTime: number;
}
