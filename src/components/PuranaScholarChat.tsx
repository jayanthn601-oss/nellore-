import React, { useState, useRef, useEffect } from "react";
import { Language } from "../types";
import { templeAudio } from "../utils/audioSynth";
import { Sparkles, Send, Bot, User, RefreshCw, Volume2, BookOpen, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "scholar";
  text: string;
  timestamp: string;
}

interface PuranaScholarChatProps {
  language: Language;
}

export const PuranaScholarChat: React.FC<PuranaScholarChatProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "scholar",
      text: language === "te"
        ? "ఓం నమో వేంకటేశాయ! నేను తిరుమల సప్తగిరి పురాణ విద్వాంసుడను. ఏడుకొండల పురాణ కథలు, శేషాద్రి-వెంకటాద్రి వైభవం, తీర్థాల ప్రాశస్త్యం, నిత్య సేవా విశేషాలు లేదా అన్నమయ్య సంకీర్తనల గురించి మీకున్న ఎలాంటి ఆధ్యాత్మిక ప్రశ్ననైనా అడగవచ్చు."
        : "Om Namo Venkatesaya! I am the Tirumala Saptagiri Purana Scholar. Please ask any question regarding the Seven Sacred Hills, the puranic legends of Seshadri to Venkatadri, holy tirthams, daily sevas, or Annamayya kirtanas.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = language === "te" ? [
    "ఆదిశేషుడు మరియు వాయుదేవుని మధ్య బలపరీక్ష కథ ఏమిటి?",
    "నీలాద్రి కొండ మరియు కల్యాణకట్ట తలనీలాల ప్రాశస్త్యం ఏమిటి?",
    "అంజనాద్రిపై హనుమంతుని జన్మస్థల విశేషాలు తెలపండి.",
    "వెంకటాద్రి అనే నామానికి పురాణార్థం ఏమిటి?",
    "నారాయణాద్రి శిఖరంపై గల 'శ్రీవారి పాదాలు' ప్రాముఖ్యత ఏమిటి?",
    "తిరుమలలో స్వామి పుష్కరిణి వైకుంఠం నుండి ఎలా వచ్చింది?"
  ] : [
    "What is the contest of might between Adi Sesha and Vayu Deva?",
    "Why do pilgrims offer their hair at Neeladri?",
    "Explain why Anjanadri is celebrated as Lord Hanuman's birthplace.",
    "What is the puranic meaning of the word 'Venkatadri'?",
    "What is the significance of Srivari Padalu on Narayanadri?",
    "How was Swami Pushkarini brought to Tirumala from Vaikuntha?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gemini/scholar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          language,
          contextTopic: "Tirumala Saptagiri Hills, Venkateswara Mahatyam, Puranas, Tirthams",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      templeAudio.playTempleBell(1.2);

      const scholarMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "scholar",
        text: data.answer || (language === "te" ? "శ్రీనివాసుని కృప లభించుగాక." : "May Lord Srinivasa bless you."),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, scholarMessage]);
    } catch (err: any) {
      console.error(err);
      setError(language === "te"
        ? "పురాణ సమాచారం పొందడంలో లోపం ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి."
        : "Failed to connect to the Purana Scholar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900 text-amber-300 text-xs font-semibold border border-amber-600">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>{language === "te" ? "ఏఐ ఆధారిత వేద పురాణ విద్వాంసుడు" : "AI Saptagiri Purana Scholar"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-950">
          {language === "te" ? "శ్రీవారి సప్తగిరి పురాణ సంవాదం" : "Spiritual Purana Q&A with Scholar"}
        </h2>
        <p className="text-sm text-stone-700 max-w-2xl mx-auto font-sans">
          {language === "te"
            ? "తిరుమల ఏడుకొండల పురాణాల గురించి, క్షేత్ర మహత్యం గురించి మీ సందేహాలను నివృత్తి చేసుకోండి."
            : "Ask questions on Tirumala's history, temple rituals, puranas, and the 7 sacred peaks."}
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-amber-50 rounded-2xl border-2 border-amber-300/80 shadow-xl overflow-hidden flex flex-col h-[600px]">
        
        {/* Chat Header Bar */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 p-4 text-amber-100 flex items-center justify-between border-b border-amber-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center font-serif font-bold text-sm shadow">
              వి
            </div>
            <div>
              <div className="text-sm font-bold font-serif text-amber-50">
                {language === "te" ? "శ్రీ వేంకటేశ్వర పురాణ విద్వాంసుడు" : "Sri Venkateswara Purana Scholar"}
              </div>
              <div className="text-[11px] text-amber-300/80">
                {language === "te" ? "వరాహ, పద్మ, భవిష్యోత్తర పురాణ జ్ఞానం" : "Powered by Gemini 3.7 Flash"}
              </div>
            </div>
          </div>

          <div className="text-xs text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-700/50">
            {language === "te" ? "ఓం నమో వేంకటేశాయ" : "Om Namo Venkatesaya"}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-amber-50/50">
          {messages.map((msg) => {
            const isScholar = msg.sender === "scholar";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isScholar ? "justify-start" : "justify-end"}`}
              >
                {isScholar && (
                  <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4 text-yellow-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm text-sm sm:text-base leading-relaxed ${
                    isScholar
                      ? "bg-white text-stone-900 border border-amber-200"
                      : "bg-gradient-to-r from-amber-700 to-amber-800 text-white font-medium"
                  }`}
                >
                  <div className="whitespace-pre-line font-sans">{msg.text}</div>
                  <div
                    className={`text-[10px] mt-2 font-mono ${
                      isScholar ? "text-stone-400 text-right" : "text-amber-200 text-right"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {!isScholar && (
                  <div className="w-8 h-8 rounded-full bg-amber-900 text-amber-200 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4 text-amber-300" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 text-yellow-300 animate-spin" />
              </div>
              <div className="bg-white text-stone-600 border border-amber-200 rounded-2xl p-3 text-xs italic flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>
                  {language === "te"
                    ? "పురాణాల నుండి దివ్య సమాధానం సంగ్రహిస్తున్నాము..."
                    : "Consulting sacred puranas for authentic response..."}
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions Pills */}
        <div className="p-3 bg-amber-100/70 border-t border-amber-200 overflow-x-auto flex gap-2 scrollbar-none">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-amber-200 border border-amber-300 text-amber-950 font-medium whitespace-nowrap shadow-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-3 sm:p-4 bg-white border-t border-amber-200">
          <div className="flex items-center gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                language === "te"
                  ? "సప్తగిరులు లేదా తిరుమల పురాణాల గురించి అడగండి..."
                  : "Ask a question about the 7 hills or Tirumala puranas..."
              }
              className="flex-1 resize-none bg-stone-50 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold transition-all disabled:opacity-50 shadow-md flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
