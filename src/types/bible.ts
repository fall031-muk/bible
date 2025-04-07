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