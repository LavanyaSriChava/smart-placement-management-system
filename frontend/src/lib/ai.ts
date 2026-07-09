import { assistantSystemPrompt, featuredProject, internship, siteConfig, skillGroups } from '../data/portfolio';
import type { AssistantMessage } from '../types/portfolio';

const openRouterModel = import.meta.env.VITE_OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct';
const geminiModel = import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash';

function buildFallbackReply(question: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes('product finder')) {
    return `${featuredProject.title} is Lavanya's primary featured project. It focuses on AI-driven product recommendations, natural language search, wishlist management, search history, analytics, and secure role-based access. It stands out because it combines polished frontend storytelling with practical AI integration through OpenRouter.`;
  }

  if (normalized.includes('internship') || normalized.includes('experience')) {
    return `${internship.organization} placed Lavanya in a full-stack delivery role where she built the Smart Placement Management System. Her work covered JWT authentication, role-based access, Cloudinary resume storage, notifications, resume analysis, placement prediction, and REST API-driven workflows.`;
  }

  if (normalized.includes('hire')) {
    return `Lavanya combines strong academic performance with real product execution. She has backend depth in Java and Spring Boot, frontend capability in React, experience shipping AI-integrated application flows, and proof of discipline through a 9.05 CGPA, 500+ solved DSA problems, and leadership responsibilities at NIT Silchar.`;
  }

  if (normalized.includes('skill')) {
    return `Lavanya's strengths span Java, C, C++, JavaScript, TypeScript, SQL, React.js, Tailwind CSS, Spring Boot, Spring Security, REST APIs, Microservices, PostgreSQL, MySQL, Firebase, Docker, Git, Maven, Railway, and Vercel.`;
  }

  return `Lavanya is a Computer Science and Engineering undergraduate at NIT Silchar with strong interests in full-stack development, backend engineering, AI-powered applications, scalable systems, PostgreSQL, and React.js. Her portfolio highlights recruiter-relevant work across AI Product Finder, Smart Placement Management System, Interview Preparation Tracker, and a microservices enrollment platform.`;
}

async function queryOpenRouter(messages: AssistantMessage[], question: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'HTTP-Referer': siteConfig.siteUrl,
      'X-Title': 'Lavanya Recruiter Portfolio',
    },
    body: JSON.stringify({
      model: openRouterModel,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: assistantSystemPrompt,
        },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        {
          role: 'user',
          content: question,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('OpenRouter request failed');
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return data.choices?.[0]?.message?.content?.trim() || buildFallbackReply(question);
}

async function queryGemini(messages: AssistantMessage[], question: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: assistantSystemPrompt }],
        },
        contents: [
          ...messages.map((message) => ({
            role: message.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: message.content }],
          })),
          {
            role: 'user',
            parts: [{ text: question }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Gemini request failed');
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || buildFallbackReply(question);
}

export function getAssistantProvider() {
  if (import.meta.env.VITE_OPENROUTER_API_KEY) {
    return `OpenRouter · ${openRouterModel}`;
  }

  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return `Gemini · ${geminiModel}`;
  }

  return 'Local portfolio intelligence';
}

export async function generateAssistantReply(messages: AssistantMessage[], question: string) {
  try {
    if (import.meta.env.VITE_OPENROUTER_API_KEY) {
      return await queryOpenRouter(messages, question);
    }

    if (import.meta.env.VITE_GEMINI_API_KEY) {
      return await queryGemini(messages, question);
    }
  } catch {
    return buildFallbackReply(question);
  }

  return buildFallbackReply(question);
}

export function getSkillPreview() {
  return skillGroups.flatMap((group) => group.items).slice(0, 12);
}
