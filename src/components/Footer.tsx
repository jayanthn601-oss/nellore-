import React from "react";
import { Language, HillData } from "../types";
import { saptagiriHills } from "../data/saptagiriData";
import { templeAudio } from "../utils/audioSynth";
import { Sparkles, Mountain, Heart, BookOpen, Volume2 } from "lucide-react";

interface FooterProps {
  language: Language;
  onSelectHill: (hill: HillData) => void;
  onTabChange: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onSelectHill,
  onTabChange,
}) => {
  return (
    <footer className="bg-gradient-to-b from-stone-950 via-amber-950 to-stone-950 text-amber-100 border-t border-amber-800/60 font-sans">
      
      {/* Govinda Chants Ticker Bar */}
      <div className="bg-amber-900/60 py-2.5 px-4 text-center border-b border-amber-800/40 text-xs sm:text-sm font-serif text-amber-200">
        <span className="font-bold text-yellow-300">గోవిందా గోవింద! </span>
        <span className="mx-2">•</span>
        <span>ఏడుకొండలవాడ వెంకటరమణ గోవిందా గోవింద! </span>
        <span className="mx-2 hidden sm:inline">•</span>
        <span className="hidden sm:inline">ఆపద్బాంధవ అనాథరక్షక గోవిందా గోవింద!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: About Applet */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-amber-100">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>{language === "te" ? "తిరుమల సప్తగిరులు" : "Tirumala Saptagiri"}</span>
            </div>
            <p className="text-xs text-amber-300/80 leading-relaxed">
              {language === "te"
                ? "శ్రీ వేంకటేశ్వర స్వామివారి దివ్య లీలలతో, ఆదిశేషుని ఏడు పడగల స్వరూపమైన సప్తగిరుల పురాణ–చారిత్రక కథనం."
                : "The divine mythological and historical portal chronicling the Seven Sacred Hills of Tirumala, the cosmic hoods of Adi Sesha."}
            </p>
            <div className="pt-2">
              <button
                onClick={() => templeAudio.playTempleBell(1.1)}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-800/60 hover:bg-amber-700 text-amber-200 border border-amber-600/40 flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === "te" ? "దివ్య గంటానాదం" : "Play Temple Bell"}</span>
              </button>
            </div>
          </div>

          {/* Col 2: The 7 Hills Navigation */}
          <div className="space-y-3">
            <div className="text-sm font-bold font-serif uppercase tracking-wider text-amber-300">
              {language === "te" ? "సప్తగిరుల దర్శనం" : "The 7 Sacred Hills"}
            </div>
            <ul className="space-y-1.5 text-xs text-amber-200/90">
              {saptagiriHills.map((hill) => (
                <li key={hill.id}>
                  <button
                    onClick={() => onSelectHill(hill)}
                    className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{language === "te" ? `${hill.number}. ${hill.teluguName}` : `${hill.number}. ${hill.englishName}`}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sections & Features */}
          <div className="space-y-3">
            <div className="text-sm font-bold font-serif uppercase tracking-wider text-amber-300">
              {language === "te" ? "ఆధ్యాత్మిక విభాగాలు" : "Spiritual Features"}
            </div>
            <ul className="space-y-2 text-xs text-amber-200/90">
              <li>
                <button onClick={() => onTabChange("overview")} className="hover:text-yellow-300 transition-colors">
                  {language === "te" ? "• ఏడుకొండల సమగ్ర సమాచారం" : "• 7 Hills Overview"}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange("adisesha")} className="hover:text-yellow-300 transition-colors">
                  {language === "te" ? "• ఆదిశేష 7 పడగల మ్యాప్" : "• Adi Sesha 7 Hoods Map"}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange("stotras")} className="hover:text-yellow-300 transition-colors">
                  {language === "te" ? "• సుప్రభాతం & అన్నమయ్య కీర్తనలు" : "• Suprabhatam & Annamayya Songs"}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange("scholar")} className="hover:text-yellow-300 transition-colors">
                  {language === "te" ? "• పురాణ విద్వాంసుడు (AI Scholar)" : "• AI Purana Scholar"}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange("pooja")} className="hover:text-yellow-300 transition-colors">
                  {language === "te" ? "• భావన పూజ & కర్పూర హారతి" : "• Virtual Harathi & Pooja"}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange("yatra")} className="hover:text-yellow-300 transition-colors">
                  {language === "te" ? "• అలిపిరి & శ్రీవారి మెట్టు మార్గం" : "• Pilgrimage Footpath Guide"}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange("quiz")} className="hover:text-yellow-300 transition-colors">
                  {language === "te" ? "• పురాణ క్విజ్ (Quiz)" : "• Saptagiri Purana Quiz"}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Puranic Sources & Sacred Reference */}
          <div className="space-y-3">
            <div className="text-sm font-bold font-serif uppercase tracking-wider text-amber-300">
              {language === "te" ? "పురాణ ఆధారాలు" : "Puranic Sources"}
            </div>
            <p className="text-xs text-amber-300/80 leading-relaxed">
              {language === "te"
                ? "తిరుమల తిరుపతి దేవస్థానం (TTD) అధికారిక ప్రచురణలు, వరాహ పురాణం, పద్మ పురాణం, భవిష్యోత్తర పురాణం మరియు బ్రహ్మాండ పురాణాల ఆధారంగా రూపొందించబడింది."
                : "Curated from authentic TTD publications, Varaha Purana, Padma Purana, Bhavishyottara Purana, and Brahmanda Purana."}
            </p>
            <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-800/80 text-[11px] text-amber-300 font-serif">
              "వేంకటాద్రి సమం స్థానం బ్రహ్మాండే నాస్తి కించన"
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-amber-900/80 text-center text-xs text-amber-400/70 space-y-1">
          <div>
            {language === "te"
              ? "సర్వే జనా సుఖినో భవంతు • సమస్త సన్మంగళాని భవంతు"
              : "Sarve Jana Sukhino Bhavantu • May Peace and Grace Prevail"}
          </div>
          <div className="text-[11px] text-amber-500/50">
            Dedicated to Sri Venkateswara Swamy & The Sacred Saptagiri
          </div>
        </div>

      </div>
    </footer>
  );
};
