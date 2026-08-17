import React from "react";
import { Language, HillData } from "../types";
import { saptagiriHills } from "../data/saptagiriData";
import { templeAudio } from "../utils/audioSynth";
import { Mountain, Award, MapPin, ArrowRight, BookOpen, Volume2 } from "lucide-react";

interface HillsGridProps {
  language: Language;
  onSelectHill: (hill: HillData) => void;
}

export const HillsGrid: React.FC<HillsGridProps> = ({
  language,
  onSelectHill,
}) => {
  const handleHillClick = (hill: HillData) => {
    templeAudio.playTempleBell(1.0 + hill.number * 0.06);
    onSelectHill(hill);
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-900/60 text-amber-300 text-xs font-semibold border border-amber-600/40">
          <Mountain className="w-3.5 h-3.5" />
          <span>{language === "te" ? "సప్తగిరుల సమగ్ర వైభవం" : "The 7 Sacred Peaks of Tirumala"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-950">
          {language === "te" ? "తిరుమల ఏడుకొండల పురాణ దర్శనం" : "Sacred Lore of Tirumala's Seven Hills"}
        </h2>
        <p className="text-base text-stone-700 leading-relaxed font-sans">
          {language === "te"
            ? "శేషాద్రి నుండి వెంకటాద్రి వరకు ప్రతి పర్వతము ఒక విశేష దివ్య లీలకు, పరమభక్తుల తపస్సుకు మరియు శ్రీహరి అనంత కృపకు ప్రతీక."
            : "From Seshadri to Venkatadri, each mountain embodies a timeless divine pastime, ascetic devotion, and the boundless grace of Lord Srinivasa."}
        </p>
      </div>

      {/* 7 Hills Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {saptagiriHills.map((hill) => (
          <div
            key={hill.id}
            onClick={() => handleHillClick(hill)}
            className="group relative bg-amber-50/90 rounded-2xl border-2 border-amber-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between cursor-pointer"
          >
            {/* Top Accent Gradient Header */}
            <div className={`h-3 bg-gradient-to-r ${hill.colorTheme}`} />

            <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
              
              {/* Badge & Number Row */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-100 text-amber-900 border border-amber-300">
                  {hill.hoodPosition}
                </span>
                <span className="text-xs font-mono font-bold text-stone-500 flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5 text-amber-700" />
                  {hill.altitudeMeters}m
                </span>
              </div>

              {/* Hill Title */}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-serif text-amber-950 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                  <span>{language === "te" ? hill.teluguName : hill.englishName}</span>
                </h3>
                <p className="text-xs font-serif text-amber-800 italic line-clamp-1">
                  {language === "te" ? hill.teluguTitle : hill.englishTitle}
                </p>
              </div>

              {/* Presiding Deity / Entity */}
              <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-200 text-xs space-y-0.5">
                <div className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">
                  {language === "te" ? "అధిష్టాన దైవం / భక్తుడు" : "Associated Deity / Personality"}
                </div>
                <div className="font-semibold text-stone-800 text-sm">
                  {language === "te" ? hill.deityTelugu : hill.deityEnglish}
                </div>
              </div>

              {/* Short Story Abstract */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-3 font-sans">
                {language === "te" ? hill.shortDescTelugu : hill.shortDescEnglish}
              </p>

              {/* Boon Badge */}
              <div className="p-2.5 rounded-lg bg-yellow-50 border border-yellow-200 flex items-start gap-2 text-xs text-amber-900">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div className="line-clamp-2">
                  <span className="font-bold">{language === "te" ? "ముఖ్య వరం: " : "Key Boon: "}</span>
                  {language === "te" ? hill.keyBoonTelugu : hill.keyBoonEnglish}
                </div>
              </div>

              {/* Tirthams Tags */}
              <div className="pt-2 border-t border-amber-200/60">
                <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                  {language === "te" ? "ప్రముఖ తీర్థాలు" : "Key Tirthams"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hill.tirthams.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/80 flex items-center gap-1"
                    >
                      <MapPin className="w-2.5 h-2.5 text-amber-700" />
                      {language === "te" ? t.nameTelugu : t.nameEnglish}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read Full Purana CTA Button */}
              <div className="pt-3">
                <div className="w-full py-2.5 px-4 rounded-xl bg-amber-900 group-hover:bg-amber-800 text-amber-50 font-semibold text-xs sm:text-sm flex items-center justify-between transition-colors shadow-sm font-serif">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
                    {language === "te" ? "సంపూర్ణ పురాణం చదవండి" : "Read Full Purana"}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
