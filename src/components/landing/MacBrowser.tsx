import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Sample data for different time periods
const timePeriodData = {
  "1D": {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    impressions: Array.from(
      { length: 24 },
      (_, i) => 300 + Math.floor(Math.sin(i / 2.5) * 300 + Math.random() * 200)
    ),
    clicks: Array.from(
      { length: 24 },
      (_, i) => 80 + Math.floor(Math.cos(i / 3) * 80 + Math.random() * 40)
    ),
    engagements: Array.from(
      { length: 24 },
      (_, i) => 30 + Math.floor(Math.sin(i / 4) * 30 + Math.random() * 20)
    ),
  },
  "1W": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    impressions: [1500, 2200, 3500, 4200, 2800, 1800, 2500],
    clicks: [320, 500, 800, 950, 600, 400, 550],
    engagements: [160, 250, 400, 475, 300, 200, 275],
  },
  "1M": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    impressions: [8000, 9500, 12000, 10500],
    clicks: [1600, 1900, 2400, 2100],
    engagements: [800, 950, 1200, 1050],
  },
  "3M": {
    labels: ["Month 1", "Month 2", "Month 3"],
    impressions: [32000, 45000, 38000],
    clicks: [6400, 9000, 7600],
    engagements: [3200, 4500, 3800],
  },
  "1Y": {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    impressions: [90000, 120000, 110000, 140000],
    clicks: [18000, 24000, 22000, 28000],
    engagements: [9000, 12000, 11000, 14000],
  },
};

const randomizeData = [
  3, 7, 1, 4, 9, 0, 5, 2, 8, 6, 4, 1, 7, 3, 9, 2, 5, 0, 8, 6, 2, 9, 4, 7, 1, 5,
  3, 0, 8, 6, 5, 2, 9, 1, 7, 4, 0, 3, 8, 6, 0, 5, 2, 9, 7, 1, 4, 3, 8, 6, 2, 9,
  4, 7, 1, 5, 3, 0, 8, 6, 5, 2, 9, 1, 7, 4, 0, 3, 8, 6, 3, 7, 1, 4, 9, 0, 5, 2,
  8, 6, 4, 1, 7, 3, 9, 2, 5, 0, 8, 6,
];

const AnimatedCounter = ({
  value,
  isPercentage = false,
}: {
  value: number;
  isPercentage?: boolean;
}) => {
  const [displayedValue, setDisplayedValue] = useState<string>("");
  const animationRef = useRef<NodeJS.Timeout[]>([]);
  const dataIndexRef = useRef(0);

  useEffect(() => {
    // Clear any existing animations
    animationRef.current.forEach((id) => clearTimeout(id));
    animationRef.current = [];
    dataIndexRef.current = 0;

    const valueStr = isPercentage
      ? `${value.toFixed(1)}%`
      : Math.round(value).toLocaleString();

    // Start with empty string instead of "0" placeholders
    setDisplayedValue("");

    const chars = valueStr.split("");

    chars.forEach((char, index) => {
      const target = parseInt(char) || 0;
      const isDigit = !isNaN(parseInt(char));

      // Start animation for this digit after the delay
      const timeoutId = setTimeout(() => {
        let intervalCount = 0;
        const intervalDuration = 80;
        const totalDuration = 1000;

        const intervalId = setInterval(() => {
          setDisplayedValue((prev) => {
            const newChars = prev.split("");

            // Pad with empty strings if needed
            while (newChars.length <= index) {
              newChars.push("");
            }

            if (isDigit) {
              const digit =
                randomizeData[dataIndexRef.current % randomizeData.length];
              newChars[index] = digit.toString();
              dataIndexRef.current++;
            } else {
              newChars[index] = char;
            }

            return newChars.join("");
          });

          intervalCount++;

          if (intervalCount * intervalDuration >= totalDuration) {
            clearInterval(intervalId);
            setDisplayedValue((prev) => {
              const newChars = prev.split("");
              while (newChars.length <= index) {
                newChars.push("");
              }
              newChars[index] = char;
              return newChars.join("");
            });
          }
        }, intervalDuration);

        animationRef.current.push(intervalId);
      }, index * 300);

      animationRef.current.push(timeoutId);
    });

    return () => {
      animationRef.current.forEach((id) => clearTimeout(id));
    };
  }, [value, isPercentage]);

  return (
    <div className="flex">
      {displayedValue.split("").map((char, index) => (
        <span key={index} className="text-white">
          {char || "\u00A0"} {/* &nbsp; for empty characters */}
        </span>
      ))}
    </div>
  );
};

