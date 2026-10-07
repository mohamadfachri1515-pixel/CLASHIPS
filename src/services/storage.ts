import { Question, Player, AnswerSubmission, GameSettings, GameState, AnswerStatus } from '../types/game';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';

const STORAGE_KEYS = {
  QUESTIONS: 'coc_ips_questions',
  PLAYERS: 'coc_ips_players',
  SUBMISSIONS: 'coc_ips_submissions',
  SETTINGS: 'coc_ips_settings',
  GAME_STATE: 'coc_ips_game_state',
  CURRENT_PLAYER: 'coc_ips_current_player_id',
};

const DEFAULT_SETTINGS: GameSettings = {
  teacherPin: '1234',
  allowRetryOnWrong: true,
  rankingBroadcastIntervalMinutes: 8,
  bgmVolume: 0.35,
  sfxVolume: 0.8,
};

const DEFAULT_GAME_STATE: GameState = {
  status: 'RUNNING',
  musicEnabled: true,
  startTime: Date.now(),
  lastBroadcastTime: Date.now(),
};

// Storage Abstraction Interface
export interface GameStorageProvider {
  getQuestions(): Question[];
  saveQuestion(question: Question): void;
  addQuestion(question: Omit<Question, 'id'>): Question;
  resetQuestionsToDefault(): Question[];
  
  getPlayers(): Player[];
  getPlayer(id: string): Player | null;
  getOrCreatePlayer(name: string): Player;
  updatePlayer(player: Player): void;
  
  getSubmissions(): AnswerSubmission[];
  addSubmission(submission: Omit<AnswerSubmission, 'id' | 'submittedAt'>): AnswerSubmission;
  updateSubmissionStatus(id: string, status: AnswerStatus, points: number, feedback?: string): AnswerSubmission | null;
  
  getSettings(): GameSettings;
  updateSettings(settings: Partial<GameSettings>): GameSettings;
  
  getGameState(): GameState;
  updateGameState(state: Partial<GameState>): GameState;
  
  getCurrentPlayerId(): string | null;
  setCurrentPlayerId(id: string | null): void;
  
  resetGameSession(): void;
}

class LocalStorageProvider implements GameStorageProvider {
  constructor() {
    this.initIfEmpty();
  }

