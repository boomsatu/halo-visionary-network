
import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TOKEN_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";

const mockChartData = {
  "24H": [
    { time: "00:00", value: 2100 },
    { time: "04:00", value: 2150 },
    { time: "08:00", value: 2080 },
    { time: "12:00", value: 2200 },
    { time: "16:00", value: 2250 },
    { time: "20:00", value: 2180 },
    { time: "24:00", value: 2220 },
  ],
  "1W": [
    { time: "Mon", value: 2100 },
    { time: "Tue", value: 2150 },
    { time: "Wed", value: 2300 },
    { time: "Thu", value: 2200 },
    { time: "Fri", value: 2250 },
    { time: "Sat", value: 2400 },
    { time: "Sun", value: 2350 },
  ],
  "1M": [
    { time: "Week 1", value: 2100 },
    { time: "Week 2", value: 2200 },
    { time: "Week 3", value: 2400 },
    { time: "Week 4", value: 2300 },
  ],
};

type TimeFrame = "24H" | "1W" | "1M";

const Charts = () => {
  const [selectedPair, setSelectedPair] = useState(`${TOKEN_LIST[0].symbol}/${TOKEN_LIST[1].symbol}`);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("24H");
  
  const pairs = [
    `${TOKEN_LIST[0].symbol}/${TOKEN_LIST[1].symbol}`,
    `${TOKEN_LIST[0].symbol}/${TOKEN_LIST[2].symbol}`,
    `${TOKEN_LIST[1].symbol}/${TOKEN_LIST[3].symbol}`,
  ];

  return (
    <div id="charts" className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Price Charts</h2>
          
          <div className="flex gap-2">
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {pairs.map((pair) => (
                <option key={pair} value={pair}>
                  {pair}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mb-4">
          {(["24H", "1W", "1M"] as TimeFrame[]).map((time) => (
            <button
              key={time}
              onClick={() => setTimeFrame(time)}
              className={cn(
                "px-3 py-1 rounded-lg text-sm",
                timeFrame === time
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              {time}
            </button>
          ))}
        </div>
        
        <div className="h-80 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData[timeFrame]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066FF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Price']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0066FF"
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Current Price</p>
              <p className="font-semibold text-lg">$2,220.45</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">24h Change</p>
              <p className="font-semibold text-lg text-green-600">+5.8%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">24h Volume</p>
              <p className="font-semibold text-lg">$145.2M</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Cap</p>
              <p className="font-semibold text-lg">$267.8B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