const MacBrowser = () => {
  const [activePeriod, setActivePeriod] = useState<
    "1D" | "1W" | "1M" | "3M" | "1Y"
  >("1D");
  const currentData = timePeriodData[activePeriod];

  // Calculate metrics
  const totalImpressions = currentData.impressions.reduce((a, b) => a + b, 0);
  const totalClicks = currentData.clicks.reduce((a, b) => a + b, 0);
  const totalEngagements = currentData.engagements.reduce((a, b) => a + b, 0);
  const ctr = (totalClicks / totalImpressions) * 100;
  const engagementRate = (totalEngagements / totalImpressions) * 100;

  // For intersection observer
  const [metricsRef, metricsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Impressions",
        data: currentData.impressions,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        tension: 0.1,
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Clicks",
        data: currentData.clicks,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.05)",
        tension: 0.1,
        fill: true,
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Engagements",
        data: currentData.engagements,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.05)",
        tension: 0.1,
        fill: true,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, // We'll use custom legend
      },
      title: {
        display: true,
        text: "DASHBOARD",
        color: "#ffffff",
        font: {
          size: 18,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
        align: "center" as const,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#e2e8f0",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          labelColor: (context: any) => {
            return {
              borderColor: "transparent",
              backgroundColor: context.dataset.borderColor,
              borderRadius: 6,
            };
          },
          label: (context: any) => {
            return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            size: 11,
          },
        },
        border: {
          color: "rgba(255, 255, 255, 0.05)",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.03)",
          drawTicks: false,
        },
        ticks: {
          color: "#94a3b8",
          padding: 8,
          font: {
            size: 10,
          },
          callback: (value: any) => value.toLocaleString(),
          count: 3,
        },
        border: {
          display: false,
        },
      },
    },
  };

  // Custom legend component
  const CustomLegend = () => (
    <div className="absolute right-4 top-4 z-10 bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 shadow-lg">
      <div className="space-y-2">
        {chartData.datasets.map((dataset) => (
          <div key={dataset.label} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: dataset.borderColor }}
            />
            <span className="text-xs text-gray-300">{dataset.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[60rem] mx-auto px-4">
      <div className="mac-mockup rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-950 backdrop-blur-sm">
        {/* Browser Chrome */}
        <div className="browser-chrome bg-gray-900/80 border-b border-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center px-4 py-3">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 bg-gray-800/60 rounded-md px-3 py-1.5 text-xs text-gray-400 font-mono">
              dashboard.theviroai.com
            </div>
            <div className="ml-4 flex space-x-2">
              {(["1D", "1W", "1M", "3M", "1Y"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`px-2 py-1 text-xs rounded transition-all ${
                    activePeriod === period
                      ? "text-white bg-blue-500/20 border border-blue-500/30"
                      : "text-gray-400 bg-gray-800/50 hover:bg-gray-700/50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="browser-content bg-gradient-to-b from-gray-900 to-gray-950 p-6">
          {/* Chart */}
          <div className="h-80 w-full relative">
            <Line data={chartData} options={chartOptions} />
            <CustomLegend />
          </div>

          {/* Metrics Grid - 2 rows, 2 columns */}
          <div
            ref={metricsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
          >
            {/* Row 1 */}
            <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">
                Total Impressions
              </div>
              <div className="text-2xl font-bold text-white">
                {metricsInView ? (
                  <AnimatedCounter value={totalImpressions} />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-blue-400 text-xs mt-1">
                Potential reach of your content
              </div>
            </div>

            <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Total Clicks</div>
              <div className="text-2xl font-bold text-white">
                {metricsInView ? <AnimatedCounter value={totalClicks} /> : "0"}
              </div>
              <div className="text-purple-400 text-xs mt-1">
                Visitors driven to your site
              </div>
            </div>

            {/* Row 2 */}
            <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-1">Engagement Rate</div>
              <div className="text-2xl font-bold text-white">
                {metricsInView ? (
                  <AnimatedCounter value={engagementRate} isPercentage />
                ) : (
                  "0%"
                )}
              </div>
              <div className="text-green-400 text-xs mt-1">
                Audience interaction with content
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 p-4 rounded-xl border border-blue-800/30">
              <div className="text-blue-300 text-sm mb-1">
                Click-Through Rate
              </div>
              <div className="text-2xl font-bold text-white">
                {metricsInView ? (
                  <AnimatedCounter value={ctr} isPercentage />
                ) : (
                  "0%"
                )}
              </div>
              <div className="text-blue-400 text-xs mt-1">
                Conversion from views to clicks
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacBrowser;
