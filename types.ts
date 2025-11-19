export enum ContentType {
  TEXT = 'TEXT',
  CODE = 'CODE',
  MERMAID = 'MERMAID',
  CALLOUT = 'CALLOUT',
  LIST = 'LIST',
  TABLE = 'TABLE',
  QUIZ = 'QUIZ',
  KEY_TERMS = 'KEY_TERMS'
}

export enum CalloutType {
  NOTE = 'note',
  WARNING = 'warning',
  TIP = 'tip',
  DEEP_DIVE = 'deep-dive',
  PITFALL = 'pitfall',
  BEST_PRACTICE = 'best-practice'
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ContentBlock {
  id: string;
  type: ContentType;
  content: string | string[];
  title?: string; // For sections, code block language, or quiz question
  variant?: CalloutType; // For callouts
  // For Quizzes
  options?: QuizOption[];
  answerExplanation?: string;
}

export interface Section {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface Chapter {
  id: string;
  slug: string;
  title: string;
  description: string;
  sections: Section[];
}

export interface SearchResult {
  chapterId: string;
  chapterTitle: string;
  sectionId: string;
  sectionTitle: string;
  matchContext: string;
}