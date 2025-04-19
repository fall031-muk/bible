// 퀴즈 유형 정의
export type QuizType = 'multiple-choice' | 'fill-blank' | 'true-false';

// 퀴즈 난이도 정의
export type QuizDifficulty = 'easy' | 'medium' | 'hard';

// 퀴즈 아이템 인터페이스 - 기본
export interface BaseQuizItem {
  id: string;
  type: QuizType;
  question: string;
  answer: string | boolean;
  explanation: string;
  reference: string;
  difficulty: QuizDifficulty;
}

// 객관식 퀴즈 인터페이스
export interface MultipleChoiceQuizItem extends BaseQuizItem {
  type: 'multiple-choice';
  options: string[];
  answer: string;
}

// 빈칸 채우기 퀴즈 인터페이스
export interface FillBlankQuizItem extends BaseQuizItem {
  type: 'fill-blank';
  answer: string;
}

// 참/거짓 퀴즈 인터페이스
export interface TrueFalseQuizItem extends BaseQuizItem {
  type: 'true-false';
  answer: boolean;
}

// 퀴즈 아이템 유니온 타입
export type QuizItem = MultipleChoiceQuizItem | FillBlankQuizItem | TrueFalseQuizItem;

// 퀴즈 응답 상태
export interface QuizAnswer {
  quizId: string;
  userAnswer: string | boolean | null;
  isCorrect: boolean;
  attempted: boolean;
}

// 퀴즈 결과 상태
export interface QuizResultStats {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
} 