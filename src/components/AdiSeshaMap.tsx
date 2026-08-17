import React, { useState } from "react";
import { Language, HillData } from "../types";
import { saptagiriHills } from "../data/saptagiriData";
import { templeAudio } from "../utils/audioSynth";
import adiseshaImg from "../assets/images/adisesha_saptagiri_1786979413980.jpg";
import { Sparkles, Mountain, ArrowRight, Shield, Award, MapPin } from "lucide-react";

interface AdiSeshaMapProps {
  language: Language;
  onSelectHill: (hill: HillData) => void;
}

export const AdiSeshaMap: React.FC<AdiSeshaMapProps> = ({
  language,
  onSelectHill,
}) => {
  const [selectedHillId, setSelectedHillId] = useState<string>("venkatadri");

  const currentHill = saptagiriHills.find((h) => h.id === selectedHillId) || saptagiriHills[6];

  const handleHoodClick = (hill: HillData) => {
    setSelectedHillId(hill.id);
    templeAudio.playTempleBell(1.0 + hill.number * 0.08);
  };

  return (
    <div className="bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 text-amber-50 py-12 px-4 sm:px-6 lg:px-8 border-t border-b border-amber-800/50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "te" ? "ఆదిశేషుని దివ్య విరాట్ స్వరూపం" : "Cosmic Form of Adi Sesha"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-amber-100">
            {language === "te" ? "సప్తగిరులు — ఆదిశేషుని ఏడు పడగలు" : "Saptagiri — The Seven Hoods of Adi Sesha"}
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 leading-relaxed font-sans">
            {language === "te"
              ? "పురాణాల ప్రకారం మొత్తం శేషాచల పర్వతావళి ఆదిశేషుని శరీర స్వరూపం. శిరస్సు భాగం తిరుమల సప్తగిరులు (7 పడగలు), నడుము భాగం అహోబిలం, తోక భాగం శ్రీశైలంగా భాసిల్లుతోంది."
              : "According to puranic cosmology, the entire mountain range is the divine body of Adi Sesha. The head is Tirumala (7 hoods), the torso is Ahobilam, and the tail reaches Srisailam."}
          </p>
        </div>

        {/* Grand Regional Trinity Card (Tirumala - Ahobilam - Srisailam) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-amber-900/60 border-2 border-amber-400 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-amber-950 font-bold flex items-center justify-center font-serif text-base shrink-0 shadow-md">
              1
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 font-sans">
                {language === "te" ? "శిరస్సు (7 పడగలు)" : "Head (7 Divine Hoods)"}
              </div>
              <div className="text-base font-bold text-amber-50 font-serif">
                {language === "te" ? "తిరుమల (సప్తగిరులు)" : "Tirumala (Saptagiri)"}
              </div>
              <div className="text-xs text-amber-200/80">
                {language === "te" ? "శ్రీ వేంకటేశ్వర స్వామి సన్నిధి" : "Sri Venkateswara Sanctum"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-700 shadow-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-700 text-amber-200 font-bold flex items-center justify-center font-serif text-base shrink-0">
              2
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 font-sans">
                {language === "te" ? "శరీరం (మధ్య భాగం)" : "Torso (Middle Body)"}
              </div>
              <div className="text-base font-bold text-amber-100 font-serif">
                {language === "te" ? "అహోబిలం (నవ నారసింహులు)" : "Ahobilam (Nava Narasimha)"}
              </div>
              <div className="text-xs text-stone-400">
                {language === "te" ? "నరసింహ స్వామి అవతార స్థలం" : "Lord Narasimha Sacred Abode"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-700 shadow-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-700 text-amber-200 font-bold flex items-center justify-center font-serif text-base shrink-0">
              3
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 font-sans">
                {language === "te" ? "తోక (పుచ్ఛ భాగం)" : "Tail (Sacred Base)"}
              </div>
              <div className="text-base font-bold text-amber-100 font-serif">
                {language === "te" ? "శ్రీశైలం (మల్లికార్జున స్వామి)" : "Srisailam (Mallikarjuna)"}
              </div>
              <div className="text-xs text-stone-400">
                {language === "te" ? "ద్వాదశ జ్యోతిర్లింగ క్షేత్రం" : "Sacred Jyotirlinga Shrine"}
              </div>
            </div>
          </div>
        </div>

        {/* 7 Hoods Interactive Visual Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive 7 Hoods Diagram */}
          <div className="lg:col-span-7 bg-stone-950/80 rounded-2xl p-5 sm:p-6 border border-amber-800/60 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-lg font-bold font-serif text-amber-200">
                  {language === "te" ? "సప్తగిరుల 7 పడగల ప్రదక్షిణ" : "Interactive 7 Hoods of Seshachalam"}
                </h3>
                <p className="text-xs text-amber-400/80 font-sans">
                  {language === "te" ? "ఏ కొండపై నైనా క్లిక్ చేసి పూర్తి వివరాలు తెలుసుకోండి" : "Click on any hill to explore its sacred purana"}
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-900/80 text-amber-300 border border-amber-600/40">
                {language === "te" ? "7 దివ్య శిఖరాలు" : "7 Sacred Peaks"}
              </span>
            </div>

            {/* Visual Arc of 7 Serpent Hoods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2 my-6">
              {saptagiriHills.map((hill) => {
                const isSelected = hill.id === selectedHillId;
                return (
                  <button
                    key={hill.id}
                    onClick={() => handleHoodClick(hill)}
                    className={`relative p-3 rounded-xl flex flex-col items-center justify-between text-center transition-all group ${
                      isSelected
                        ? "bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-400 text-amber-950 shadow-xl scale-105 ring-2 ring-yellow-300 font-bold"
                        : "bg-stone-900/90 hover:bg-amber-950/80 text-amber-200 border border-amber-800/50 hover:border-amber-500/70"
                    }`}
                  >
                    {/* Serpent Hood Crown Icon */}
                    <div className="relative my-1">
                      <svg viewBox="0 0 36 36" className="w-8 h-8">
                        {/* Cobra Hood Outline */}
                        <path
                          d="M18 4 C10 4 6 12 6 20 C6 26 12 30 18 32 C24 30 30 26 30 20 C30 12 26 4 18 4 Z"
                          fill={isSelected ? "#78350f" : "#451a03"}
                          stroke={isSelected ? "#fef08a" : "#d97706"}
                          strokeWidth="2"
                        />
                        {/* Sacred Namam inside Hood */}
                        <path
                          d="M14 12 L14 20 C14 22 16 24 18 24 C20 24 22 22 22 20 L22 12"
                          stroke={isSelected ? "#ffffff" : "#fbbf24"}
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <line x1="18" y1="10" x2="18" y2="21" stroke="#dc2626" strokeWidth="1.5" />
                      </svg>
                      <span className={`absolute -top-1 -right-2 text-[10px] px-1 rounded-full font-mono ${
                        isSelected ? "bg-amber-950 text-yellow-300" : "bg-amber-800 text-amber-200"
                      }`}>
                        #{hill.number}
                      </span>
                    </div>

                    <div className="mt-2 space-y-0.5">
                      <div className="text-xs sm:text-sm font-bold font-serif truncate w-full">
                        {language === "te" ? hill.teluguName : hill.englishName}
                      </div>
                      <div className={`text-[10px] truncate w-full ${isSelected ? "text-amber-950 font-semibold" : "text-amber-400/80"}`}>
                        {hill.altitudeMeters}m
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-300 rotate-45" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Background Illustration Banner */}
            <div className="relative rounded-xl overflow-hidden mt-4 border border-amber-800/40">
              <img
                src={adiseshaImg}
                alt="Adi Sesha Saptagiri"
                referrerPolicy="no-referrer"
                className="w-full h-48 sm:h-56 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex items-end p-4">
                <div className="text-xs text-amber-200 bg-stone-900/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-amber-700/50">
                  <span className="font-bold text-amber-300">{language === "te" ? "పురాణ సూక్తి: " : "Puranic Truth: "}</span>
                  {language === "te"
                    ? "ఆదిశేషుని ఏడు పడగలపై వెలసిన ఈ ఏడుకొండల దర్శనం సర్వపాప విముక్తిదాయకం."
                    : "Worshipping the Seven Hills hallowed by Adi Sesha's hoods confers freedom from all karmic distress."}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Active Hill Focus Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-amber-900/80 via-stone-900 to-amber-950 p-6 rounded-2xl border border-amber-600/50 shadow-2xl space-y-5">
            
            {/* Active Hill Header */}
            <div className="space-y-1 pb-4 border-b border-amber-700/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/30 text-yellow-300 border border-amber-400/40">
                  {currentHill.hoodPosition} (#{currentHill.number})
                </span>
                <span className="text-xs text-amber-300 flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5" />
                  {currentHill.altitudeMeters} {language === "te" ? "మీటర్ల ఎత్తు" : "meters altitude"}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-amber-100 pt-1">
                {language === "te" ? currentHill.teluguName : currentHill.englishName}
              </h3>
              <p className="text-xs font-serif text-amber-300 italic">
                {language === "te" ? currentHill.teluguTitle : currentHill.englishTitle}
              </p>
            </div>

            {/* Sacred Deity Association */}
            <div className="p-3.5 rounded-xl bg-amber-950/80 border border-amber-700/40 space-y-1">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider font-sans">
                {language === "te" ? "అధిష్టాన దైవం / పరమభక్తుడు" : "Presiding Deity / Personality"}
              </div>
              <div className="text-sm font-semibold text-amber-100">
                {language === "te" ? currentHill.deityTelugu : currentHill.deityEnglish}
              </div>
            </div>

            {/* Purana Brief */}
            <div className="space-y-2 text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans">
              <div className="font-bold text-amber-300 text-xs uppercase tracking-wider">
                {language === "te" ? "పురాణ కథనం & ప్రాశస్త్యం" : "Puranic Legend"}
              </div>
              <p className="line-clamp-4">
                {language === "te" ? currentHill.shortDescTelugu : currentHill.shortDescEnglish}
              </p>
            </div>

            {/* Key Boon */}
            <div className="p-3 rounded-xl bg-yellow-950/60 border border-yellow-600/40 flex items-start gap-2.5">
              <Award className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-yellow-300">
                  {language === "te" ? "దివ్య ప్రసాదిత వరం: " : "Divine Boon: "}
                </span>
                <span className="text-amber-100">
                  {language === "te" ? currentHill.keyBoonTelugu : currentHill.keyBoonEnglish}
                </span>
              </div>
            </div>

            {/* Main Tirthams on this Hill */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {language === "te" ? "ఈ కొండపై గల పవిత్ర తీర్థాలు" : "Sacred Tirthams on this Hill"}
              </div>
              <div className="flex flex-wrap gap-2">
                {currentHill.tirthams.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-stone-800 border border-amber-700/60 text-amber-200 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {language === "te" ? t.nameTelugu : t.nameEnglish}
                  </span>
                ))}
              </div>
            </div>

            {/* Open Detailed Hill View Button */}
            <button
              onClick={() => onSelectHill(currentHill)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-amber-950 font-bold shadow-lg hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-serif text-sm"
            >
              <span>{language === "te" ? `${currentHill.teluguName} సంపూర్ణ పురాణ విశేషాలు చూడండి` : `Explore Full Details of ${currentHill.englishName}`}</span>
              <ArrowRight className="w-4 h-4 text-amber-950" />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
