export type Language = "te" | "en";

export interface Tirtham {
  nameTelugu: string;
  nameEnglish: string;
  significanceTelugu: string;
  significanceEnglish: string;
  specialFestivalTelugu: string;
  specialFestivalEnglish: string;
}

export interface HillData {
  id: string;
  number: number;
  teluguName: string;
  englishName: string;
  teluguTitle: string;
  englishTitle: string;
  deityTelugu: string;
  deityEnglish: string;
  shortDescTelugu: string;
  shortDescEnglish: string;
  fullPuranaTelugu: string;
  fullPuranaEnglish: string;
  historicalSignificanceTelugu: string;
  historicalSignificanceEnglish: string;
  sloka: string;
  slokaMeaningTelugu: string;
  slokaMeaningEnglish: string;
  keyBoonTelugu: string;
  keyBoonEnglish: string;
  altitudeMeters: number;
  tirthams: Tirtham[];
  hoodPosition: string; // "1వ పడగ" / "First Hood"
  colorTheme: string;
  accentColor: string;
  iconName: string;
  imageUrl?: string;
}

export interface StotraVerse {
  telugu: string;
  english: string;
  meaningTelugu: string;
  meaningEnglish: string;
}

export interface StotraItem {
  id: string;
  titleTelugu: string;
  titleEnglish: string;
  category: "suprabhatam" | "namavali" | "annamayya" | "sloka";
  authorTelugu: string;
  authorEnglish: string;
  descriptionTelugu: string;
  descriptionEnglish: string;
  verses: StotraVerse[];
}

export interface QuizQuestion {
  id: number;
  questionTelugu: string;
  questionEnglish: string;
  optionsTelugu: string[];
  optionsEnglish: string[];
  correctIndex: number;
  explanationTelugu: string;
  explanationEnglish: string;
}

export interface YatraStep {
  stepNumber: number;
  nameTelugu: string;
  nameEnglish: string;
  altitudeMeters: number;
  distanceKm: string;
  descriptionTelugu: string;
  descriptionEnglish: string;
  landmarkTelugu: string;
  landmarkEnglish: string;
}
