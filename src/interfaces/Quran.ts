export interface QuranObject {
  verses: Verse[];
}

interface Verse {
  id: number;
  verse_key: string;
  text_imlaei: string;
}
