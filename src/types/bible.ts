export interface BibleData {
  [reference: string]: string;
}

export interface BibleVerse {
  book: string;
  chapter: string;
  verse: string;
  text: string;
}

export interface SearchParams {
  keyword?: string;
  book?: string;
  chapter?: string;
}

// 북마크 아이템 인터페이스
export interface BookmarkItem {
  id: string;
  reference: string; // 예: '창세기1:1'
  book: string;
  chapter: string;
  verse: string;
  text: string;
  note?: string; // 사용자가 추가할 수 있는 메모
  timestamp: number;
  highlightColor?: string; // 하이라이트 색상 (없으면 기본 북마크)
}

// 북마크 컬렉션 타입
export type BookmarksCollection = {
  [id: string]: BookmarkItem;
} 