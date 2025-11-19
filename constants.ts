import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "经过漫长而疲惫的一周后，你更倾向于如何充电？",
    options: [
      { id: 'a', text: "和朋友去参加热闹的聚会。" },
      { id: 'b', text: "独自蜷缩在角落看书或看电影。" },
      { id: 'c', text: "在大自然中漫步。" },
      { id: 'd', text: "专注于一项创造性的爱好。" }
    ]
  },
  {
    id: 2,
    text: "在工作或学习中遇到难题时，你通常会：",
    options: [
      { id: 'a', text: "立即与他人进行头脑风暴。" },
      { id: 'b', text: "先独自分析数据和逻辑。" },
      { id: 'c', text: "寻找切实可行、经过验证的解决方案。" },
      { id: 'd', text: "相信直觉并随机应变。" }
    ]
  },
  {
    id: 3,
    text: "在集体谈话中，你通常是那个：",
    options: [
      { id: 'a', text: "负责大部分发言和讲故事的人。" },
      { id: 'b', text: "在发言前先倾听和观察的人。" },
      { id: 'c', text: "调解冲突并确保大家都开心的人。" },
      { id: 'd', text: "提出深刻、抽象问题的人。" }
    ]
  },
  {
    id: 4,
    text: "你通常如何安排你的假期？",
    options: [
      { id: 'a', text: "我不怎么做计划；我喜欢随性而为。" },
      { id: 'b', text: "我每天都有详细的行程安排。" },
      { id: 'c', text: "我有一个大概的想法，但留有变动的余地。" },
      { id: 'd', text: "我让别人帮我安排。" }
    ]
  },
  {
    id: 5,
    text: "做决定时，你最看重什么？",
    options: [
      { id: 'a', text: "逻辑、事实和客观真理。" },
      { id: 'b', text: "它将如何影响相关的人。" },
      { id: 'c', text: "是否符合我的个人价值观。" },
      { id: 'd', text: "未来的潜在可能性。" }
    ]
  },
  {
    id: 6,
    text: "当你走进一个凌乱的房间时，你的第一反应是：",
    options: [
      { id: 'a', text: "立刻整理和打扫。" },
      { id: 'b', text: "无视它；有序的混乱对我来说没问题。" },
      { id: 'c', text: "感到不知所措并离开。" },
      { id: 'd', text: "好奇它是怎么变成这样的。" }
    ]
  }
];

// Default Radar Chart keys for the AI to populate
export const TRAIT_KEYS = [
  "开放性",
  "尽责性",
  "外向性",
  "宜人性",
  "神经质"
];