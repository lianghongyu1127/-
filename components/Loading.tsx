import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse rounded-full"></div>
        <BrainCircuit className="w-24 h-24 text-blue-400 animate-bounce" />
      </div>
      
      <h2 className="mt-8 text-2xl font-bold text-white animate-pulse">
        系统正在分析...
      </h2>
      <p className="mt-4 text-slate-400 max-w-md text-center">
        正在综合您的回答，构建多维度的性格画像。
      </p>
      
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default Loading;