import React from "react";
import { Language } from "../types";
import { saptagiriSummary } from "../data/saptagiriData";
import { templeAudio } from "../utils/audioSynth";
import heroImg from "../assets/images/tirumala_saptagiri_hero_1786979386214.jpg";
import { Sparkles, Mountain, Volume2, ShieldCheck, Compass } from "lucide-react";

interface HeroSectionProps {
  language: Language;
  onExploreHills: () => void;
  onOpenScholar: () => void;
  onOpenAdiSesha: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreHills,
  onOpenScholar,
  onOpenAdiSesha,
}) => {
  const handleShankha = () => {
    templeAudio.playShankha();
  };

  const handleBell = () => {
    templeAudio.playTempleBell();
  };

  return (
    <div className="relative overflow-hidden bg-amber-950 text-amber-50">
      {/* Background Hero Image with Deep Vignette Gradient */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={heroImg}
          alt="Tirumala Saptagiri Seven Hills"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse transition-all duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/75 to-amber-950/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Main Text Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Sacred Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
              <span className="font-semibold tracking-wider">
                {language === "te" ? "కలియుగ వైకుంఠ క్షేత్రం • సప్తగిరి పురాణ దర్శనం" : "Kaliyuga Vaikuntham • Seven Sacred Hills"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300 leading-tight">
              {language === "te" ? "తిరుమల ఏడుకొండల పురాణ–చారిత్రక కథనం" : "The Mythological & Sacred Lore of Tirumala's Seven Hills"}
            </h1>

            {/* Sub-description with user prompt exact emphasis */}
            <p className="text-base sm:text-lg md:text-xl text-amber-200/90 leading-relaxed font-sans max-w-3xl">
              {language === "te" ? (
                <>
                  <strong className="text-amber-100">శేషాద్రి, నీలాద్రి, గరుడాద్రి, అంజనాద్రి, వృషభాద్రి, నారాయణాద్రి, వెంకటాద్రి</strong> — సాక్షాత్తు ఆదిశేషుని ఏడు దివ్య పడగల ప్రతిరూపాలైన సప్తగిరుల పురాణ ప్రాశస్త్యం, తీర్థాల విశేషాలు మరియు శ్రీ వేంకటేశ్వర స్వామి దివ్య లీలలు.
                </>
              ) : (
                <>
                  <strong className="text-amber-100">Seshadri, Neeladri, Garudadri, Anjanadri, Vrishabhadri, Narayanadri, and Venkatadri</strong> — The Seven Sacred Peaks representing the seven cosmic hoods of Adi Sesha, sanctified by Lord Sri Venkateswara and His supreme devotees.
                </>
              )}
            </p>

            {/* Sacred Sloka Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-900/70 to-yellow-950/70 border border-amber-500/40 shadow-xl backdrop-blur-md">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold tracking-widest text-amber-400 font-sans">
                    {language === "te" ? "మహా పవిత్ర శ్లోకం" : "Sacred Saptagiri Shloka"}
                  </div>
                  <div className="text-base sm:text-lg font-serif font-bold text-amber-100 tracking-wide">
                    {saptagiriSummary.keyVerse}
                  </div>
                  <div className="text-xs sm:text-sm text-amber-300/80 italic font-sans">
                    {language === "te"
                      ? "ఈ బ్రహ్మాండంలో వెంకటాద్రితో సమానమైన స్థలము లేదు; శ్రీ వేంకటేశ్వరునితో సమానమైన దైవము లేదు."
                      : saptagiriSummary.keyVerseTranslation}
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={handleShankha}
                    title={language === "te" ? "దివ్య శంఖనాదం ఆలకించండి" : "Hear Divine Conch Shell Sound"}
                    className="p-2.5 rounded-lg bg-amber-600/80 hover:bg-amber-500 text-amber-950 font-bold transition-all shadow-md flex items-center justify-center gap-1 text-xs"
                  >
                    <span>🐚</span>
                    <span className="hidden sm:inline text-amber-950">{language === "te" ? "శంఖం" : "Conch"}</span>
                  </button>
                  <button
                    onClick={handleBell}
                    title={language === "te" ? "గంటానాదం" : "Bell Chime"}
                    className="p-2 rounded-lg bg-amber-800/80 hover:bg-amber-700 text-amber-200 transition-all flex items-center justify-center text-xs"
                  >
                    <Volume2 className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreHills}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-amber-950 font-bold shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 font-serif text-base"
              >
                <Mountain className="w-5 h-5 text-amber-950" />
                <span>{language === "te" ? "సప్తగిరుల సమగ్ర దర్శనం" : "Explore 7 Sacred Hills"}</span>
              </button>

              <button
                onClick={onOpenAdiSesha}
                className="px-5 py-3 rounded-xl bg-amber-900/80 hover:bg-amber-800 border border-amber-600/60 text-amber-200 font-semibold transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Compass className="w-5 h-5 text-amber-400" />
                <span>{language === "te" ? "ఆదిశేష 7 పడగల మ్యాప్" : "Adi Sesha 7 Hoods Map"}</span>
              </button>

              <button
                onClick={onOpenScholar}
                className="px-5 py-3 rounded-xl bg-amber-800/50 hover:bg-amber-800 border border-amber-400/40 text-amber-100 font-semibold transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-300 animate-bounce" />
                <span>{language === "te" ? "పురాణ విద్వాంసుని అడగండి (AI)" : "Ask Purana Scholar (AI)"}</span>
              </button>
            </div>

          </div>

          {/* Right Column: 7 Hills Quick Pill Grid */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-amber-950/80 border border-amber-600/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-amber-800/80">
                <div className="text-sm font-bold text-amber-200 font-serif flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{language === "te" ? "పవిత్ర సప్తగిరులు (7 కొండలు)" : "The Sacred Saptagiri"}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-800 text-amber-300 font-mono">
                  7 Hills
                </span>
              </div>

              {/* 7 Hills List summary */}
              <div className="divide-y divide-amber-900/60 text-xs sm:text-sm">
                {[
                  { nameTe: "1. శేషాద్రి", nameEn: "1. Seshadri", deity: "ఆదిశేషుడు (Kreedachalam)", hood: "1st Hood" },
                  { nameTe: "2. నీలాద్రి", nameEn: "2. Neeladri", deity: "నీలాదేవి (కేశ సమర్పణ)", hood: "2nd Hood" },
                  { nameTe: "3. గరుడాద్రి", nameEn: "3. Garudadri", deity: "గరుత్మంతుడు (విష్ణు వాహనం)", hood: "3rd Hood" },
                  { nameTe: "4. అంజనాద్రి", nameEn: "4. Anjanadri", deity: "అంజనాదేవి - హనుమ జన్మస్థలం", hood: "4th Hood" },
                  { nameTe: "5. వృషభాద్రి", nameEn: "5. Vrishabhadri", deity: "వృషభాసురుడు (ముక్తి క్షేత్రం)", hood: "5th Hood" },
                  { nameTe: "6. నారాయణాద్రి", nameEn: "6. Narayanadri", deity: "నారాయణ మహర్షి (శ్రీవారి పాదాలు)", hood: "6th Hood" },
                  { nameTe: "7. వెంకటాద్రి", nameEn: "7. Venkatadri", deity: "శ్రీ వేంకటేశ్వరుడు (ఆనంద నిలయం)", hood: "7th Crown" },
                ].map((hill, idx) => (
                  <div
                    key={idx}
                    onClick={onExploreHills}
                    className="py-2.5 px-2 flex items-center justify-between hover:bg-amber-900/40 rounded cursor-pointer transition-colors group"
                  >
                    <div className="font-semibold text-amber-100 group-hover:text-yellow-300">
                      {language === "te" ? hill.nameTe : hill.nameEn}
                    </div>
                    <div className="text-xs text-amber-400/80 text-right">
                      {language === "te" ? hill.deity : hill.hood}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 text-center border-t border-amber-800/80">
                <button
                  onClick={onExploreHills}
                  className="text-xs text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-4"
                >
                  {language === "te" ? "ప్రతి కొండ పూర్తి పురాణ కథ చదవండి →" : "Read full purana of each hill →"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
