export interface PredictionResult {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  confidence: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export const predictSentiment = async (text: string): Promise<PredictionResult> => {
  // Simulate network latency (1-2 seconds)
  const delay = Math.floor(Math.random() * 1000) + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const lowerText = text.toLowerCase();
  
  // Keyword mapping
  const positiveWords = ['good', 'great', 'awesome', 'support', 'love', 'amazing', 'best', 'win', 'excellent', 'okay'];
  const negativeWords = ['bad', 'hate', 'terrible', 'oppose', 'worst', 'lose', 'awful', 'fail', 'corrupt'];

  let posScore = 0.33;
  let negScore = 0.33;
  let neuScore = 0.34;

  const hasPositive = positiveWords.some(word => lowerText.includes(word));
  const hasNegative = negativeWords.some(word => lowerText.includes(word));

  if (hasPositive && !hasNegative) {
    posScore = 0.65 + Math.random() * 0.25;
    negScore = Math.random() * 0.15;
    neuScore = 1 - posScore - negScore;
  } else if (hasNegative && !hasPositive) {
    negScore = 0.65 + Math.random() * 0.25;
    posScore = Math.random() * 0.15;
    neuScore = 1 - negScore - posScore;
  } else if (hasPositive && hasNegative) {
    // Mixed sentiment
    neuScore = 0.5 + Math.random() * 0.2;
    posScore = (1 - neuScore) / 2 + Math.random() * 0.1;
    negScore = 1 - neuScore - posScore;
  } else {
    // Neutral bias
    neuScore = 0.6 + Math.random() * 0.3;
    posScore = (1 - neuScore) / 2 + (Math.random() * 0.05);
    negScore = 1 - neuScore - posScore;
  }

  // Determine winning sentiment
  let sentiment: 'Positive' | 'Negative' | 'Neutral' = 'Neutral';
  if (posScore > negScore && posScore > neuScore) sentiment = 'Positive';
  else if (negScore > posScore && negScore > neuScore) sentiment = 'Negative';

  // Normalize to exactly 1 (to handle floating point inaccuracies)
  const total = posScore + negScore + neuScore;
  
  return {
    sentiment,
    confidence: {
      positive: posScore / total,
      negative: negScore / total,
      neutral: neuScore / total
    }
  };
};
