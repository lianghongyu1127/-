import { Answer, PersonalityResult, TraitScore } from "../types";
import { TRAIT_KEYS, PREDEFINED_RESULTS } from "../constants";

export const calculatePersonality = (answers: Answer[]): PersonalityResult => {
  // 1. 初始化分数 (每个人格维度基础分 50)
  const scores: { [key: string]: number } = {};
  TRAIT_KEYS.forEach(key => {
    scores[key] = 50;
  });

  // 2. 累加用户选择的分数
  answers.forEach(answer => {
    Object.entries(answer.scores).forEach(([trait, value]) => {
      if (scores[trait] !== undefined) {
        scores[trait] += value;
      }
    });
  });

  // 3. 规范化分数 (限制在 0-100 之间) 并转换为图表数据格式
  const radarData: TraitScore[] = TRAIT_KEYS.map(key => {
    let finalScore = scores[key];
    finalScore = Math.max(0, Math.min(100, finalScore)); // Clamp between 0 and 100
    return { name: key, score: finalScore };
  });

  // 4. 找出得分最高的特质
  let maxScore = -1;
  let dominantTrait = TRAIT_KEYS[0];

  radarData.forEach(item => {
    if (item.score > maxScore) {
      maxScore = item.score;
      dominantTrait = item.name;
    }
  });

  // 5. 获取对应的预设结果
  const preset = PREDEFINED_RESULTS[dominantTrait] || PREDEFINED_RESULTS["宜人性"];

  return {
    ...preset,
    radarData: radarData
  };
};