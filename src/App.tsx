import React, { useState, useEffect, useRef } from 'react';
import { LandingScreen } from './components/screens/LandingScreen';
import { StudentNameScreen } from './components/screens/StudentNameScreen';
import { ArenaScreen } from './components/screens/ArenaScreen';
import { QuestionModal } from './components/screens/QuestionModal';
import { AnswerResultModal } from './components/screens/AnswerResultModal';
import { RankingScreen } from './components/screens/RankingScreen';
import { GameOverScreen } from './components/screens/GameOverScreen';
import { AdminPanel } from './components/admin/AdminPanel';
import { Header } from './components/common/Header';
import { RankingNotificationModal } from './components/common/RankingNotificationModal';
import { storage } from './services/storage';
import { audio } from './services/audio';
import {
  Question,
  Player,
  AnswerSubmission,
  GameSettings,
  GameState,
  AnswerStatus,
} from './types/game';

type CurrentScreen = 'LANDING' | 'STUDENT_NAME' | 'ARENA' | 'RANKING' | 'GAMEOVER';

export default function App() {
  // Screen and modal navigation
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('LANDING');
  const [showTeacherPanel, setShowTeacherPanel] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [answerResult, setAnswerResult] = useState<{
    status: AnswerStatus;
    cardNumber: number;
    points: number;
  } | null>(null);
  const [showPeriodicRanking, setShowPeriodicRanking] = useState<boolean>(false);

  // App data state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [submissions, setSubmissions] = useState<AnswerSubmission[]>([]);
  const [settings, setSettings] = useState<GameSettings>(storage.getSettings());
  const [gameState, setGameState] = useState<GameState>(storage.getGameState());
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  // Load initial data
  useEffect(() => {
    const loadedQuestions = storage.getQuestions();
    const loadedPlayers = storage.getPlayers();
    const loadedSubmissions = storage.getSubmissions();
    const loadedSettings = storage.getSettings();
    const loadedGameState = storage.getGameState();

    setQuestions(loadedQuestions);
    setPlayers(loadedPlayers);
    setSubmissions(loadedSubmissions);
    setSettings(loadedSettings);
    setGameState(loadedGameState);

    // Check if there was an active player stored
    const currentPlayerId = storage.getCurrentPlayerId();
    if (currentPlayerId) {
      const p = storage.getPlayer(currentPlayerId);
      if (p) setCurrentPlayer(p);
    }
  }, []);

  // Update current player instance whenever players list updates
  useEffect(() => {
    if (currentPlayer) {
      const refreshed = players.find((p) => p.id === currentPlayer.id);
      if (refreshed) {
        setCurrentPlayer(refreshed);
      }
    }
  }, [players]);

  // Global 8-Minute Arena Ranking Broadcast Timer
  // Interval: 8 minutes (configurable via settings)
  const lastBroadcastRef = useRef<number>(Date.now());
  useEffect(() => {
    const intervalMs = (settings.rankingBroadcastIntervalMinutes || 8) * 60 * 1000;

    const timer = setInterval(() => {
      // Only broadcast if in Arena or during gameplay
      if (currentScreen === 'ARENA' || currentScreen === 'RANKING') {
        setShowPeriodicRanking(true);
        lastBroadcastRef.current = Date.now();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [settings.rankingBroadcastIntervalMinutes, currentScreen]);

  // Handler: Enter Arena from Landing Screen
  const handleEnterArena = () => {
    if (currentPlayer) {
      setCurrentScreen('ARENA');
    } else {
      setCurrentScreen('STUDENT_NAME');
    }
  };

  // Handler: Student Name Submitted
  const handleStudentNameSubmitted = (player: Player) => {
    setCurrentPlayer(player);
    setPlayers(storage.getPlayers());
    setCurrentScreen('ARENA');
  };

  // Handler: Answer Submission from Question Modal
  const handleSubmitAnswer = (answerText: string) => {
    if (!selectedQuestion || !currentPlayer) return;

    // Create submission in storage
    const newSub = storage.addSubmission({
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      cardId: selectedQuestion.id,
      cardNumber: selectedQuestion.cardNumber,
      level: selectedQuestion.level,
      points: selectedQuestion.points,
      questionText: selectedQuestion.question,
      answerText: answerText,
      status: 'PENDING',
      pointsAwarded: 0,
    });

    // Refresh state
    setSubmissions(storage.getSubmissions());
    setPlayers(storage.getPlayers());

    // Show result feedback modal
    const qNum = selectedQuestion.cardNumber;
    const qPts = selectedQuestion.points;
    setSelectedQuestion(null);

    setAnswerResult({
      status: 'PENDING',
      cardNumber: qNum,
      points: qPts,
    });
  };

  // Handler: Trigger Game Over (from Teacher Panel)
  const handleTriggerGameOver = () => {
    setShowTeacherPanel(false);
    setSelectedQuestion(null);
    setAnswerResult(null);
    setCurrentScreen('GAMEOVER');
  };

  // Handler: Play Again from Game Over
  const handlePlayAgain = () => {
    audio.playBGM();
    setCurrentScreen('STUDENT_NAME');
  };

  // Handler: Return Home
  const handleReturnHome = () => {
    setCurrentScreen('LANDING');
  };

  return (
    <div className="min-h-screen w-full bg-[#070b14] text-slate-100 flex flex-col font-rajdhani">
      {/* Universal Header (visible on Arena and Ranking) */}
      {(currentScreen === 'ARENA' || currentScreen === 'RANKING') && (
        <Header
          player={currentPlayer}
          onOpenRanking={() => setCurrentScreen('RANKING')}
          onOpenTeacherPanel={() => setShowTeacherPanel(true)}
          onReturnHome={handleReturnHome}
        />
      )}

      {/* MAIN SCREEN SWITCHER */}
      <main className="flex-1 w-full flex flex-col">
        {currentScreen === 'LANDING' && (
          <LandingScreen
            onEnterArena={handleEnterArena}
            onOpenTeacherPanel={() => setShowTeacherPanel(true)}
          />
        )}

        {currentScreen === 'STUDENT_NAME' && (
          <StudentNameScreen
            onNameSubmitted={handleStudentNameSubmitted}
            onBackToLanding={handleReturnHome}
          />
        )}

        {currentScreen === 'ARENA' && currentPlayer && (
          <ArenaScreen
            questions={questions}
            player={currentPlayer}
            submissions={submissions}
            settings={settings}
            onSelectQuestion={(q) => setSelectedQuestion(q)}
            onOpenRanking={() => setCurrentScreen('RANKING')}
            onChangePlayer={() => setCurrentScreen('STUDENT_NAME')}
          />
        )}

        {currentScreen === 'RANKING' && (
          <RankingScreen
            players={players}
            currentPlayerId={currentPlayer?.id}
            onBackToArena={() => setCurrentScreen('ARENA')}
          />
        )}

        {currentScreen === 'GAMEOVER' && (
          <GameOverScreen
            players={players}
            onPlayAgain={handlePlayAgain}
            onReturnToHome={handleReturnHome}
          />
        )}
      </main>

      {/* QUESTION CHALLENGE MODAL */}
      {selectedQuestion && currentPlayer && (
        <QuestionModal
          question={selectedQuestion}
          player={currentPlayer}
          currentStatus={
            submissions.find(
              (s) => s.playerId === currentPlayer.id && s.cardId === selectedQuestion.id
            )?.status === 'CORRECT'
              ? 'CORRECT'
              : 'AVAILABLE'
          }
          onSubmitAnswer={handleSubmitAnswer}
          onClose={() => setSelectedQuestion(null)}
        />
      )}

      {/* ANSWER RESULT MODAL */}
      {answerResult && (
        <AnswerResultModal
          status={answerResult.status}
          cardNumber={answerResult.cardNumber}
          points={answerResult.points}
          onReturnToArena={() => setAnswerResult(null)}
        />
      )}

      {/* PERIODIC 8-MINUTE ARENA RANKING BROADCAST OVERLAY */}
      <RankingNotificationModal
        isOpen={showPeriodicRanking}
        onClose={() => setShowPeriodicRanking(false)}
        players={players}
        autoCloseSeconds={12}
      />

      {/* TEACHER / ADMIN PANEL MODAL */}
      {showTeacherPanel && (
        <AdminPanel
          questions={questions}
          players={players}
          submissions={submissions}
          settings={settings}
          gameState={gameState}
          onUpdateQuestions={(updated) => setQuestions(updated)}
          onUpdateSubmissions={(updated) => setSubmissions(updated)}
          onUpdatePlayers={(updated) => setPlayers(updated)}
          onUpdateSettings={(updated) => setSettings(updated)}
          onUpdateGameState={(updated) => setGameState(updated)}
          onTriggerGameOver={handleTriggerGameOver}
          onClose={() => setShowTeacherPanel(false)}
        />
      )}
    </div>
  );
}
