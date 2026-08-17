import React, { useState, useEffect } from "react";
import { Language } from "../types";
import { templeAudio } from "../utils/audioSynth";
import { Volume2, VolumeX, Sparkles, Bell, HelpCircle, BookOpen, Compass, MapPin } from "lucide-react";

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
}) => {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const toggleSound = () => {
    const nextState = templeAudio.toggleTanpura();
    setIsAudioOn(nextState);
  };

  const playBell = () => {
    templeAudio.playTempleBell();
  };

  return (
    <header className="sticky top-0 z-50 bg-amber-950/95 backdrop-blur-md border-b border-amber-800/60 shadow-lg text-amber-50">
      {/* Top Banner / Namam Bar */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 py-1 px-4 text-xs flex justify-between items-center border-b border-amber-700/50">
        <div className="flex items-center gap-2 text-amber-200">
          <span className="font-semibold tracking-wider">ఓం నమో వేంకటేశాయ</span>
          <span className="text-amber-400/60 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-amber-300/80">కలియుగ ప్రత్యక్ష వైకుంఠం</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={playBell}
            title={language === "te" ? "దివ్య గంటానాదం చేయండి" : "Ring Temple Bell"}
            className="flex items-center gap-1 text-xs bg-amber-700/60 hover:bg-amber-600 px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-100 transition-colors"
          >
            <Bell className="w-3 h-3 text-amber-300 animate-bounce" />
            <span>{language === "te" ? "గంటానాదం" : "Bell"}</span>
          </button>

          <button
            onClick={toggleSound}
            title={language === "te" ? "ఆధ్యాత్మిక తాన్‌పూరా నాదం ఆన్/ఆఫ్" : "Toggle Ambient Tanpura Drone"}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border transition-all ${
              isAudioOn
                ? "bg-amber-500 text-amber-950 font-bold border-amber-300 shadow-sm"
                : "bg-amber-900/80 text-amber-200 border-amber-700 hover:bg-amber-800"
            }`}
          >
            {isAudioOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            <span>{language === "te" ? (isAudioOn ? "తాన్‌పూరా ఆన్" : "తాన్‌పూరా నాదం") : (isAudioOn ? "Tanpura ON" : "Ambient Drone")}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tirumala Namam */}
          <div
            onClick={() => onTabChange("overview")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Tirumala Tirunamam Graphic */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-500/60 shadow-md group-hover:scale-105 transition-transform">
              {/* Namam Visual SVG */}
              <svg viewBox="0 0 40 40" className="w-8 h-8">
                {/* White U-Namam */}
                <path
                  d="M10 8 L10 22 C10 28 15 32 20 32 C25 32 30 28 30 22 L30 8 L26 8 L26 21 C26 25 23 28 20 28 C17 28 14 25 14 21 L14 8 Z"
                  fill="#ffffff"
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                />
                {/* Red Kasturi Thilakam / Sindhooram in Center */}
                <path
                  d="M18.5 6 L21.5 6 L21.5 25 C21.5 26 20.5 27 20 27 C19.5 27 18.5 26 18.5 25 Z"
                  fill="#dc2626"
                />
                {/* Yellow base dot */}
                <circle cx="20" cy="30" r="1.5" fill="#f59e0b" />
              </svg>
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-amber-100 flex items-center gap-1.5 font-serif">
                <span>{language === "te" ? "తిరుమల సప్తగిరి పురాణం" : "Tirumala Saptagiri"}</span>
              </div>
              <p className="text-xs text-amber-300/80 tracking-wide font-sans">
                {language === "te" ? "ఏడుకొండల పురాణ–చారిత్రక దర్శనం" : "The 7 Sacred Hills of Tirumala"}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => onTabChange("overview")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === "overview"
                  ? "bg-amber-600 text-white font-semibold shadow-inner"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/60"
              }`}
            >
              {language === "te" ? "సప్తగిరులు" : "The 7 Hills"}
            </button>

            <button
              onClick={() => onTabChange("adisesha")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === "adisesha"
                  ? "bg-amber-600 text-white font-semibold shadow-inner"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/60"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === "te" ? "ఆదిశేష స్వరూపం" : "Adi Sesha Map"}</span>
            </button>

            <button
              onClick={() => onTabChange("stotras")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === "stotras"
                  ? "bg-amber-600 text-white font-semibold shadow-inner"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/60"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === "te" ? "స్తోత్రాలు & సంకీర్తనలు" : "Stotras & Chants"}</span>
            </button>

            <button
              onClick={() => onTabChange("scholar")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === "scholar"
                  ? "bg-amber-600 text-white font-semibold shadow-inner"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/60"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>{language === "te" ? "పురాణ విద్వాంసుడు (AI)" : "Purana Scholar"}</span>
            </button>

            <button
              onClick={() => onTabChange("pooja")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === "pooja"
                  ? "bg-amber-600 text-white font-semibold shadow-inner"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/60"
              }`}
            >
              <span>🔥</span>
              <span>{language === "te" ? "దివ్య హారతి" : "Virtual Pooja"}</span>
            </button>

            <button
              onClick={() => onTabChange("yatra")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === "yatra"
                  ? "bg-amber-600 text-white font-semibold shadow-inner"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/60"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === "te" ? "మెట్ల మార్గం" : "Footpath Guide"}</span>
            </button>

            <button
              onClick={() => onTabChange("quiz")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                activeTab === "quiz"
                  ? "bg-amber-600 text-white font-semibold shadow-inner"
                  : "text-amber-200 hover:text-white hover:bg-amber-900/60"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === "te" ? "పురాణ క్విజ్" : "Quiz"}</span>
            </button>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="bg-amber-900/80 p-1 rounded-lg border border-amber-700/60 flex items-center text-xs">
              <button
                onClick={() => onLanguageChange("te")}
                className={`px-2.5 py-1 rounded transition-all font-medium ${
                  language === "te"
                    ? "bg-amber-500 text-amber-950 font-bold shadow-sm"
                    : "text-amber-200 hover:text-white"
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-2.5 py-1 rounded transition-all font-medium ${
                  language === "en"
                    ? "bg-amber-500 text-amber-950 font-bold shadow-sm"
                    : "text-amber-200 hover:text-white"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 gap-1 border-t border-amber-800/60 scrollbar-none text-xs">
          <button
            onClick={() => onTabChange("overview")}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === "overview" ? "bg-amber-600 text-white font-bold" : "text-amber-200"
            }`}
          >
            {language === "te" ? "సప్తగిరులు" : "7 Hills"}
          </button>
          <button
            onClick={() => onTabChange("adisesha")}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === "adisesha" ? "bg-amber-600 text-white font-bold" : "text-amber-200"
            }`}
          >
            {language === "te" ? "ఆదిశేషుడు" : "Adi Sesha"}
          </button>
          <button
            onClick={() => onTabChange("scholar")}
            className={`px-2.5 py-1 rounded whitespace-nowrap flex items-center gap-1 ${
              activeTab === "scholar" ? "bg-amber-600 text-white font-bold" : "text-amber-200"
            }`}
          >
            <Sparkles className="w-3 h-3 text-yellow-300" />
            {language === "te" ? "విద్వాంసుడు (AI)" : "AI Scholar"}
          </button>
          <button
            onClick={() => onTabChange("stotras")}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === "stotras" ? "bg-amber-600 text-white font-bold" : "text-amber-200"
            }`}
          >
            {language === "te" ? "స్తోత్రాలు" : "Stotras"}
          </button>
          <button
            onClick={() => onTabChange("pooja")}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === "pooja" ? "bg-amber-600 text-white font-bold" : "text-amber-200"
            }`}
          >
            {language === "te" ? "హారతి" : "Pooja"}
          </button>
          <button
            onClick={() => onTabChange("yatra")}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === "yatra" ? "bg-amber-600 text-white font-bold" : "text-amber-200"
            }`}
          >
            {language === "te" ? "మెట్ల మార్గం" : "Footpath"}
          </button>
          <button
            onClick={() => onTabChange("quiz")}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === "quiz" ? "bg-amber-600 text-white font-bold" : "text-amber-200"
            }`}
          >
            {language === "te" ? "క్విజ్" : "Quiz"}
          </button>
        </div>
      </div>
    </header>
  );
};
