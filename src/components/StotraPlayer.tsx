import React, { useState } from "react";
import { Language, StotraItem } from "../types";
import { stotrasList } from "../data/stotrasData";
import { templeAudio } from "../utils/audioSynth";
import { BookOpen, Volume2, Music, Sparkles, Play, Pause, Bell } from "lucide-react";

interface StotraPlayerProps {
  language: Language;
}

export const StotraPlayer: React.FC<StotraPlayerProps> = ({ language }) => {
  const [selectedStotraId, setSelectedStotraId] = useState<string>("suprabhatam");
  const [activeVerseIdx, setActiveVerseIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentStotra = stotrasList.find((s) => s.id === selectedStotraId) || stotrasList[0];

  const handleSelectStotra = (stotra: StotraItem) => {
    setSelectedStotraId(stotra.id);
    setActiveVerseIdx(0);
    templeAudio.playTempleBell();
  };

  const handlePlayVerseAudio = (idx: number) => {
    setActiveVerseIdx(idx);
    templeAudio.playTempleBell(1.0 + idx * 0.1);
  };

  const toggleDrone = () => {
    const isNowPlaying = templeAudio.toggleTanpura();
    setIsPlayingAudio(isNowPlaying);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900 text-amber-300 text-xs font-semibold border border-amber-600/40">
          <Music className="w-3.5 h-3.5" />
          <span>{language === "te" ? "దివ్య స్తోత్రాలు & అన్నమయ్య సంకీర్తనలు" : "Sacred Hymns & Annamayya Sankeerthanas"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-950">
          {language === "te" ? "శ్రీవారి నిత్య దివ్య నామ సంకీర్తనం" : "Divine Stotras & Melodic Prayers"}
        </h2>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
          {language === "te"
            ? "సుప్రభాతం నుండి గోవింద నామాల వరకు, పదకవితా పితామహుడు అన్నమాచార్యుల సంకీర్తనల మాధుర్యాన్ని ఆస్వాదించండి."
            : "Immerse in the celestial morning hymns and Annamacharya’s devotional masterworks glorifying the Lord of the Seven Hills."}
        </p>
      </div>

      {/* Tabs for selecting Stotras */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stotrasList.map((stotra) => {
          const isSelected = stotra.id === selectedStotraId;
          return (
            <button
              key={stotra.id}
              onClick={() => handleSelectStotra(stotra)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? "bg-amber-900 text-amber-50 border-amber-600 shadow-lg ring-2 ring-amber-400 font-bold"
                  : "bg-amber-50 hover:bg-amber-100 text-stone-800 border-amber-300"
              }`}
            >
              <div className="text-xs text-amber-400 font-mono mb-1">
                {stotra.category.toUpperCase()}
              </div>
              <div className="text-sm sm:text-base font-serif line-clamp-2">
                {language === "te" ? stotra.titleTelugu : stotra.titleEnglish}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Stotra Viewer Card */}
      <div className="bg-amber-50/90 rounded-2xl border-2 border-amber-300 shadow-xl overflow-hidden">
        
        {/* Title Bar with Author & Audio Controls */}
        <div className="p-6 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-amber-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-700">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-serif text-amber-100">
              {language === "te" ? currentStotra.titleTelugu : currentStotra.titleEnglish}
            </h3>
            <p className="text-xs sm:text-sm text-yellow-300 font-sans">
              <span className="font-semibold">{language === "te" ? "రచన: " : "Author: "}</span>
              {language === "te" ? currentStotra.authorTelugu : currentStotra.authorEnglish}
            </p>
            <p className="text-xs text-amber-200/80 font-sans max-w-xl">
              {language === "te" ? currentStotra.descriptionTelugu : currentStotra.descriptionEnglish}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleDrone}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                isPlayingAudio
                  ? "bg-amber-500 text-amber-950 ring-2 ring-yellow-300"
                  : "bg-amber-800 hover:bg-amber-700 text-amber-200 border border-amber-600"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{language === "te" ? (isPlayingAudio ? "తాన్‌పూరా ఆపు" : "తాన్‌పూరా నాదం") : (isPlayingAudio ? "Pause Tanpura" : "Tanpura Drone")}</span>
            </button>

            <button
              onClick={() => templeAudio.playTempleBell(1.1)}
              title={language === "te" ? "గంటానాదం చేయండి" : "Ring Temple Bell"}
              className="p-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-amber-100 transition-all border border-amber-500/40"
            >
              <Bell className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>

        {/* Verses Container */}
        <div className="p-6 sm:p-8 space-y-6 divide-y divide-amber-200">
          {currentStotra.verses.map((verse, idx) => {
            const isActive = activeVerseIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => handlePlayVerseAudio(idx)}
                className={`pt-6 first:pt-0 rounded-xl p-4 transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-100/80 border-l-4 border-amber-700 shadow-xs"
                    : "hover:bg-amber-100/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    {language === "te" ? `చరణం ${idx + 1}` : `Verse ${idx + 1}`}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayVerseAudio(idx);
                    }}
                    className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>{language === "te" ? "పఠన నాదం" : "Chime"}</span>
                  </button>
                </div>

                {/* Primary Verse Text */}
                <div className="text-lg sm:text-xl font-serif font-bold text-amber-950 leading-relaxed whitespace-pre-line tracking-wide">
                  {language === "te" ? verse.telugu : verse.english}
                </div>

                {/* Transliteration if in English mode, or English script */}
                {language === "te" && (
                  <div className="text-xs sm:text-sm text-stone-500 font-sans italic mt-1 whitespace-pre-line">
                    {verse.english}
                  </div>
                )}

                {/* Meaning Card */}
                <div className="mt-3 p-3.5 rounded-lg bg-white/80 border border-amber-200 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                  <span className="font-bold text-amber-900">
                    {language === "te" ? "దివ్య తాత్పర్యం: " : "Divine Meaning: "}
                  </span>
                  {language === "te" ? verse.meaningTelugu : verse.meaningEnglish}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
