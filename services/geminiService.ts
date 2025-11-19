import { Answer, PersonalityResult } from "../types";
import { TRAIT_KEYS } from "../constants";

// 获取 API Key
const getApiKey = () => {
    let apiKey: string | undefined;
    try {
        // @ts-ignore
        apiKey = import.meta.env?.VITE_API_KEY;
    } catch (e) {
        // 忽略
    }
    if (!apiKey) apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        throw new Error("API Key not found. Please set VITE_API_KEY (DeepSeek Key) in your environment variables.");
    }
    return apiKey;
};

export const analyzePersonality = async (answers: Answer[]): Promise<PersonalityResult> => {
    const apiKey = getApiKey();
    const API_URL = "https://api.deepseek.com/chat/completions";

    // 构建提示词，明确要求 JSON 结构
    const systemPrompt = `你是一位专业的心理学家。请根据用户的回答分析其性格。
必须严格输出标准的 JSON 格式，不要包含 markdown 代码块（如 \`\`\`json），直接返回 JSON 对象。
JSON 结构必须包含以下字段：
- archetype (string): 一个富有创意的性格原型名称（中文）。
- tagline (string): 一句简短的性格标语（中文）。
- description (string): 详细的性格描述（中文）。
- strengths (string array): 3-4个核心优势（中文）。
- weaknesses (string array): 3-4个潜在盲点（中文）。
- radarData (object array): 包含大五人格得分，数组中每个对象需有 'name' (对应: ${TRAIT_KEYS.join(', ')}) 和 'score' (0-100的整数) 两个字段。
- advice (string): 一条生活建议（中文）。`;

    const userContent = `用户回答如下：
${answers.map(a => `- 问题: "${a.questionText}" 回答: "${a.selectedOptionText}"`).join('\n')}

请分析并生成 JSON 报告。`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat", // 使用 DeepSeek V3 模型，性价比高且中文极好
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userContent }
                ],
                response_format: { type: "json_object" }, // 强制 JSON 模式
                temperature: 1.3 // 稍微提高温度以获得更有创意的原型名称
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`DeepSeek API Error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        if (!content) throw new Error("No content received from DeepSeek");

        // 解析 JSON
        let result: PersonalityResult;
        try {
            result = JSON.parse(content);
        } catch (e) {
            console.error("JSON Parse Error", content);
            throw new Error("Failed to parse DeepSeek response as JSON");
        }

        // 简单的校验，确保 radarData 格式正确
        if (!result.radarData || !Array.isArray(result.radarData)) {
             // 如果 AI 偶尔没返回正确的雷达数据，提供默认值防止崩溃
             result.radarData = TRAIT_KEYS.map(key => ({ name: key, score: 50 }));
        }

        return result;

    } catch (error) {
        console.error("DeepSeek API Request Failed:", error);
        throw error;
    }
};