import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  LayoutDashboard,
  FileQuestion,
  Inbox,
  Trophy,
  Settings,
  RotateCcw,
  Plus,
  Edit3,
  Check,
  X,
  Undo2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  AlertTriangle,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import {
  Question,
  Player,
  AnswerSubmission,
  GameSettings,
  GameState,
  AnswerStatus
} from '../../types/game';
import { storage, exportRankingToCSV } from '../../services/storage';
import { audio } from '../../services/audio';

interface AdminPanelProps {
  questions: Question[];
  players: Player[];
  submissions: AnswerSubmission[];
  settings: GameSettings;
  gameState: GameState;
  onUpdateQuestions: (questions: Question[]) => void;
  onUpdateSubmissions: (submissions: AnswerSubmission[]) => void;
  onUpdatePlayers: (players: Player[]) => void;
  onUpdateSettings: (settings: GameSettings) => void;
  onUpdateGameState: (state: GameState) => void;
  onTriggerGameOver: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  questions,
  players,
  submissions,
  settings,
  gameState,
  onUpdateQuestions,
  onUpdateSubmissions,
  onUpdatePlayers,
  onUpdateSettings,
  onUpdateGameState,
  onTriggerGameOver,
  onClose,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputPin, setInputPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Active Tab
  type TabType = 'DASHBOARD' | 'SOAL' | 'JAWABAN' | 'RANKING' | 'PENGATURAN' | 'RESET';
  const [activeTab, setActiveTab] = useState<TabType>('DASHBOARD');

  // Question editing / creation state
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>('');

  // Submissions filtering
  const [submissionFilter, setSubmissionFilter] = useState<'ALL' | 'PENDING' | 'CORRECT' | 'WRONG'>('PENDING');
  const [searchSubmission, setSearchSubmission] = useState<string>('');

  // Settings change state
  const [newPin, setNewPin] = useState<string>('');
  const [settingsSuccessMessage, setSettingsSuccessMessage] = useState<string>('');

