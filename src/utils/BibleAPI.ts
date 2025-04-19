import bibleData from '../data/bible.json';

interface BibleVerse {
  book: string;
  chapter: string;
  verse: string;
  text: string;
}

// 성경 참조 파싱
export const parseReference = (reference: string): { book: string; chapter: string; verses: string[] } | null => {
  // 다양한 형식의 성경 참조 처리
  // 예: "창세기 1:1", "창세기1:1", "창세기 1:1-5", "창세기 1장", "창세기 1장 1-5절"
  console.log("파싱할 참조:", reference);
  
  // 책 이름 추출 (숫자가 나오기 전까지)
  const bookMatch = reference.match(/^([^\d]+)/);
  if (!bookMatch) return null;
  
  let book = bookMatch[1].trim();
  
  // 장 번호 추출 - 다양한 패턴 지원
  let chapter = "";
  // 패턴 1: "창세기1:1" 또는 "창세기 1:1" - 숫자 다음에 콜론이 오는 경우
  const chapterColonMatch = reference.match(/(\d+):/);
  // 패턴 2: "창세기1장" 또는 "창세기 1장" - 숫자 다음에 '장'이 오는 경우
  const chapterKoreanMatch = reference.match(/(\d+)장/);
  // 패턴 3: "창세기17" 또는 "창세기 17"과 같이 숫자만 있는 경우
  const simpleNumberMatch = reference.match(/[\s]?(\d+)(?![:장])/);
  
  if (chapterColonMatch) {
    chapter = chapterColonMatch[1];
  } else if (chapterKoreanMatch) {
    chapter = chapterKoreanMatch[1];
  } else if (simpleNumberMatch) {
    chapter = simpleNumberMatch[1];
  } else {
    return null; // 장 번호를 찾을 수 없음
  }
  
  // 절 번호 추출 (선택사항)
  let verses: string[] = [];
  
  // 절 범위(예: 1-5) 또는 단일 절 추출
  const verseRangeMatch = reference.match(/(\d+)[-~](\d+)/);
  if (verseRangeMatch) {
    const start = parseInt(verseRangeMatch[1]);
    const end = parseInt(verseRangeMatch[2]);
    for (let i = start; i <= end; i++) {
      verses.push(i.toString());
    }
  } else {
    const verseSingleMatch = reference.match(/[:](\d+)/);
    if (verseSingleMatch) {
      verses.push(verseSingleMatch[1]);
    }
  }
  
  console.log("파싱 결과:", { book, chapter, verses });
  return { book, chapter, verses };
};

// 성경 구절 가져오기
export const getVerses = (reference: string): BibleVerse[] => {
  console.log("구절 가져오기 시작:", reference);
  const parsedRef = parseReference(reference);
  if (!parsedRef) {
    console.log("참조를 파싱할 수 없습니다.");
    return [];
  }
  
  const { book, chapter, verses } = parsedRef;
  const result: BibleVerse[] = [];
  
  // 책 이름 변환 (예: '창세기' -> '창')
  const shortBookName = convertToShortBookName(book);
  
  // 장 전체를 가져오는 경우
  if (verses.length === 0) {
    console.log(`${shortBookName}${chapter}: 장 전체 가져오기`);
    Object.entries(bibleData).forEach(([ref, text]) => {
      if (ref.startsWith(`${shortBookName}${chapter}:`)) {
        const verseMatch = ref.match(/[:](\d+)/);
        if (verseMatch) {
          result.push({
            book,
            chapter,
            verse: verseMatch[1],
            text: text as string
          });
        }
      }
    });
    
    // 장-절 번호 기준으로 정렬
    result.sort((a, b) => parseInt(a.verse) - parseInt(b.verse));
    console.log(`${result.length}개 구절 찾음`);
    return result;
  }
  
  // 특정 절만 가져오는 경우
  console.log(`${shortBookName}${chapter}:${verses.join(',')} 특정 절 가져오기`);
  verses.forEach(verse => {
    const key = `${shortBookName}${chapter}:${verse}`;
    console.log("검색할 키:", key);
    const text = (bibleData as any)[key];
    if (text) {
      result.push({
        book,
        chapter,
        verse,
        text
      });
    } else {
      console.log(`${key}에 해당하는 구절을 찾을 수 없습니다.`);
    }
  });
  
  // 장-절 번호 기준으로 정렬
  result.sort((a, b) => parseInt(a.verse) - parseInt(b.verse));
  console.log(`${result.length}개 구절 찾음`);
  return result;
};

// 참조 형식 정규화
export const formatReference = (reference: string): string => {
  const parsedRef = parseReference(reference);
  if (!parsedRef) return reference;
  
  const { book, chapter, verses } = parsedRef;
  
  if (verses.length === 0) {
    return `${book} ${chapter}장`;
  } else if (verses.length === 1) {
    return `${book} ${chapter}:${verses[0]}`;
  } else {
    return `${book} ${chapter}:${verses[0]}-${verses[verses.length - 1]}`;
  }
};

// 책 이름을 짧은 형식으로 변환 (예: '창세기' -> '창')
function convertToShortBookName(fullBookName: string): string {
  const bookNameMap: { [key: string]: string } = {
    '창세기': '창',
    '출애굽기': '출',
    '레위기': '레',
    '민수기': '민',
    '신명기': '신',
    '여호수아': '수',
    '사사기': '삿',
    '룻기': '룻',
    '사무엘상': '삼상',
    '사무엘하': '삼하',
    '열왕기상': '왕상',
    '열왕기하': '왕하',
    '역대상': '대상',
    '역대하': '대하',
    '에스라': '스',
    '느헤미야': '느',
    '에스더': '에',
    '욥기': '욥',
    '시편': '시',
    '잠언': '잠',
    '전도서': '전',
    '아가': '아',
    '이사야': '사',
    '예레미야': '렘',
    '예레미야애가': '애',
    '에스겔': '겔',
    '다니엘': '단',
    '호세아': '호',
    '요엘': '욜',
    '아모스': '암',
    '오바댜': '옵',
    '요나': '욘',
    '미가': '미',
    '나훔': '나',
    '하박국': '합',
    '스바냐': '습',
    '학개': '학',
    '스가랴': '슥',
    '말라기': '말',
    '마태복음': '마',
    '마가복음': '막',
    '누가복음': '눅',
    '요한복음': '요',
    '사도행전': '행',
    '로마서': '롬',
    '고린도전서': '고전',
    '고린도후서': '고후',
    '갈라디아서': '갈',
    '에베소서': '엡',
    '빌립보서': '빌',
    '골로새서': '골',
    '데살로니가전서': '살전',
    '데살로니가후서': '살후',
    '디모데전서': '딤전',
    '디모데후서': '딤후',
    '디도서': '딛',
    '빌레몬서': '몬',
    '히브리서': '히',
    '야고보서': '약',
    '베드로전서': '벧전',
    '베드로후서': '벧후',
    '요한일서': '요일',
    '요한이서': '요이',
    '요한삼서': '요삼',
    '유다서': '유',
    '요한계시록': '계'
  };

  // 이미 짧은 형식인 경우 그대로 반환
  if (fullBookName.length <= 2) return fullBookName;
  
  // 공백 제거 후 매핑
  const trimmedName = fullBookName.trim();
  return bookNameMap[trimmedName] || trimmedName;
} 