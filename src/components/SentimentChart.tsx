"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SentimentChartProps {
  positive: number;
  negative: number;
  neutral: number;
}

export function SentimentChart({ positive, negative, neutral }: SentimentChartProps) {
  const data: ChartData<"doughnut"> = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [positive, negative, neutral],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // emerald-500
          "rgba(244, 63, 94, 0.8)",  // rose-500
          "rgba(139, 92, 246, 0.8)", // violet-500
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(244, 63, 94, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 14,
          }
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { family: "'Inter', sans-serif", size: 14 },
        bodyFont: { family: "'Inter', sans-serif", size: 14 },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }).format(context.parsed);
            }
            return label;
          }
        }
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    cutout: "70%",
  };

  return (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
