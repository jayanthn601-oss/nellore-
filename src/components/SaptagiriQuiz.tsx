import React, { useState } from "react";
import { Language } from "../types";
import { saptagiriQuizQuestions } from "../data/quizData";
import { templeAudio } from "../utils/audioSynth";
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Sparkles } from "lucide-react";

interface SaptagiriQuizProps {
  language: Language;
}

export const SaptagiriQuiz: React.FC<SaptagiriQuizProps> = ({ language }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = saptagiriQuizQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === question.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      templeAudio.playTempleBell(1.3);
    } else {
      templeAudio.playTempleBell(0.8);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < saptagiriQuizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      templeAudio.playShankha();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900 text-amber-300 text-xs font-semibold border border-amber-600">
          <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
          <span>{language === "te" ? "పురాణ జ్ఞాన పరీక్ష" : "Saptagiri Purana Quiz"}</span>
        </div>
        <h2 className="text-3xl font-bold font-serif text-amber-950">
          {language === "te" ? "సప్తగిరి పురాణ జ్ఞాన ప్రశ్నలు" : "Test Your Saptagiri Knowledge"}
        </h2>
        <p className="text-sm text-stone-700 max-w-xl mx-auto font-sans">
          {language === "te"
            ? "ఏడుకొండల పురాణాల గురించి మీ ఆధ్యాత్మిక జ్ఞానాన్ని పరీక్షించుకోండి."
            : "Explore how deeply you know the stories of Seshadri, Neeladri, Garudadri, Anjanadri, Vrishabhadri, Narayanadri, and Venkatadri."}
        </p>
      </div>

      {/* Quiz Board */}
      <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 shadow-xl overflow-hidden p-6 sm:p-8">
        
        {!quizFinished ? (
          <div className="space-y-6">
            
            {/* Progress Bar & Counter */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-900 pb-3 border-b border-amber-200">
              <span>
                {language === "te" ? `ప్రశ్న ${currentIdx + 1} / ${saptagiriQuizQuestions.length}` : `Question ${currentIdx + 1} of ${saptagiriQuizQuestions.length}`}
              </span>
              <span>
                {language === "te" ? `స్కోరు: ${score}` : `Score: ${score}`}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-amber-950 leading-relaxed">
                {language === "te" ? question.questionTelugu : question.questionEnglish}
              </h3>
              {language === "te" && (
                <p className="text-xs text-stone-500 italic">
                  {question.questionEnglish}
                </p>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {(language === "te" ? question.optionsTelugu : question.optionsEnglish).map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = question.correctIndex === idx;

                let btnStyle = "bg-white hover:bg-amber-100 border-amber-200 text-stone-800";

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-green-100 border-green-500 text-green-950 font-bold ring-1 ring-green-400";
                  } else if (isSelected) {
                    btnStyle = "bg-red-100 border-red-500 text-red-950 font-bold";
                  }
                } else if (isSelected) {
                  btnStyle = "bg-amber-800 text-white font-bold border-amber-900 shadow-sm";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between text-sm sm:text-base ${btnStyle}`}
                  >
                    <span className="font-serif">{opt}</span>
                    {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
                    {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box on Submit */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-amber-100/90 border border-amber-300 text-xs sm:text-sm text-stone-800 leading-relaxed space-y-1">
                <div className="font-bold text-amber-950 font-serif flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>{language === "te" ? "పురాణ వివరణ: " : "Puranic Insight: "}</span>
                </div>
                <p>{language === "te" ? question.explanationTelugu : question.explanationEnglish}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-sm transition-all disabled:opacity-50 font-serif"
                >
                  {language === "te" ? "సమాధానం నిర్ధారించండి" : "Submit Answer"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm transition-all font-serif"
                >
                  {currentIdx + 1 < saptagiriQuizQuestions.length
                    ? (language === "te" ? "తరువాతి ప్రశ్న →" : "Next Question →")
                    : (language === "te" ? "ఫలితాలు చూడండి" : "View Results")}
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 text-amber-950 flex items-center justify-center mx-auto shadow-xl ring-4 ring-yellow-200 animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-amber-950">
                {language === "te" ? "పురాణ క్విజ్ పూర్తయింది!" : "Quiz Completed!"}
              </h3>
              <p className="text-lg font-serif text-amber-800">
                {language === "te"
                  ? `మీ స్కోరు: ${saptagiriQuizQuestions.length} కి ${score} మార్కులు`
                  : `Your Score: ${score} out of ${saptagiriQuizQuestions.length}`}
              </p>
              <p className="text-sm text-stone-600 max-w-md mx-auto font-sans">
                {score >= 6
                  ? (language === "te" ? "అద్భుతం! సప్తగిరుల పురాణాలపై మీకు ప్రగాఢమైన జ్ఞానం ఉన్నది. శ్రీవారి అనుగ్రహం లభించుగాక!" : "Outstanding! You have deep knowledge of the Saptagiri puranas. May Lord Srinivasa bless you!")
                  : (language === "te" ? "చక్కటి ప్రయత్నం! సప్తగిరుల పురాణాలను మరింత శ్రద్ధగా చదివి స్వామి కృపను పొందండి." : "Good effort! Revisit the 7 Hills section to enrich your devotional knowledge.")}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-sm transition-all shadow-md inline-flex items-center gap-2 font-serif"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === "te" ? "మళ్లీ ప్రారంభించండి" : "Play Again"}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
