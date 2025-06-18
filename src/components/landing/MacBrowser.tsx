import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MacBrowser = () => {
  const [activeDataset, setActiveDataset] = useState('1D');
  const [hoveredData, setHoveredData] = useState(null);
  const chartRef = useRef(null);
  const isMobile = useIsMobile();

  const datasets = {
    '1D': {
      labels: ['9AM', '12PM', '3PM', '6PM', '9PM'],
      impressions: [1200, 1800, 2400, 3200, 2800],
      clicks: [48, 72, 96, 128, 112],
      engagements: [24, 36, 48, 64, 56]
    },
    '1W': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      impressions: [8500, 9200, 8800, 10100, 9600, 7200, 6800],
      clicks: [340, 368, 352, 404, 384, 288, 272],
      engagements: [170, 184, 176, 202, 192, 144, 136]
    },
    '1M': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      impressions: [65000, 72000, 68000, 75000],
      clicks: [2600, 2880, 2720, 3000],
      engagements: [1300, 1440, 1360, 1500]
    }
  };

  const currentData = datasets[activeDataset];

  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Impressions',
        data: currentData.impressions,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: isMobile ? 4 : 6,
        pointHoverRadius: isMobile ? 6 : 8,
      },
      {
        label: 'Clicks',
        data: currentData.clicks,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: isMobile ? 4 : 6,
        pointHoverRadius: isMobile ? 6 : 8,
      },
      {
        label: 'Engagements',
        data: currentData.engagements,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: isMobile ? 4 : 6,
        pointHoverRadius: isMobile ? 6 : 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function(context) {
          if (context.tooltip.dataPoints) {
            const dataPoint = context.tooltip.dataPoints[0];
            const index = dataPoint.dataIndex;
            setHoveredData({
              label: currentData.labels[index],
              impressions: currentData.impressions[index],
              clicks: currentData.clicks[index],
              engagements: currentData.engagements[index]
            });
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          }
        }
      }
    }
  };

  const totalStats = {
    impressions: currentData.impressions.reduce((a, b) => a + b, 0),
    clicks: currentData.clicks.reduce((a, b) => a + b, 0),
    engagements: currentData.engagements.reduce((a, b) => a + b, 0),
  };

  const engagementRate = ((totalStats.engagements / totalStats.impressions) * 100).toFixed(1);
  const clickThroughRate = ((totalStats.clicks / totalStats.impressions) * 100).toFixed(2);

  const displayData = hoveredData || {
    impressions: totalStats.impressions,
    clicks: totalStats.clicks,
    engagements: totalStats.engagements
  };

  return (
    <div className={`relative ${isMobile ? 'mx-2' : 'mx-auto'} max-w-6xl`}>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg p-2 sm:p-3">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-700 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            viro-ai.com/dashboard
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-b-lg shadow-2xl p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Campaign Analytics
          </h3>
          
          {!isMobile && (
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {Object.keys(datasets).map((period) => (
                <button
                  key={period}
                  onClick={() => setActiveDataset(period)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeDataset === period
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`h-48 sm:h-64 md:h-80 mb-4 sm:mb-6`}>
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>

        {hoveredData && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
              {hoveredData.label}: {hoveredData.impressions.toLocaleString()} impressions, 
              {' '}{hoveredData.clicks.toLocaleString()} clicks, 
              {' '}{hoveredData.engagements.toLocaleString()} engagements
            </div>
          </div>
        )}

        <div className={`grid gap-3 sm:gap-4 ${
          isMobile 
            ? "grid-cols-2" 
            : "grid-cols-2 md:grid-cols-4"
        }`}>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-3 sm:p-4">
              <div className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                Total Impressions
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 dark:text-blue-100">
                {totalStats.impressions.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <CardContent className="p-3 sm:p-4">
              <div className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                Total Clicks
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 dark:text-green-100">
                {totalStats.clicks.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-3 sm:p-4">
              <div className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                Engagement Rate
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-900 dark:text-purple-100">
                {engagementRate}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-3 sm:p-4">
              <div className="text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">
                Click-Through Rate
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-900 dark:text-orange-100">
                {clickThroughRate}%
              </div>
            </CardContent>
          </Card>
        </div>

        {isMobile && (
          <div className="mt-4 flex justify-center">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {Object.keys(datasets).map((period) => (
                <button
                  key={period}
                  onClick={() => setActiveDataset(period)}
                  className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeDataset === period
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacBrowser;
