import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="mb-6 flex justify-center">
            <div className="p-4 bg-blue-500/20 rounded-full">
                <Sparkles className="w-12 h-12 text-blue-300" />
            </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 mb-6">
          SoulMirror
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
          通过 DeepSeek 大模型深度分析，探索你内心的潜意识。
          回答几个直觉性问题，让 AI 为你揭示独特的性格原型、优势和隐藏特质。
        </p>

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <span>开始测试</span>
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          
          <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
        </button>
        
        <p className="mt-6 text-sm text-slate-500">
          由 DeepSeek V3 提供技术支持
        </p>
      </div>
    </div>
  );
};

export default Welcome;