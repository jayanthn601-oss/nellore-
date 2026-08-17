import React, { useState } from "react";
import { Language, HillData } from "./types";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AdiSeshaMap } from "./components/AdiSeshaMap";
import { HillsGrid } from "./components/HillsGrid";
import { HillsDetailModal } from "./components/HillsDetailModal";
import { PuranaScholarChat } from "./components/PuranaScholarChat";
import { StotraPlayer } from "./components/StotraPlayer";
import { VirtualPooja } from "./components/VirtualPooja";
import { YatraGuide } from "./components/YatraGuide";
import { SaptagiriQuiz } from "./components/SaptagiriQuiz";
import { Footer } from "./components/Footer";

export function App() {
  const [language, setLanguage] = useState<Language>("te");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedHillForModal, setSelectedHillForModal] = useState<HillData | null>(null);

  const handleSelectHill = (hill: HillData) => {
    setSelectedHillForModal(hill);
  };

  const handleCloseModal = () => {
    setSelectedHillForModal(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-amber-950">
      
      {/* Global Sacred Top Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {/* Overview Tab (Default comprehensive view) */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <HeroSection
              language={language}
              onExploreHills={() => {
                const el = document.getElementById("hills-grid-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              onOpenScholar={() => setActiveTab("scholar")}
              onOpenAdiSesha={() => {
                const el = document.getElementById("adisesha-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* Adi Sesha Interactive Cosmic Hoods Section */}
            <div id="adisesha-section">
              <AdiSeshaMap
                language={language}
                onSelectHill={handleSelectHill}
              />
            </div>

            {/* 7 Hills Full Grid */}
            <div id="hills-grid-section">
              <HillsGrid
                language={language}
                onSelectHill={handleSelectHill}
              />
            </div>

            {/* Quick Teaser / Entry into Stotras & Harathi */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div
                  onClick={() => setActiveTab("stotras")}
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-900 to-amber-950 text-amber-50 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all border border-amber-600/50 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="text-2xl">🎵</div>
                    <h3 className="text-xl font-bold font-serif text-amber-100">
                      {language === "te" ? "దివ్య స్తోత్రాలు & కీర్తనలు" : "Sacred Stotras & Chants"}
                    </h3>
                    <p className="text-xs text-amber-200/80">
                      {language === "te"
                        ? "సుప్రభాతం, గోవింద నామావళి, అన్నమయ్య 'బ్రహ్మ కడిగిన పాదము' సంకీర్తనలు ఆలకించండి."
                        : "Listen to Suprabhatam, Govinda Namavali, and Annamayya sankeerthanas."}
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-bold text-yellow-300 font-serif">
                    {language === "te" ? "స్తోత్రాల విభాగానికి వెళ్ళండి →" : "Explore Stotras →"}
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("pooja")}
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-800 to-amber-900 text-amber-50 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all border border-amber-600/50 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="text-2xl">🔥</div>
                    <h3 className="text-xl font-bold font-serif text-amber-100">
                      {language === "te" ? "భావన పూజ & కర్పూర హారతి" : "Virtual Pooja & Harathi"}
                    </h3>
                    <p className="text-xs text-amber-200/80">
                      {language === "te"
                        ? "శ్రీవారికి పుష్పార్చన, దీపారాధన మరియు కర్పూర హారతి సమర్పించి భక్త సంకల్పం చెప్పుకోండి."
                        : "Offer flowers, deepam, camphor harathi, and make personal prayers to Lord Srinivasa."}
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-bold text-yellow-300 font-serif">
                    {language === "te" ? "దివ్య హారతి ప్రారంభించండి →" : "Start Virtual Seva →"}
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("scholar")}
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-950 to-stone-950 text-amber-50 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all border border-amber-600/50 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="text-2xl">✨</div>
                    <h3 className="text-xl font-bold font-serif text-amber-100">
                      {language === "te" ? "పురాణ విద్వాంసుడు (AI)" : "Ask Purana Scholar"}
                    </h3>
                    <p className="text-xs text-amber-200/80">
                      {language === "te"
                        ? "సప్తగిరుల పురాణాలపై ఏ ప్రశ్ననైనా అడిగి తక్షణమే ప్రామాణిక సమాధానం పొందండి."
                        : "Ask deep puranic and historical questions to the Gemini-powered Saptagiri Scholar."}
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-bold text-yellow-300 font-serif">
                    {language === "te" ? "సంవాదం ప్రారంభించండి →" : "Chat with Scholar →"}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Dedicated Adi Sesha Tab */}
        {activeTab === "adisesha" && (
          <div className="py-6">
            <AdiSeshaMap
              language={language}
              onSelectHill={handleSelectHill}
            />
          </div>
        )}

        {/* Dedicated AI Scholar Tab */}
        {activeTab === "scholar" && (
          <PuranaScholarChat language={language} />
        )}

        {/* Dedicated Stotras Tab */}
        {activeTab === "stotras" && (
          <StotraPlayer language={language} />
        )}

        {/* Dedicated Virtual Pooja Tab */}
        {activeTab === "pooja" && (
          <VirtualPooja language={language} />
        )}

        {/* Dedicated Footpath Pilgrimage Guide Tab */}
        {activeTab === "yatra" && (
          <YatraGuide language={language} />
        )}

        {/* Dedicated Quiz Tab */}
        {activeTab === "quiz" && (
          <SaptagiriQuiz language={language} />
        )}
      </main>

      {/* Deep Detail Modal for Individual Hill */}
      <HillsDetailModal
        hill={selectedHillForModal}
        language={language}
        onClose={handleCloseModal}
        onSelectHill={handleSelectHill}
      />

      {/* Sacred Footer */}
      <Footer
        language={language}
        onSelectHill={handleSelectHill}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

    </div>
  );
}

export default App;
