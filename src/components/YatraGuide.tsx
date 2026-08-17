import React, { useState } from "react";
import { Language } from "../types";
import { yatraSteps } from "../data/quizData";
import { templeAudio } from "../utils/audioSynth";
import { Compass, Footprints, MapPin, Mountain, Sparkles, CheckCircle2 } from "lucide-react";

interface YatraGuideProps {
  language: Language;
}

export const YatraGuide: React.FC<YatraGuideProps> = ({ language }) => {
  const [activeRoute, setActiveRoute] = useState<"alipiri" | "srivari">("alipiri");

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900 text-amber-300 text-xs font-semibold border border-amber-600">
          <Footprints className="w-3.5 h-3.5" />
          <span>{language === "te" ? "సొపాన మార్గ ప్రదక్షిణ" : "Sacred Footpath Pilgrimage Guide"}</span>
        </div>
        <h2 className="text-3xl font-bold font-serif text-amber-950">
          {language === "te" ? "తిరుమల దివ్య మెట్ల మార్గ దర్శిని" : "Tirumala Trekking & Pedestrian Paths"}
        </h2>
        <p className="text-sm text-stone-700 leading-relaxed font-sans">
          {language === "te"
            ? "శతాబ్దాలుగా అన్నమయ్య, శ్రీకృష్ణదేవరాయలు వంటి భక్తులు కాలినడకన సప్తగిరులను ఎక్కి స్వామిని దర్శించుకున్న పవిత్ర యాత్రా మార్గం."
            : "The ancient pilgrimage paths trodden by saint Annamacharya and millions of devotees ascending the sacred Saptagiri barefoot."}
        </p>
      </div>

      {/* Route Switcher */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            setActiveRoute("alipiri");
            templeAudio.playTempleBell();
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold font-serif transition-all ${
            activeRoute === "alipiri"
              ? "bg-amber-900 text-amber-50 shadow-lg ring-2 ring-amber-400"
              : "bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300"
          }`}
        >
          {language === "te" ? "అలిపిరి మెట్ల మార్గం (3550 మెట్లు • 9 కి.మీ)" : "Alipiri Footpath (3550 Steps • 9 km)"}
        </button>

        <button
          onClick={() => {
            setActiveRoute("srivari");
            templeAudio.playTempleBell();
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold font-serif transition-all ${
            activeRoute === "srivari"
              ? "bg-amber-900 text-amber-50 shadow-lg ring-2 ring-amber-400"
              : "bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300"
          }`}
        >
          {language === "te" ? "శ్రీవారి మెట్టు మార్గం (2388 మెట్లు • 2.1 కి.మీ)" : "Srivari Mettu Route (2388 Steps • 2.1 km)"}
        </button>
      </div>

      {/* Stepper Timeline for Alipiri Route */}
      {activeRoute === "alipiri" && (
        <div className="bg-amber-50/90 rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl space-y-8">
          <div className="space-y-6">
            {yatraSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                
                {/* Step Marker Badge */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center font-serif font-bold text-base shadow-md shrink-0 ring-4 ring-amber-200">
                  {step.stepNumber}
                </div>

                {/* Step Info Content */}
                <div className="flex-1 bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold font-serif text-amber-950">
                      {language === "te" ? step.nameTelugu : step.nameEnglish}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                        {step.distanceKm}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Mountain className="w-3 h-3 text-amber-700" />
                        {step.altitudeMeters}m
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {language === "te" ? step.descriptionTelugu : step.descriptionEnglish}
                  </p>

                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-xs text-amber-900 font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      <strong className="font-bold">{language === "te" ? "ప్రధాన స్థలం: " : "Landmark: "}</strong>
                      {language === "te" ? step.landmarkTelugu : step.landmarkEnglish}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Srivari Mettu Information Card */}
      {activeRoute === "srivari" && (
        <div className="bg-amber-50/90 rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-serif text-amber-950">
              {language === "te" ? "శ్రీవారి మెట్టు – శ్రీకృష్ణదేవరాయల చారిత్రక మార్గం" : "Srivari Mettu – The Royal Historical Route"}
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed font-sans">
              {language === "te"
                ? "శ్రీనివాస మంగాపురం సమీపంలోని శ్రీవారి మెట్టు మార్గం అత్యంత పురాతనమైనది. శ్రీకృష్ణదేవరాయలు తన పట్టపురాణులతో ఈ మార్గం గుండానే సప్తగిరులను అధిరోహించి తిరుమల శ్రీవారిని దర్శించుకునేవారు."
                : "Located near Srinivasa Mangapuram / Chandragiri, Srivari Mettu is an ancient royal route favored by Emperor Sri Krishnadevaraya and Vijayanagara monarchs to reach Tirumala."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
              <div className="font-bold text-amber-900 mb-1">{language === "te" ? "మొత్తం మెట్లు" : "Total Steps"}</div>
              <div className="text-xl font-bold font-mono text-amber-800">2,388 {language === "te" ? "మెట్లు" : "Steps"}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
              <div className="font-bold text-amber-900 mb-1">{language === "te" ? "నడక సమయం" : "Trek Duration"}</div>
              <div className="text-xl font-bold font-mono text-amber-800">1.5 – 2.0 {language === "te" ? "గంటలు" : "Hours"}</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
              <div className="font-bold text-amber-900 mb-1">{language === "te" ? "క్షేత్ర ప్రాశస్త్యం" : "Sacred Link"}</div>
              <div className="text-sm font-semibold text-stone-700">శ్రీనివాస మంగాపురం కల్యాణ వేంకటేశ్వర క్షేత్రం</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
