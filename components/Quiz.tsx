import React, { useState } from 'react';
import { Question, Answer } from '../types';
import { ChevronRight } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [animating, setAnimating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionId: string, optionText: string) => {
    if (animating) return;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      selectedOptionText: optionText,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setAnimating(true);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setAnimating(false);
      } else {
        onComplete(updatedAnswers);
      }
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 bg-slate-900">
       <div className="w-full max-w-3xl">
         {/* Progress Bar */}
         <div className="mb-8 w-full">
            <div className="flex justify-between text-xs text-indigo-300 mb-2 uppercase tracking-wider font-semibold">
                <span>问题 {currentIndex + 1}</span>
                <span>共 {questions.length} 题</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
         </div>

         {/* Question Card */}
         <div 
            className={`bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-xl transition-all duration-300 transform ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
         >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-snug">
                {currentQuestion.text}
            </h2>

            <div className="grid gap-4">
                {currentQuestion.options.map((option, idx) => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id, option.text)}
                        className="group flex items-center justify-between w-full p-5 text-left bg-slate-700/50 hover:bg-indigo-600/20 border border-slate-600 hover:border-indigo-500 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <span className="text-lg text-slate-200 group-hover:text-white font-medium transition-colors">
                            {option.text}
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </button>
                ))}
            </div>
         </div>
       </div>
    </div>
  );
};

export default Quiz;