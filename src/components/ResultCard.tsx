import { cn } from "@/lib/utils";
import { PredictionResult } from "@/lib/mockPredict";

interface ResultCardProps {
  result: PredictionResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const { sentiment, confidence } = result;

  const sentimentColor = 
    sentiment === "Positive" ? "text-emerald-400 bg-emerald-400/10 border-emerald-500/30" :
    sentiment === "Negative" ? "text-rose-400 bg-rose-400/10 border-rose-500/30" :
    "text-violet-400 bg-violet-400/10 border-violet-500/30";

  const getPercentage = (val: number) => `${(val * 100).toFixed(1)}%`;

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">
          Overall Sentiment
        </span>
        <div className={cn("px-6 py-2 rounded-full border backdrop-blur-sm", sentimentColor)}>
          <span className="text-3xl font-bold tracking-tight">{sentiment}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mt-6">
        <div className="flex flex-col p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition hover:bg-white/10">
          <span className="text-emerald-400 font-bold text-xl">{getPercentage(confidence.positive)}</span>
          <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Positive</span>
        </div>

        <div className="flex flex-col p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition hover:bg-white/10">
          <span className="text-violet-400 font-bold text-xl">{getPercentage(confidence.neutral)}</span>
          <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Neutral</span>
        </div>

        <div className="flex flex-col p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition hover:bg-white/10">
          <span className="text-rose-400 font-bold text-xl">{getPercentage(confidence.negative)}</span>
          <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Negative</span>
        </div>
      </div>
    </div>
  );
}
