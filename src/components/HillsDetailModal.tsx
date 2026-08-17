import React from "react";
import { Language, HillData } from "../types";
import { saptagiriHills } from "../data/saptagiriData";
import { templeAudio } from "../utils/audioSynth";
import { X, ChevronLeft, ChevronRight, Mountain, Award, MapPin, Sparkles, Volume2, BookOpen, Share2 } from "lucide-react";

interface HillsDetailModalProps {
  hill: HillData | null;
  language: Language;
  onClose: () => void;
  onSelectHill: (hill: HillData) => void;
}

export const HillsDetailModal: React.FC<HillsDetailModalProps> = ({
  hill,
  language,
  onClose,
  onSelectHill,
}) => {
  if (!hill) return null;

  const currentIndex = saptagiriHills.findIndex((h) => h.id === hill.id);
  const prevHill = saptagiriHills[(currentIndex - 1 + saptagiriHills.length) % saptagiriHills.length];
  const nextHill = saptagiriHills[(currentIndex + 1) % saptagiriHills.length];

  const handlePlayBell = () => {
    templeAudio.playTempleBell(1.0 + hill.number * 0.08);
  };

  const handleShankha = () => {
    templeAudio.playShankha();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-amber-50 rounded-2xl shadow-2xl border-2 border-amber-500/60 overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Modal Header Bar */}
        <div className={`p-5 sm:p-6 bg-gradient-to-r ${hill.colorTheme} text-white flex items-center justify-between shadow-md relative`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono font-bold tracking-wider">
                {hill.hoodPosition} (#{hill.number})
              </span>
              <span className="text-xs text-amber-100 flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5" />
                {hill.altitudeMeters} {language === "te" ? "మీటర్ల ఎత్తు" : "meters altitude"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-wide text-white drop-shadow">
              {language === "te" ? hill.teluguName : hill.englishName}
            </h2>
            <p className="text-xs sm:text-sm text-yellow-100 font-serif italic max-w-xl">
              {language === "te" ? hill.teluguTitle : hill.englishTitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayBell}
              title={language === "te" ? "గంటానాదం" : "Bell Chime"}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-stone-800 font-sans">
          
          {/* Presiding Deity & Boon Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300/80 space-y-1">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                {language === "te" ? "అధిష్టాన దైవం / పరమభక్తుడు" : "Associated Deity / Personality"}
              </div>
              <div className="text-base font-bold text-amber-950 font-serif">
                {language === "te" ? hill.deityTelugu : hill.deityEnglish}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-yellow-100/70 border border-yellow-300/80 space-y-1">
              <div className="text-xs font-bold text-yellow-900 uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-yellow-700" />
                <span>{language === "te" ? "దివ్య ప్రసాదిత వరం" : "Key Divine Boon"}</span>
              </div>
              <div className="text-sm font-semibold text-yellow-950 font-sans">
                {language === "te" ? hill.keyBoonTelugu : hill.keyBoonEnglish}
              </div>
            </div>
          </div>

          {/* Full Purana Narrative */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-300/60">
              <BookOpen className="w-5 h-5 text-amber-800" />
              <h3 className="text-lg sm:text-xl font-bold font-serif text-amber-950">
                {language === "te" ? `${hill.teluguName} సంపూర్ణ పురాణ గాథ` : `The Complete Puranic Legend of ${hill.englishName}`}
              </h3>
            </div>

            <div className="text-sm sm:text-base leading-relaxed text-stone-800 space-y-4 whitespace-pre-line bg-amber-50/50 p-4 rounded-xl border border-amber-200">
              {language === "te" ? hill.fullPuranaTelugu : hill.fullPuranaEnglish}
            </div>
          </div>

          {/* Sacred Sloka Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-900 to-yellow-950 text-amber-50 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-300 font-sans">
                {language === "te" ? "శ్రీ సప్తగిరి పవిత్ర శ్లోకం" : "Sacred Mountain Shloka"}
              </span>
              <button
                onClick={handleShankha}
                className="text-xs px-3 py-1 rounded-full bg-amber-600/80 hover:bg-amber-500 text-amber-950 font-bold transition-all flex items-center gap-1"
              >
                <span>🐚</span>
                <span>{language === "te" ? "శంఖనాదం" : "Conch Chime"}</span>
              </button>
            </div>

            <div className="text-base sm:text-lg font-serif font-bold text-yellow-200 tracking-wide">
              {hill.sloka}
            </div>

            <div className="text-xs sm:text-sm text-amber-200/90 italic font-sans pt-1 border-t border-amber-800/80">
              <span className="font-semibold text-amber-300">{language === "te" ? "తాత్పర్యం: " : "Meaning: "}</span>
              {language === "te" ? hill.slokaMeaningTelugu : hill.slokaMeaningEnglish}
            </div>
          </div>

          {/* Historical Significance */}
          <div className="space-y-2">
            <h4 className="text-base font-bold font-serif text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>{language === "te" ? "చారిత్రక & క్షేత్ర విశేషాలు" : "Historical Significance & Traditions"}</span>
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed font-sans bg-white p-4 rounded-xl border border-stone-200">
              {language === "te" ? hill.historicalSignificanceTelugu : hill.historicalSignificanceEnglish}
            </p>
          </div>

          {/* Sacred Tirthams Cards */}
          <div className="space-y-3">
            <h4 className="text-base font-bold font-serif text-amber-950 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>{language === "te" ? `${hill.teluguName} పై గల పవిత్ర తీర్థాలు` : `Sacred Tirthams on ${hill.englishName}`}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hill.tirthams.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-amber-100/60 border border-amber-300/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-amber-950 font-serif">
                      {language === "te" ? t.nameTelugu : t.nameEnglish}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                      {language === "te" ? "తీర్థం" : "Holy Spring"}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {language === "te" ? t.significanceTelugu : t.significanceEnglish}
                  </p>
                  <div className="text-[11px] text-amber-800 font-semibold pt-1 border-t border-amber-200">
                    <span className="text-stone-600">{language === "te" ? "ప్రత్యేక పర్వదినం: " : "Special Festival: "}</span>
                    {language === "te" ? t.specialFestivalTelugu : t.specialFestivalEnglish}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Navigation */}
        <div className="p-4 bg-amber-100/90 border-t border-amber-300 flex items-center justify-between text-xs sm:text-sm">
          <button
            onClick={() => onSelectHill(prevHill)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{language === "te" ? `మునుపటి: ${prevHill.teluguName}` : `Prev: ${prevHill.englishName}`}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-100 font-bold transition-all shadow-sm"
          >
            {language === "te" ? "మూసివేయండి" : "Close"}
          </button>

          <button
            onClick={() => onSelectHill(nextHill)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold transition-all"
          >
            <span>{language === "te" ? `తరువాతి: ${nextHill.teluguName}` : `Next: ${nextHill.englishName}`}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
