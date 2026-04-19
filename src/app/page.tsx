"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { predictSentiment, PredictionResult } from "@/lib/mockPredict";
import { SentimentChart } from "@/components/SentimentChart";
import { ResultCard } from "@/components/ResultCard";

const EXAMPLE_TEXTS = [
  "Biden is doing great, this new tax policy is exactly what we need to support the middle class.",
  "I absolutely hate the current policies. It's a terrible failure and everything is bad right now.",
  "The debate was okay, I guess. Some good points were made, but overall pretty standard political talk.",
];

export default function Home() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await predictSentiment(text);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400">
          US Election Sentiment
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Analyze the tone and emotion of election-related text using our mock NLP model simulating positive, negative, and neutral weights.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl p-6 md:p-8 rounded-3xl flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold tracking-wide text-slate-300">
              Input Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., The candidates performed well in the recent debate..."
              className="h-48 w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            className="w-full py-4 rounded-full font-bold text-lg bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze Sentiment</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="space-y-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Try Examples</span>
            <div className="flex flex-col space-y-2">
              {EXAMPLE_TEXTS.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setText(example)}
                  className="text-left py-2 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-sm text-slate-300 transition duration-200"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl p-6 md:p-8 rounded-3xl flex flex-col justify-center items-center min-h-[400px]">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center text-slate-400 space-y-4 animate-pulse">
              <Loader2 className="w-12 h-12 animate-spin text-violet-500" />
              <p>Running NLP pipeline...</p>
            </div>
          ) : result ? (
            <div className="w-full flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ResultCard result={result} />
              
              <div className="w-full border-t border-white/10 pt-8">
                <h3 className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-4">
                  Probability Distribution
                </h3>
                <SentimentChart 
                  positive={result.confidence.positive}
                  negative={result.confidence.negative}
                  neutral={result.confidence.neutral}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-slate-600" />
              </div>
              <p>Enter text and click analyze to see results.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