  // Reset confirmation modal
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Handle PIN Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === settings.teacherPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN salah! Silakan coba lagi (PIN bawaan: 1234).');
    }
  };

  // Validation Actions for Submissions
  const handleValidateSubmission = (submissionId: string, status: AnswerStatus, points: number) => {
    const updatedSub = storage.updateSubmissionStatus(submissionId, status, points);
    if (updatedSub) {
      // Play layered audio immediately
      if (status === 'CORRECT') {
        audio.playCorrectSFX();
      } else if (status === 'WRONG') {
        audio.playWrongSFX();
      }

      onUpdateSubmissions(storage.getSubmissions());
      onUpdatePlayers(storage.getPlayers());
    }
  };

  // Handle Save Question
  const handleSaveQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    if (isAddingNew) {
      const added = storage.addQuestion(editingQuestion);
      onUpdateQuestions(storage.getQuestions());
      setIsAddingNew(false);
      setEditingQuestion(null);
      setSaveSuccessMessage(`Soal Kartu #${added.cardNumber} berhasil ditambahkan!`);
    } else {
      storage.saveQuestion(editingQuestion);
      onUpdateQuestions(storage.getQuestions());
      setEditingQuestion(null);
      setSaveSuccessMessage(`Perubahan soal Kartu #${editingQuestion.cardNumber} berhasil disimpan.`);
    }

    setTimeout(() => setSaveSuccessMessage(''), 4000);
  };

  // Reset Questions to Default
  const handleResetQuestions = () => {
    if (window.confirm('Kembalikan seluruh 30 soal ke data default?')) {
      const def = storage.resetQuestionsToDefault();
      onUpdateQuestions(def);
      setSaveSuccessMessage('Seluruh soal telah direset ke 30 kartu default.');
      setTimeout(() => setSaveSuccessMessage(''), 4000);
    }
  };

  // Reset Game Data (Scores & Submissions)
  const handleConfirmResetGame = () => {
    storage.resetGameSession();
    onUpdatePlayers([]);
    onUpdateSubmissions([]);
    setShowResetConfirm(false);
    setActiveTab('DASHBOARD');
  };

  // If Not Authenticated: Show PIN Form
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none">
        <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#0c1827] to-[#040810] border-2 border-indigo-500/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(99,102,241,0.35)] text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-950/80 border border-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <KeyRound className="w-8 h-8 text-indigo-300" />
          </div>

          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-white tracking-wider">
            PANEL GURU
          </h2>
          <p className="font-rajdhani text-xs sm:text-sm text-slate-400 font-semibold mt-1">
            Masukkan PIN Operator untuk mengakses kontrol turnamen
          </p>

          <form onSubmit={handlePinSubmit} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                autoFocus
                value={inputPin}
                onChange={(e) => {
                  setInputPin(e.target.value);
                  if (pinError) setPinError('');
                }}
                placeholder="PIN (Demo: 1234)"
                className="w-full py-3 text-center tracking-[0.5em] font-cinzel text-xl font-bold bg-[#050c14] border-2 border-slate-700 focus:border-indigo-400 focus:shadow-[0_0_15px_rgba(99,102,241,0.4)] rounded-xl text-white outline-none"
              />
              {pinError && (
                <div className="text-xs text-rose-400 font-rajdhani font-semibold mt-2">
                  {pinError}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-rajdhani font-bold text-xs uppercase cursor-pointer hover:bg-slate-800"
              >
                BATAL
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-cinzel font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.5)] cursor-pointer"
              >
                MASUK
              </button>
            </div>
          </form>

          <div className="mt-4 text-[11px] text-slate-500 font-rajdhani">
            PIN Bawaan Demo: <span className="text-indigo-400 font-bold">1234</span>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard calculations
  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter((s) => s.status === 'PENDING').length;
  const correctSubmissions = submissions.filter((s) => s.status === 'CORRECT').length;
  const wrongSubmissions = submissions.filter((s) => s.status === 'WRONG').length;
  const totalPointsDistributed = players.reduce((sum, p) => sum + p.score, 0);

  // Filtered submissions for Validation Queue
  const filteredSubmissions = submissions
    .filter((s) => {
      if (submissionFilter !== 'ALL' && s.status !== submissionFilter) return false;
      if (searchSubmission.trim()) {
        const query = searchSubmission.toLowerCase();
        return (
          s.playerName.toLowerCase().includes(query) ||
          `kartu #${s.cardNumber}`.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Pending first, then newest
      if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
      if (b.status === 'PENDING' && a.status !== 'PENDING') return 1;
      return b.submittedAt - a.submittedAt;
    });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070b14] text-white overflow-hidden select-none">
      {/* Top Bar Navigation */}
      <div className="w-full bg-[#091524] border-b border-indigo-500/40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-950 border border-indigo-400 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]">
            <Shield className="w-5 h-5 text-indigo-300" />
          </div>

          <div>
            <div className="font-cinzel text-sm sm:text-base font-black tracking-wider text-white">
              PANEL GURU & OPERATOR ARENA
            </div>
            <div className="font-rajdhani text-xs text-cyan-400 font-semibold">
              Clash of Champions · Pengendali Pertandingan
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Pending Counter Tag */}
          {pendingSubmissions > 0 && (
            <div
              onClick={() => setActiveTab('JAWABAN')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/80 text-amber-300 text-xs font-rajdhani font-bold cursor-pointer animate-pulse"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{pendingSubmissions} Jawaban Menunggu Validasi!</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            TUTUP / KE ARENA
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="w-full bg-[#050c14] border-b border-slate-800 px-4 flex items-center overflow-x-auto gap-1 text-xs font-rajdhani font-bold">
        <button
          onClick={() => setActiveTab('DASHBOARD')}
          className={`px-4 py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'DASHBOARD'
              ? 'border-indigo-400 text-indigo-300 bg-indigo-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>DASHBOARD</span>
        </button>

        <button
          onClick={() => setActiveTab('JAWABAN')}
          className={`px-4 py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors relative ${
            activeTab === 'JAWABAN'
              ? 'border-amber-400 text-amber-300 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>JAWABAN MASUK</span>
          {pendingSubmissions > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-[10px] flex items-center justify-center font-black">
              {pendingSubmissions}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('SOAL')}
          className={`px-4 py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'SOAL'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileQuestion className="w-4 h-4" />
          <span>BANK SOAL ({questions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('RANKING')}
          className={`px-4 py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'RANKING'
              ? 'border-amber-400 text-amber-300 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>RANKING PESERTA</span>
        </button>

        <button
          onClick={() => setActiveTab('PENGATURAN')}
          className={`px-4 py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'PENGATURAN'
              ? 'border-teal-400 text-teal-300 bg-teal-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>PENGATURAN</span>
        </button>

        <button
          onClick={() => setActiveTab('RESET')}
          className={`px-4 py-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors text-rose-400 ${
            activeTab === 'RESET'
              ? 'border-rose-400 bg-rose-950/30 font-extrabold'
              : 'border-transparent hover:text-rose-300'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESET GAME</span>
        </button>
      </div>

      {/* Main Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#070b14] bg-arena-grid">
        {/* 1. DASHBOARD TAB */}
        {activeTab === 'DASHBOARD' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-4 rounded-xl bg-[#0a1728] border border-slate-700">
                <div className="text-xs text-slate-400 font-rajdhani uppercase font-bold">TOTAL PESERTA</div>
                <div className="font-cinzel text-2xl font-black text-cyan-300 mt-1">{players.length}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#0a1728] border border-slate-700">
                <div className="text-xs text-slate-400 font-rajdhani uppercase font-bold">TOTAL JAWABAN</div>
                <div className="font-cinzel text-2xl font-black text-white mt-1">{totalSubmissions}</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/50">
                <div className="text-xs text-amber-300 font-rajdhani uppercase font-bold">MENUNGGU VALIDASI</div>
                <div className="font-cinzel text-2xl font-black text-amber-400 mt-1">{pendingSubmissions}</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50">
                <div className="text-xs text-emerald-300 font-rajdhani uppercase font-bold">JAWABAN BENAR</div>
                <div className="font-cinzel text-2xl font-black text-emerald-400 mt-1">{correctSubmissions}</div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50">
                <div className="text-xs text-rose-300 font-rajdhani uppercase font-bold">JAWABAN SALAH</div>
                <div className="font-cinzel text-2xl font-black text-rose-400 mt-1">{wrongSubmissions}</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-400/60">
                <div className="text-xs text-amber-300 font-rajdhani uppercase font-bold">TOTAL POIN DISTRIBUSI</div>
                <div className="font-cinzel text-2xl font-black text-metallic-gold mt-1">{totalPointsDistributed}</div>
              </div>
            </div>

            {/* Game Controls & Audio Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#091522] border border-slate-700/80 space-y-4">
                <div className="text-sm font-rajdhani font-bold uppercase tracking-wider text-cyan-300 flex items-center justify-between">
                  <span>KONTROL SESI PERTANDINGAN</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${gameState.status === 'RUNNING' ? 'bg-emerald-950 border border-emerald-500 text-emerald-300' : 'bg-slate-800 text-slate-300'}`}>
                    STATUS: {gameState.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      const updated = storage.updateGameState({ status: 'RUNNING' });
                      onUpdateGameState(updated);
                    }}
                    className="p-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500 text-emerald-300 font-rajdhani font-bold text-xs uppercase flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-5 h-5 text-emerald-400" />
                    <span>MULAI GAME</span>
                  </button>

                  <button
                    onClick={() => {
                      const next = gameState.status === 'PAUSED' ? 'RUNNING' : 'PAUSED';
                      const updated = storage.updateGameState({ status: next });
                      onUpdateGameState(updated);
                    }}
                    className="p-3 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500 text-amber-300 font-rajdhani font-bold text-xs uppercase flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <Pause className="w-5 h-5 text-amber-400" />
                    <span>{gameState.status === 'PAUSED' ? 'RESUME INPUT' : 'PAUSE INPUT'}</span>
                  </button>

                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="p-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500 text-rose-300 font-rajdhani font-bold text-xs uppercase flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5 text-rose-400" />
                    <span>RESET GAME</span>
                  </button>

                  <button
                    onClick={onTriggerGameOver}
                    className="p-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-cinzel font-black text-xs uppercase flex flex-col items-center gap-1 shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer"
                  >
                    <Award className="w-5 h-5 text-white" />
                    <span>GAME OVER</span>
                  </button>
                </div>
              </div>

              {/* BGM Status & Quick SFX Test */}
              <div className="p-5 rounded-2xl bg-[#091522] border border-slate-700/80 space-y-4">
                <div className="text-sm font-rajdhani font-bold uppercase tracking-wider text-cyan-300 flex items-center justify-between">
                  <span>STATUS & PENGUJIAN AUDIO</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${audio.isMusicOn() ? 'bg-cyan-950 border border-cyan-500 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    BGM: {audio.isMusicOn() ? 'ON' : 'OFF'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      audio.toggleBGM();
                      onUpdateGameState({ ...gameState, musicEnabled: audio.isMusicOn() });
                    }}
                    className="p-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500 text-cyan-300 font-rajdhani font-bold text-xs uppercase flex flex-col items-center gap-1 cursor-pointer"
                  >
                    {audio.isMusicOn() ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
                    <span>TOGGLE BGM</span>
                  </button>

                  <button
                    onClick={() => audio.playCorrectSFX()}
                    className="p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500 text-emerald-300 font-rajdhani font-bold text-xs uppercase flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>TEST SFX BENAR</span>
                  </button>

                  <button
                    onClick={() => audio.playWrongSFX()}
                    className="p-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500 text-rose-300 font-rajdhani font-bold text-xs uppercase flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>TEST SFX SALAH</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action to Pending Submissions */}
            {pendingSubmissions > 0 && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-400 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
                  <div>
                    <div className="font-rajdhani font-extrabold text-base text-white">
                      Ada {pendingSubmissions} jawaban siswa yang belum diperiksa!
                    </div>
                    <div className="text-xs text-amber-300 font-rajdhani">
                      Buka tab Jawaban Masuk untuk memberikan pengesahan poin.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('JAWABAN')}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-black text-xs uppercase cursor-pointer shadow-md"
                >
                  PERIKSA SEKARANG
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. JAWABAN MASUK (VALIDATION QUEUE) */}
        {activeTab === 'JAWABAN' && (
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#091522] border border-slate-700">
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs font-rajdhani font-bold">
                <button
                  onClick={() => setSubmissionFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    submissionFilter === 'PENDING'
                      ? 'bg-amber-500 text-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Menunggu ({pendingSubmissions})
                </button>
                <button
                  onClick={() => setSubmissionFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    submissionFilter === 'ALL'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Semua ({totalSubmissions})
                </button>
                <button
                  onClick={() => setSubmissionFilter('CORRECT')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    submissionFilter === 'CORRECT'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Benar ({correctSubmissions})
                </button>
                <button
                  onClick={() => setSubmissionFilter('WRONG')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    submissionFilter === 'WRONG'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Salah ({wrongSubmissions})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchSubmission}
                  onChange={(e) => setSearchSubmission(e.target.value)}
                  placeholder="Cari nama atau kartu..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#050c14] border border-slate-700 rounded-lg text-xs font-rajdhani text-white outline-none"
                />
              </div>
            </div>

            {/* Submissions List */}
            {filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#091522]/60 border border-slate-800 text-slate-400 font-rajdhani">
                Tidak ada jawaban yang sesuai dengan filter ini.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((sub) => {
                  const questionRef = questions.find((q) => q.id === sub.cardId);

                  return (
                    <div
                      key={sub.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        sub.status === 'PENDING'
                          ? 'bg-[#101b2a] border-amber-500/70 shadow-[0_0_20px_rgba(255,183,3,0.2)]'
                          : sub.status === 'CORRECT'
                          ? 'bg-[#091819] border-emerald-500/50'
                          : 'bg-[#180f14] border-rose-500/50'
                      }`}
                    >
                      {/* Header of Submission */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-rajdhani font-black text-lg text-white">
                            {sub.playerName}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-400 text-cyan-300 font-rajdhani font-bold text-xs">
                            Kartu #{sub.cardNumber < 10 ? `0${sub.cardNumber}` : sub.cardNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-rajdhani text-xs">
                            Level {sub.level} · {sub.points} Pts
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-rajdhani">
                            {new Date(sub.submittedAt).toLocaleTimeString('id-ID')}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-rajdhani font-bold ${
                              sub.status === 'PENDING'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500'
                                : sub.status === 'CORRECT'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                                : 'bg-rose-950 text-rose-300 border border-rose-500'
                            }`}
                          >
                            {sub.status === 'PENDING'
                              ? 'MENUNGGU VALIDASI'
                              : sub.status === 'CORRECT'
                              ? `BENAR (+${sub.pointsAwarded} PTS)`
                              : 'SALAH (0 PTS)'}
                          </span>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div className="mb-3">
                        <div className="text-[11px] font-rajdhani uppercase font-bold text-slate-400">
                          PERTANYAAN:
                        </div>
                        <div className="font-rajdhani font-bold text-base text-slate-100">
                          {sub.questionText}
                        </div>
                      </div>

                      {/* Student's Essay Answer */}
                      <div className="p-3.5 rounded-xl bg-[#050c14] border border-slate-700/80 mb-4">
                        <div className="text-[11px] font-rajdhani uppercase font-bold text-cyan-400 mb-1 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>JAWABAN ESSAY SISWA:</span>
                        </div>
                        <p className="font-rajdhani text-sm sm:text-base text-white leading-relaxed whitespace-pre-wrap">
                          {sub.answerText}
                        </p>
                      </div>

                      {/* Teacher Rubric & Keyword Recommendations */}
                      {questionRef && (
                        <div className="p-3.5 rounded-xl bg-[#0a1826]/70 border border-cyan-800/60 mb-4 text-xs font-rajdhani">
                          <div className="text-cyan-300 font-bold uppercase tracking-wider mb-1">
                            📋 PANDUAN RUBRIK & KATA KUNCI (SARAN PENILAIAN):
                          </div>
                          <div className="text-slate-300 mb-2 leading-relaxed">
                            <strong>Rubrik:</strong> {questionRef.rubric}
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-2">
                            <strong className="text-amber-300">Kata Kunci:</strong>
                            {questionRef.keywords.map((kw, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[11px]"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                          <div className="text-slate-400">
                            <strong>Contoh Jawaban Ideal:</strong> {questionRef.exampleAnswer}
                          </div>
                        </div>
                      )}

                      {/* Action Decision Buttons for Teacher */}
                      <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                        <button
                          onClick={() => handleValidateSubmission(sub.id, 'CORRECT', sub.points)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-xs uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.4)] cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>SAHKAN BENAR (+{sub.points} PTS)</span>
                        </button>

                        <button
                          onClick={() => handleValidateSubmission(sub.id, 'WRONG', 0)}
                          className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-cinzel font-bold text-xs uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.3)] cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span>TANDAI SALAH</span>
                        </button>

                        {sub.status !== 'PENDING' && (
                          <button
                            onClick={() => handleValidateSubmission(sub.id, 'PENDING', 0)}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-rajdhani font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
                          >
                            <Undo2 className="w-3.5 h-3.5" />
                            <span>BATALKAN / ULANG</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. BANK SOAL (QUESTIONS MANAGER) */}
        {activeTab === 'SOAL' && (
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#091522] border border-slate-700">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  BANK SOAL TURNAMEN ({questions.length} KARTU)
                </h3>
                <p className="text-xs text-slate-400 font-rajdhani">
                  Semua kartu tersimpan secara lokal dan dapat disesuaikan materinya.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAddingNew(true);
                    setEditingQuestion({
                      id: 0,
                      cardNumber: questions.length + 1,
                      level: 1,
                      points: 100,
                      difficulty: 'Mudah',
                      question: '',
                      keywords: ['perubahan iklim'],
                      rubric: 'Jawaban harus memuat konsep utama.',
                      exampleAnswer: '',
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-cinzel font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,242,254,0.4)]"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ TAMBAH SOAL</span>
                </button>

                <button
                  onClick={handleResetQuestions}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 font-rajdhani font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET KE DEFAULT</span>
                </button>
              </div>
            </div>

            {saveSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs font-rajdhani font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {/* Questions Table / Cards Grid */}
            <div className="space-y-3">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-[#091524] border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-400/80 flex flex-col items-center justify-center shrink-0">
                      <span className="font-rajdhani font-extrabold text-[10px] text-cyan-300">KARTU</span>
                      <span className="font-cinzel font-black text-sm text-white">
                        #{q.cardNumber < 10 ? `0${q.cardNumber}` : q.cardNumber}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-rajdhani font-bold ${
                            q.level === 1
                              ? 'bg-amber-950 text-amber-300 border border-amber-600'
                              : q.level === 2
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                              : 'bg-rose-950 text-rose-300 border border-rose-600'
                          }`}
                        >
                          Level {q.level} ({q.difficulty}) · {q.points} Poin
                        </span>
                      </div>

                      <div className="font-rajdhani font-bold text-base text-white">
                        {q.question}
                      </div>

                      <div className="text-xs text-slate-400 font-rajdhani">
                        <strong>Rubrik:</strong> {q.rubric}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingQuestion({ ...q });
                    }}
                    className="self-end md:self-center px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-cyan-300 font-rajdhani font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>EDIT SOAL</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. RANKING TAB */}
        {activeTab === 'RANKING' && (
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#091522] border border-slate-700">
              <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>PAPAN KLASEMEN GURU</span>
              </h3>

              <button
                onClick={() => exportRankingToCSV(players)}
                disabled={players.length === 0}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-rajdhani font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD LAPORAN CSV</span>
              </button>
            </div>

            <div className="rounded-xl bg-[#091522] border border-slate-800 overflow-x-auto">
              <table className="w-full text-left font-rajdhani">
                <thead>
                  <tr className="bg-[#0e2137] text-xs font-bold uppercase text-cyan-300 border-b border-slate-700">
                    <th className="py-3 px-4 text-center w-16">RANK</th>
                    <th className="py-3 px-4">NAMA</th>
                    <th className="py-3 px-4 text-center">SKOR</th>
                    <th className="py-3 px-4 text-center">KARTU BENAR</th>
                    <th className="py-3 px-4 text-center">TOTAL PERCOBAAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {players.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">
                        Belum ada peserta yang bermain.
                      </td>
                    </tr>
                  ) : (
                    players
                      .sort((a, b) => b.score - a.score)
                      .map((p, idx) => (
                        <tr key={p.id} className="hover:bg-slate-900/50">
                          <td className="py-3 px-4 text-center font-bold">#{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-white">{p.name}</td>
                          <td className="py-3 px-4 text-center font-cinzel font-black text-amber-400 text-base">
                            {p.score}
                          </td>
                          <td className="py-3 px-4 text-center text-emerald-400 font-bold">
                            {p.correctCards.length}
                          </td>
                          <td className="py-3 px-4 text-center text-slate-400">
                            {p.submittedCards.length}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. PENGATURAN TAB */}
        {activeTab === 'PENGATURAN' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {settingsSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-rajdhani font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{settingsSuccessMessage}</span>
              </div>
            )}

            {/* Change PIN Card */}
            <div className="p-5 rounded-2xl bg-[#091522] border border-slate-700/80 space-y-4">
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-indigo-400" />
                <span>GANTI PIN PANEL GURU</span>
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="password"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="PIN Baru (contoh: 5678)"
                  className="w-full sm:w-60 px-4 py-2 bg-[#050c14] border border-slate-700 rounded-xl text-white font-cinzel font-bold text-center tracking-widest outline-none"
                />
                <button
                  onClick={() => {
                    if (newPin.trim().length >= 4) {
                      const updated = storage.updateSettings({ teacherPin: newPin.trim() });
                      onUpdateSettings(updated);
                      setSettingsSuccessMessage('PIN Guru berhasil diperbarui!');
                      setNewPin('');
                      setTimeout(() => setSettingsSuccessMessage(''), 4000);
                    } else {
                      alert('PIN harus minimal 4 karakter!');
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-rajdhani font-bold text-xs uppercase cursor-pointer"
                >
                  SIMPAN PIN
                </button>
              </div>
              <div className="text-xs text-slate-400 font-rajdhani">
                PIN saat ini: <span className="font-bold text-indigo-300">{settings.teacherPin}</span>
              </div>
            </div>

            {/* Game Rules Configuration */}
            <div className="p-5 rounded-2xl bg-[#091522] border border-slate-700/80 space-y-4">
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-teal-400" />
                <span>ATURAN KARTU & VALIDASI</span>
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowRetryOnWrong}
                    onChange={(e) => {
                      const updated = storage.updateSettings({ allowRetryOnWrong: e.target.checked });
                      onUpdateSettings(updated);
                    }}
                    className="w-5 h-5 rounded accent-cyan-400"
                  />
                  <div>
                    <div className="font-rajdhani font-bold text-white text-sm">
                      Izinkan Peserta Mengulang Kartu Jika Jawaban Salah
                    </div>
                    <div className="text-xs text-slate-400 font-rajdhani">
                      Jika dinonaktifkan, kartu yang ditandai salah akan terkunci (LOCKED) bagi siswa tersebut.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Audio Settings */}
            <div className="p-5 rounded-2xl bg-[#091522] border border-slate-700/80 space-y-4">
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-cyan-400" />
                <span>PENGATURAN VOLUME AUDIO</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-rajdhani text-slate-300 font-bold mb-1">
                    <span>VOLUME MUSIK LATAR (BGM)</span>
                    <span>{Math.round(settings.bgmVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.bgmVolume}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      audio.setBgmVolume(val);
                      const updated = storage.updateSettings({ bgmVolume: val });
                      onUpdateSettings(updated);
                    }}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-rajdhani text-slate-300 font-bold mb-1">
                    <span>VOLUME SOUND EFFECT (SFX)</span>
                    <span>{Math.round(settings.sfxVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.sfxVolume}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      audio.setSfxVolume(val);
                      const updated = storage.updateSettings({ sfxVolume: val });
                      onUpdateSettings(updated);
                    }}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. RESET GAME TAB */}
        {activeTab === 'RESET' && (
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-rose-950/20 border-2 border-rose-500/60 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="font-cinzel text-xl font-bold text-rose-400">
              RESET PERTANDINGAN KELAS
            </h3>

            <p className="font-rajdhani text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Tindakan ini akan menghapus seluruh data siswa, skor yang terkumpul, dan riwayat jawaban untuk memulai sesi turnamen baru.
              <br />
              <strong>Bank soal yang telah diedit TIDAK AKAN terhapus.</strong>
            </p>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-cinzel font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.5)] cursor-pointer"
            >
              RESET SELURUH DATA PERTANDINGAN
            </button>
          </div>
        )}
      </div>

      {/* MODAL: EDIT / TAMBAH SOAL */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl my-auto rounded-2xl bg-gradient-to-b from-[#0e1d2c] to-[#040810] border-2 border-cyan-400 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
              <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>{isAddingNew ? 'TAMBAH SOAL BARU' : `EDIT SOAL KARTU #${editingQuestion.cardNumber}`}</span>
              </h3>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestionSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-rajdhani font-bold text-slate-400 uppercase mb-1">
                    NOMOR KARTU
                  </label>
                  <input
                    type="number"
                    value={editingQuestion.cardNumber}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        cardNumber: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full p-2 bg-[#050c14] border border-slate-700 rounded-lg text-white font-rajdhani text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-rajdhani font-bold text-slate-400 uppercase mb-1">
                    LEVEL (1-3)
                  </label>
                  <select
                    value={editingQuestion.level}
                    onChange={(e) => {
                      const lvl = parseInt(e.target.value) as 1 | 2 | 3;
                      const pts = lvl === 1 ? 100 : lvl === 2 ? 200 : 300;
                      const diff = lvl === 1 ? 'Mudah' : lvl === 2 ? 'Menengah' : 'Sulit';
                      setEditingQuestion({
                        ...editingQuestion,
                        level: lvl,
                        points: pts,
                        difficulty: diff,
                      });
                    }}
                    className="w-full p-2 bg-[#050c14] border border-slate-700 rounded-lg text-white font-rajdhani text-sm"
                  >
                    <option value={1}>Level 1 (Mudah)</option>
                    <option value={2}>Level 2 (Menengah)</option>
                    <option value={3}>Level 3 (Sulit)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-rajdhani font-bold text-slate-400 uppercase mb-1">
                    POIN
                  </label>
                  <input
                    type="number"
                    value={editingQuestion.points}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        points: parseInt(e.target.value) || 100,
                      })
                    }
                    className="w-full p-2 bg-[#050c14] border border-slate-700 rounded-lg text-white font-rajdhani text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-rajdhani font-bold text-slate-400 uppercase mb-1">
                  TEKS PERTANYAAN
                </label>
                <textarea
                  rows={3}
                  value={editingQuestion.question}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, question: e.target.value })
                  }
                  className="w-full p-3 bg-[#050c14] border border-slate-700 rounded-lg text-white font-rajdhani text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-rajdhani font-bold text-slate-400 uppercase mb-1">
                  KATA KUNCI (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={editingQuestion.keywords.join(', ')}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      keywords: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 bg-[#050c14] border border-slate-700 rounded-lg text-white font-rajdhani text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-rajdhani font-bold text-slate-400 uppercase mb-1">
                  PANDUAN RUBRIK PENILAIAN
                </label>
                <textarea
                  rows={2}
                  value={editingQuestion.rubric}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, rubric: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#050c14] border border-slate-700 rounded-lg text-white font-rajdhani text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-rajdhani font-bold text-slate-400 uppercase mb-1">
                  CONTOH JAWABAN IDEAL
                </label>
                <textarea
                  rows={2}
                  value={editingQuestion.exampleAnswer}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, exampleAnswer: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#050c14] border border-slate-700 rounded-lg text-white font-rajdhani text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-rajdhani font-bold text-xs uppercase cursor-pointer"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cinzel font-black text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.5)]"
                >
                  SIMPAN PERUBAHAN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM RESET MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#12080a] border-2 border-rose-500 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
            <h3 className="font-cinzel text-xl font-black text-white">KONFIRMASI RESET</h3>
            <p className="font-rajdhani text-sm text-slate-300">
              Apakah Anda yakin ingin menghapus seluruh data pertandingan? Semua skor dan status kartu peserta akan dimulai dari nol.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-rajdhani font-bold text-xs uppercase cursor-pointer"
              >
                BATAL
              </button>
              <button
                onClick={handleConfirmResetGame}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-cinzel font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                YA, RESET PERTANDINGAN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
