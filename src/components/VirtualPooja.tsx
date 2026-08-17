import React, { useState } from "react";
import { Language } from "../types";
import { templeAudio } from "../utils/audioSynth";
import lordImg from "../assets/images/lord_venkateswara_1786979400397.jpg";
import { Sparkles, Bell, Flame, Heart, Award } from "lucide-react";

interface VirtualPoojaProps {
  language: Language;
}

export const VirtualPooja: React.FC<VirtualPoojaProps> = ({ language }) => {
  const [isHarathiActive, setIsHarathiActive] = useState(false);
  const [flowerCount, setFlowerCount] = useState(0);
  const [isDeepamLit, setIsDeepamLit] = useState(false);
  const [coconutOffered, setCoconutOffered] = useState(false);
  const [devoteeName, setDevoteeName] = useState("");
  const [gotram, setGotram] = useState("");
  const [sankalpamDone, setSankalpamDone] = useState(false);

  const handleHarathi = () => {
    setIsHarathiActive(true);
    templeAudio.playHarathiSound();
    setTimeout(() => {
      setIsHarathiActive(false);
    }, 4000);
  };

  const handleFlowerArchana = () => {
    setFlowerCount((prev) => prev + 1);
    templeAudio.playTempleBell(1.2);
  };

  const handleDeepam = () => {
    setIsDeepamLit(!isDeepamLit);
    templeAudio.playTempleBell(1.0);
  };

  const handleCoconut = () => {
    setCoconutOffered(true);
    templeAudio.playTempleBell(1.4);
    setTimeout(() => {
      setCoconutOffered(false);
    }, 3000);
  };

  const handleSankalpam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName.trim()) return;
    setSankalpamDone(true);
    templeAudio.playShankha();
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900 text-amber-300 text-xs font-semibold border border-amber-600">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>{language === "te" ? "భావన పూజ & హారతి" : "Devotional Virtual Darshan & Harathi"}</span>
        </div>
        <h2 className="text-3xl font-bold font-serif text-amber-950">
          {language === "te" ? "శ్రీ వేంకటేశ్వర స్వామివారి దివ్య అర్చన" : "Virtual Seva & Camphor Harathi"}
        </h2>
        <p className="text-sm text-stone-700 max-w-xl mx-auto font-sans">
          {language === "te"
            ? "భక్తి శ్రద్ధలతో శ్రీవారికి కర్పూర హారతి, పుష్పార్చన, దీపారాధన సమర్పించి సంకల్పం చెప్పుకోండి."
            : "Offer camphor harathi, flower petals, deepam, and sacred sankalpam to Lord Sri Venkateswara."}
        </p>
      </div>

      {/* Main Altar Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left / Center: Holy Sanctum Visual */}
        <div className="lg:col-span-7 relative bg-amber-950 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-600/80 aspect-[3/4] flex items-center justify-center">
          <img
            src={lordImg}
            alt="Lord Sri Venkateswara Swamy of Tirumala"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />

          {/* Harathi Flame Overlay */}
          {isHarathiActive && (
            <div className="absolute inset-0 bg-radial from-amber-400/50 via-yellow-600/30 to-transparent flex items-center justify-center animate-pulse pointer-events-none">
              <div className="text-center space-y-2">
                <div className="text-6xl animate-bounce">🔥</div>
                <div className="text-lg font-serif font-bold text-yellow-200 drop-shadow-md bg-stone-950/70 px-4 py-1.5 rounded-full border border-yellow-400">
                  {language === "te" ? "ఓం శ్రీనివాసాయ నమః • కర్పూర హారతి" : "Om Srinivasaaya Namaha • Camphor Harathi"}
                </div>
              </div>
            </div>
          )}

          {/* Deepam Glow */}
          {isDeepamLit && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-between px-6 pointer-events-none">
              <div className="text-3xl animate-pulse">🪔</div>
              <div className="text-3xl animate-pulse">🪔</div>
            </div>
          )}

          {/* Coconut Offering Badge */}
          {coconutOffered && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-amber-900/90 text-amber-100 px-4 py-1.5 rounded-full border border-amber-400 text-xs font-bold shadow-lg animate-bounce">
              🥥 {language === "te" ? "కొబ్బరికాయ సమర్పణ స్వీకరించబడింది" : "Coconut Offering Accepted!"}
            </div>
          )}

          {/* Flower Petals falling Counter */}
          {flowerCount > 0 && (
            <div className="absolute top-4 right-4 bg-amber-900/80 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold border border-yellow-400/50">
              🌸 {flowerCount} {language === "te" ? "పుష్పాలు సమర్పించబడ్డాయి" : "Flowers Offered"}
            </div>
          )}
        </div>

        {/* Right: Pooja Controls & Sankalpam Form */}
        <div className="lg:col-span-5 space-y-5 bg-amber-50/90 p-6 rounded-2xl border-2 border-amber-300 shadow-xl">
          
          <h3 className="text-lg font-bold font-serif text-amber-950 pb-2 border-b border-amber-300">
            {language === "te" ? "దివ్య పూజా ఉపచారాలు" : "Sacred Pooja Offerings"}
          </h3>

          {/* Buttons for offerings */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleHarathi}
              className="p-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold transition-all shadow-md flex flex-col items-center gap-1.5 text-xs sm:text-sm font-serif"
            >
              <Flame className="w-5 h-5 text-yellow-300 animate-bounce" />
              <span>{language === "te" ? "కర్పూర హారతి" : "Camphor Harathi"}</span>
            </button>

            <button
              onClick={handleFlowerArchana}
              className="p-3.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 transition-all shadow-sm flex flex-col items-center gap-1.5 text-xs sm:text-sm font-serif"
            >
              <span className="text-xl">🌸</span>
              <span>{language === "te" ? "పుష్పార్చన చేయండి" : "Flower Archana"}</span>
            </button>

            <button
              onClick={handleDeepam}
              className="p-3.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 transition-all shadow-sm flex flex-col items-center gap-1.5 text-xs sm:text-sm font-serif"
            >
              <span className="text-xl">🪔</span>
              <span>{isDeepamLit ? (language === "te" ? "దీపం వెలుగుతోంది" : "Deepam Lit") : (language === "te" ? "దీపారాధన" : "Light Deepam")}</span>
            </button>

            <button
              onClick={handleCoconut}
              className="p-3.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 transition-all shadow-sm flex flex-col items-center gap-1.5 text-xs sm:text-sm font-serif"
            >
              <span className="text-xl">🥥</span>
              <span>{language === "te" ? "కొబ్బరికాయ సమర్పణ" : "Offer Coconut"}</span>
            </button>
          </div>

          {/* Bell sound button */}
          <div className="pt-2">
            <button
              onClick={() => templeAudio.playTempleBell()}
              className="w-full py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-amber-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              <span>{language === "te" ? "దివ్య ఘంటానాదం చేయండి (Ring Temple Bell)" : "Ring Holy Temple Bell"}</span>
            </button>
          </div>

          {/* Devotee Sankalpam Form */}
          <div className="pt-4 border-t border-amber-200 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 font-sans">
              {language === "te" ? "భక్త సంకల్ప ప్రార్థన" : "Devotee Sankalpam & Prayer"}
            </div>

            {sankalpamDone ? (
              <div className="p-4 rounded-xl bg-green-50 border border-green-300 text-green-900 space-y-2 text-xs">
                <div className="font-bold flex items-center gap-1.5 text-sm font-serif">
                  <Sparkles className="w-4 h-4 text-green-700" />
                  <span>{language === "te" ? "సంకల్పం స్వీకరించబడింది!" : "Sankalpam Blessed!"}</span>
                </div>
                <p>
                  {language === "te"
                    ? `శ్రీ ${devoteeName} గారికి, వారి కుటుంబానికి శ్రీ వేంకటేశ్వర స్వామివారి దివ్య కటాక్షము, ఆయురారోగ్య ఐశ్వర్యములు చేకూరుగాక.`
                    : `May Lord Sri Venkateswara bestow health, peace, and prosperity upon ${devoteeName} and family.`}
                </p>
                <button
                  onClick={() => setSankalpamDone(false)}
                  className="text-xs text-green-800 underline font-semibold mt-1"
                >
                  {language === "te" ? "మరొక సంకల్పం చేయండి" : "Make another prayer"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSankalpam} className="space-y-2.5 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === "te" ? "మీ పేరు (Devotee Name)" : "Devotee Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    placeholder={language === "te" ? "ఉదా: శ్రీనివాస్" : "e.g., Srinivas"}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 focus:border-amber-600 outline-none text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === "te" ? "గోత్రం / ప్రార్థన (Gotram / Prayer Wish)" : "Gotram / Prayer Wish"}
                  </label>
                  <input
                    type="text"
                    value={gotram}
                    onChange={(e) => setGotram(e.target.value)}
                    placeholder={language === "te" ? "ఉదా: కౌశికస గోత్రం / సర్వజనా సుఖినోభవంతు" : "e.g., Kausika Gotram / World Peace"}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 focus:border-amber-600 outline-none text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold transition-all shadow-md font-serif text-xs"
                >
                  {language === "te" ? "సంకల్పం సమర్పించండి (Offer Sankalpam)" : "Submit Holy Sankalpam"}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
