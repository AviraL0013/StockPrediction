// components/PerformanceOverview.js
import React, { useState } from 'react';

const PerformanceOverview = ({
  todayLow = 838.05,
  todayHigh = 853.60,
  week52Low = 621.85,
  week52High = 1179.00,
  open = 846.00,
  prevClose = 842.75,
  volume = "1,29,33,218",
  upperCircuit = 924.20,
  lowerCircuit = 756.20,
  totalTradedValue = "1,087 Cr",
}) => {
  const [activeTab, setActiveTab] = useState('performance');
  const [expandedEvents, setExpandedEvents] = useState([]);

  const newsData = [
    { source: "Business Standard", time: "19 hours ago", headline: "Nestle, Colgate Boost Ad Spend; Maruti, Tata Launch Festive Campaigns" },
    { source: "The Hindu Business Line", time: "20 hours ago", headline: "Tata Motors Registrations Surge 30%" },
    { source: "Business Standard", time: "1 day ago", headline: "Maruti Suzuki's Record Sales Surge" },
    { source: "NDTV Profit", time: "2 days ago", headline: "Tata Motors Hits 4-Month Low" },
    { source: "Financial Express", time: "2 days ago", headline: "Tata Motors Hits 15 Lakh Sales Milestone" },
  ];

  const eventData = [
    { type: "Board Meeting", date: "08 Nov 24", details: "Quarterly Results", status: "Upcoming", moreInfo: "This board meeting will cover the financial performance and projections for the upcoming quarter." },
    { type: "Board Meeting", date: "01 Aug 24", details: "Quarterly Results & Audited Results", moreInfo: "Detailed report on the audited results and other performance metrics." },
    { type: "AGM", date: "24 Jun 24", details: "Announcement of Annual General Meeting (AGM) of the company", moreInfo: "Annual General Meeting to discuss overall company performance and strategic directions." },
    { type: "Dividend", date: "11 Jun 24", details: "A dividend of Rs.3.0 (150%)", extraInfo: "Ex Date", moreInfo: "Shareholders to receive a dividend payout. Record date to be confirmed." },
    { type: "Board Meeting", date: "10 May 24", details: "Meeting of the Board of Directors", moreInfo: "Regular board meeting to review quarterly achievements and goals." },
  ];

  const toggleEventExpansion = (index) => {
    setExpandedEvents((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
        case 'performance':
            return (
              <div className="text-gray-300 space-y-8">
                {/* Existing Performance Content */}
                <h2 className="text-lg font-semibold mb-4">Performance</h2>
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Today's Low</p>
                    <p className="text-lg font-bold">{todayLow}</p>
                  </div>
                  <div className="w-full mx-4">
                    <div className="relative h-1 bg-gray-700 rounded-full my-2">
                      <div className="absolute left-1/4 h-1 bg-green-400 rounded-full w-1/2" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Today's High</p>
                    <p className="text-lg font-bold">{todayHigh}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-xs text-gray-400">52W Low</p>
                    <p className="text-lg font-bold">{week52Low}</p>
                  </div>
                  <div className="w-full mx-4">
                    <div className="relative h-1 bg-gray-700 rounded-full my-2">
                      <div className="absolute left-1/3 h-1 bg-green-400 rounded-full w-2/3" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">52W High</p>
                    <p className="text-lg font-bold">{week52High}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-gray-400 border-t border-gray-600 pt-4">
                  <div>
                    <p className="text-xs">Open</p>
                    <p className="font-bold">{open}</p>
                  </div>
                  <div>
                    <p className="text-xs">Prev. Close</p>
                    <p className="font-bold">{prevClose}</p>
                  </div>
                  <div>
                    <p className="text-xs">Volume</p>
                    <p className="font-bold">{volume}</p>
                  </div>
                  <div>
                    <p className="text-xs">Upper Circuit</p>
                    <p className="font-bold">{upperCircuit}</p>
                  </div>
                  <div>
                    <p className="text-xs">Lower Circuit</p>
                    <p className="font-bold">{lowerCircuit}</p>
                  </div>
                  <div>
                    <p className="text-xs">Total Traded Value</p>
                    <p className="font-bold">{totalTradedValue}</p>
                  </div>
                </div>
        
                {/* Analyst Estimates Section */}
                <div className="flex items-center space-x-8">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-100">
                      <p className="text-green-500 text-2xl font-bold">78%</p>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Buy</p>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-400">Analyst Estimates</h2>
                    <div className="flex items-center text-sm mt-2">
                      <p className="text-gray-400 w-16">Buy</p>
                      <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '78%' }}></div>
                      </div>
                      <p className="text-gray-400 ml-4">78%</p>
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <p className="text-gray-400 w-16">Hold</p>
                      <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-500" style={{ width: '9%' }}></div>
                      </div>
                      <p className="text-gray-400 ml-4">9%</p>
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <p className="text-gray-400 w-16">Sell</p>
                      <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-500" style={{ width: '13%' }}></div>
                      </div>
                      <p className="text-gray-400 ml-4">13%</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Aggregated by Refinitiv from 32 Analysts</p>
                  </div>
                </div>
        
                {/* Fundamentals Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-400 mb-4">Fundamentals</h2>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div className="flex justify-between">
                      <p className="text-gray-400">Market Cap</p>
                      <p className="font-semibold text-white">₹3,10,326Cr</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">ROE</p>
                      <p className="font-semibold text-white">36.98%</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">P/E Ratio (TTM)</p>
                      <p className="font-semibold text-white">9.19</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">EPS (TTM)</p>
                      <p className="font-semibold text-white">91.72</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">P/B Ratio</p>
                      <p className="font-semibold text-white">4.28</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">Dividend Yield</p>
                      <p className="font-semibold text-white">0.74%</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">Industry P/E</p>
                      <p className="font-semibold text-white">22.49</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">Book Value</p>
                      <p className="font-semibold text-white">196.91</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">Debt to Equity</p>
                      <p className="font-semibold text-white">1.26</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-400">Face Value</p>
                      <p className="font-semibold text-white">2</p>
                    </div>
                  </div>
                </div>
              </div>
            );

      case 'news':
        return (
          <div className="space-y-4">
            {newsData.map((news, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-md shadow-lg text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">{news.source} · {news.time}</p>
                  <h3 className="text-md font-semibold text-white">{news.headline}</h3>
                </div>
              </div>
            ))}
          </div>
        );

      case 'events':
        return (
          <div className="space-y-6">
            {eventData.map((event, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-white text-md font-semibold">
                      {event.type}
                      {event.status && (
                        <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                          {event.status}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400">{event.details}</p>
                    {event.extraInfo && <p className="text-xs text-gray-500 mt-1">{event.extraInfo}</p>}
                  </div>
                  <button onClick={() => toggleEventExpansion(index)} className="focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedEvents.includes(index) ? "rotate-90" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                {expandedEvents.includes(index) && (
                  <div className="mt-3 text-gray-400 text-sm border-t border-gray-700 pt-3">
                    {event.moreInfo}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'fo':
        return <div>F&O content goes here.</div>;

      default:
        return null;
    }
  };

  return (
    <div className="text-gray-300">
      <div className="flex space-x-4 border-b border-gray-600 mb-4">
        {['performance', 'news', 'events', 'fo'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-semibold ${activeTab === tab ? 'border-b-2 border-green-400 text-white' : 'text-gray-400'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default PerformanceOverview;