  private initIfEmpty() {
    if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(DEFAULT_QUESTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.GAME_STATE)) {
      localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(DEFAULT_GAME_STATE));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PLAYERS)) {
      localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
    }
  }

  getQuestions(): Question[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (!data) return DEFAULT_QUESTIONS;
      return JSON.parse(data);
    } catch {
      return DEFAULT_QUESTIONS;
    }
  }

  saveQuestion(question: Question): void {
    const questions = this.getQuestions();
    const index = questions.findIndex(q => q.id === question.id);
    if (index >= 0) {
      questions[index] = question;
    } else {
      questions.push(question);
    }
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }

  addQuestion(questionData: Omit<Question, 'id'>): Question {
    const questions = this.getQuestions();
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    const newQuestion: Question = {
      ...questionData,
      id: newId,
    };
    questions.push(newQuestion);
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    return newQuestion;
  }

  resetQuestionsToDefault(): Question[] {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(DEFAULT_QUESTIONS));
    return DEFAULT_QUESTIONS;
  }

  getPlayers(): Player[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAYERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getPlayer(id: string): Player | null {
    const players = this.getPlayers();
    return players.find(p => p.id === id) || null;
  }

  getOrCreatePlayer(name: string): Player {
    const trimmed = name.trim();
    const players = this.getPlayers();
    const existing = players.find(p => p.name.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      existing.lastActiveAt = Date.now();
      this.updatePlayer(existing);
      this.setCurrentPlayerId(existing.id);
      return existing;
    }

    const newPlayer: Player = {
      id: 'player_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: trimmed,
      score: 0,
      correctCards: [],
      submittedCards: [],
      wrongCards: [],
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    };

    players.push(newPlayer);
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
    this.setCurrentPlayerId(newPlayer.id);
    return newPlayer;
  }

  updatePlayer(player: Player): void {
    const players = this.getPlayers();
    const index = players.findIndex(p => p.id === player.id);
    if (index >= 0) {
      players[index] = player;
      localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
    }
  }

  getSubmissions(): AnswerSubmission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addSubmission(data: Omit<AnswerSubmission, 'id' | 'submittedAt'>): AnswerSubmission {
    const submissions = this.getSubmissions();
    const newSubmission: AnswerSubmission = {
      ...data,
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      submittedAt: Date.now(),
    };
    submissions.unshift(newSubmission);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));

    // Update player's submittedCards
    const player = this.getPlayer(data.playerId);
    if (player) {
      if (!player.submittedCards.includes(data.cardId)) {
        player.submittedCards.push(data.cardId);
      }
      player.lastActiveAt = Date.now();
      this.updatePlayer(player);
    }

    return newSubmission;
  }

  updateSubmissionStatus(id: string, status: AnswerStatus, points: number, feedback?: string): AnswerSubmission | null {
    const submissions = this.getSubmissions();
    const target = submissions.find(s => s.id === id);
    if (!target) return null;

    target.status = status;
    target.validatedAt = Date.now();
    target.validatedBy = 'Guru';
    target.pointsAwarded = status === 'CORRECT' ? points : 0;
    if (feedback) target.feedbackNote = feedback;

    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));

    // Recalculate player's score and card lists based on all verified submissions
    const player = this.getPlayer(target.playerId);
    if (player) {
      const playerSubs = submissions.filter(s => s.playerId === player.id);
      
      const correctCards = new Set<number>();
      const wrongCards = new Set<number>();
      let totalScore = 0;

      for (const sub of playerSubs) {
        if (sub.status === 'CORRECT') {
          correctCards.add(sub.cardId);
          totalScore += sub.pointsAwarded;
        } else if (sub.status === 'WRONG') {
          wrongCards.add(sub.cardId);
        }
      }

      player.score = totalScore;
      player.correctCards = Array.from(correctCards);
      player.wrongCards = Array.from(wrongCards);
      player.lastActiveAt = Date.now();
      this.updatePlayer(player);
    }

    return target;
  }

  getSettings(): GameSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  updateSettings(settingsUpdate: Partial<GameSettings>): GameSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settingsUpdate };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  }

  getGameState(): GameState {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
      return data ? { ...DEFAULT_GAME_STATE, ...JSON.parse(data) } : DEFAULT_GAME_STATE;
    } catch {
      return DEFAULT_GAME_STATE;
    }
  }

  updateGameState(stateUpdate: Partial<GameState>): GameState {
    const current = this.getGameState();
    const updated = { ...current, ...stateUpdate };
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(updated));
    return updated;
  }

  getCurrentPlayerId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_PLAYER);
  }

  setCurrentPlayerId(id: string | null): void {
    if (id) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PLAYER, id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_PLAYER);
    }
  }

  resetGameSession(): void {
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
    localStorage.removeItem(STORAGE_KEYS.CURRENT_PLAYER);
    const state = this.getGameState();
    this.updateGameState({
      status: 'RUNNING',
      startTime: Date.now(),
      lastBroadcastTime: Date.now(),
    });
  }
}

// Global storage singleton
export const storage: GameStorageProvider = new LocalStorageProvider();

// Helper to export CSV
export function exportRankingToCSV(players: Player[]): void {
  const sorted = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.correctCards.length !== a.correctCards.length) return b.correctCards.length - a.correctCards.length;
    return a.createdAt - b.createdAt;
  });

  const headers = ['Peringkat', 'Nama Siswa', 'Total Poin', 'Jumlah Kartu Benar', 'Kartu Diselesaikan', 'Waktu Bergabung'];
  const rows = sorted.map((p, idx) => [
    idx + 1,
    `"${p.name.replace(/"/g, '""')}"`,
    p.score,
    p.correctCards.length,
    `"${p.correctCards.sort((x, y) => x - y).map(c => `Kartu #${c}`).join(', ')}"`,
    new Date(p.createdAt).toLocaleTimeString('id-ID'),
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Clash_Of_Champions_Ranking_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
