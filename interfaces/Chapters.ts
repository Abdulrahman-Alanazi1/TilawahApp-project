export interface chaptersObject {
  chapters: Chapter[];
}

interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: Translatedname;
}

interface Translatedname {
  language_name: string;
  name: string;
}
