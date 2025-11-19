import React, { useState } from 'react';
import { AppState, Answer, PersonalityResult } from './types';
import { QUESTIONS } from './constants';
import { analyzePersonality } from './services/geminiService';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';
import Loading from './components/Loading';
import Result from './components/Result';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = () => {
    setAppState(AppState.QUIZ);
    setAnswers([]);
    setError(null);
  };

  const handleQuizComplete = async (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers);
    setAppState(AppState.ANALYZING);

    try {
      const analysis = await analyzePersonality(completedAnswers);
      setResult(analysis);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("无法分析您的性格。请检查您的 API 密钥或重试。");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.WELCOME);
    setAnswers([]);
    setResult(null);
  };

  // --- Render Views ---

  if (appState === AppState.WELCOME) {
    return <Welcome onStart={startQuiz} />;
  }

  if (appState === AppState.QUIZ) {
    return <Quiz questions={QUESTIONS} onComplete={handleQuizComplete} />;
  }

  if (appState === AppState.ANALYZING) {
    return <Loading />;
  }

  if (appState === AppState.ERROR) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
        <div className="bg-red-500/10 border border-red-500/50 p-8 rounded-2xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">出错了！</h2>
          <p className="text-slate-300 mb-6">{error || "发生了未知错误。"}</p>
          <button 
            onClick={handleReset}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-medium transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (appState === AppState.RESULT && result) {
    return <Result result={result} onReset={handleReset} />;
  }

  return null;
};

export default App;