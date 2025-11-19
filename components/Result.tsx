import React from 'react';
import { PersonalityResult } from '../types';
import { 
    ResponsiveContainer, 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis, 
    Radar, 
    Tooltip 
} from 'recharts';
import { Share2, RefreshCcw, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

interface ResultProps {
    result: PersonalityResult;
    onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ result, onReset }) => {
    
    // Setup data for chart to ensure consistent shape
    const chartData = result.radarData;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
            {/* Hero Header */}
            <div className="relative bg-slate-900 border-b border-slate-800 pt-16 pb-24 px-4 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
                     <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-blue-900 rounded-full mix-blend-screen filter blur-3xl"></div>
                     <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-cyan-900 rounded-full mix-blend-screen filter blur-3xl"></div>
                 </div>

                 <div className="max-w-4xl mx-auto text-center">
                     <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-wider mb-6 uppercase">
                         您的性格原型
                     </span>
                     <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-cyan-200 mb-4">
                         {result.archetype}
                     </h1>
                     <p className="text-xl md:text-2xl text-blue-200/80 font-light italic">
                         “{result.tagline}”
                     </p>
                 </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Analysis */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-4">深度分析</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {result.description}
                        </p>
                    </div>

                    {/* Strengths & Weaknesses Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/80 border border-green-900/30 rounded-2xl p-6">
                            <div className="flex items-center mb-4 text-green-400">
                                <CheckCircle2 className="w-6 h-6 mr-2" />
                                <h3 className="text-xl font-semibold">核心优势</h3>
                            </div>
                            <ul className="space-y-3">
                                {result.strengths.map((item, i) => (
                                    <li key={i} className="flex items-start text-slate-300">
                                        <span className="w-1.5 h-1.5 mt-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-slate-900/80 border border-red-900/30 rounded-2xl p-6">
                             <div className="flex items-center mb-4 text-red-400">
                                <AlertCircle className="w-6 h-6 mr-2" />
                                <h3 className="text-xl font-semibold">成长领域</h3>
                            </div>
                            <ul className="space-y-3">
                                {result.weaknesses.map((item, i) => (
                                    <li key={i} className="flex items-start text-slate-300">
                                        <span className="w-1.5 h-1.5 mt-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                     
                     {/* Advice Section */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-2xl p-8">
                        <div className="flex items-start">
                            <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
                                <Lightbulb className="w-8 h-8 text-blue-300" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">生活建议</h3>
                                <p className="text-blue-100 leading-relaxed italic">
                                    {result.advice}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Stats */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col items-center shadow-2xl">
                        <h3 className="text-lg font-semibold text-slate-400 mb-4 uppercase tracking-widest">特质雷达图</h3>
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="得分"
                                        dataKey="score"
                                        stroke="#60a5fa"
                                        strokeWidth={3}
                                        fill="#60a5fa"
                                        fillOpacity={0.4}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                        itemStyle={{ color: '#60a5fa' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-center text-slate-500 mt-4">
                            基于大五人格 (Big 5) 模型分析
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={onReset}
                            className="flex items-center justify-center py-4 px-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors text-white font-medium"
                        >
                            <RefreshCcw className="w-5 h-5 mr-2" />
                            重新测试
                        </button>
                         <button 
                            onClick={() => alert("分享功能即将上线！")}
                            className="flex items-center justify-center py-4 px-6 bg-blue-600 hover:bg-blue-500 border border-blue-500 rounded-xl transition-colors text-white font-medium"
                        >
                            <Share2 className="w-5 h-5 mr-2" />
                            分享结果
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;