// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from './sidebar';

// // Component to fetch and display news
// const News = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredNews, setFilteredNews] = useState([]);

//   // Fetch news from News API
//   useEffect(() => {
//     const fetchNews = async (query = 'India stock market') => {
//       try {
//         const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
//         const data = await response.json();
//         setNewsData(data.articles.slice(0, 20)); // Limit to 20 news articles
//         setFilteredNews(data.articles.slice(0, 20)); // Display all by default
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }
//     };

//     fetchNews(); // Fetch initial news
//   }, []);

//   // Handle search functionality
//   const handleSearch = async () => {
//     const query = searchTerm || 'stock market'; // Default to general query if search term is empty
//     const filtered = await fetchNews(query);
//     const filteredData = filtered.articles.slice(0, 20); // Limit to 20 news articles
//     setFilteredNews(filteredData);
//   };

//   const fetchNews = async (query) => {
//     try {
//       const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching news:', error);
//       return { articles: [] }; // Return empty articles on error
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         {/* Header with Search */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-4xl font-bold text-left">Latest News</h2>
//           <div className="relative">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search for a stock..."
//               className="bg-gray-800 text-white py-2 px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:border-green-500"
//             />
//             <button
//               onClick={handleSearch}
//               className="absolute right-1 top-1 bottom-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Main News Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredNews.map((news, index) => (
//             <div key={index} className="relative bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
//               <img
//                 src={news.urlToImage || 'https://via.placeholder.com/300x150'}
//                 alt={news.title}
//                 className="w-full h-auto object-cover rounded-md mb-4"
//               />
//               <h3 className="text-lg font-semibold mb-1">{news.title}</h3>
//               <p className="text-gray-400 text-xs">{new Date(news.publishedAt).toLocaleDateString()}</p>
//               <p className="text-gray-300 mb-2">{news.description}</p>
//               <a
//                 href={news.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-green-400 hover:text-green-500 underline text-sm"
//               >
//                 Read more →
//               </a>
//               {/* Sentiment label */}
//               <div className="absolute bottom-2 right-2 bg-gray-700 text-green-400 px-2 py-1 rounded text-xs">
//                 Sentiment: Positive {/* Placeholder for sentiment */}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Additional News Section for Different Orientations */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredNews.slice(6, 12).map((news, index) => (
//             <div key={index} className="relative bg-gray-800 p-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col md:flex-row text-xs">
//               <img
//                 src={news.urlToImage || 'https://via.placeholder.com/300x150'}
//                 alt={news.title}
//                 className="w-full md:w-1/4 h-24 object-cover rounded-md mb-3 md:mb-0 md:mr-4"
//               />
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold mb-1">{news.title}</h3>
//                 <p className="text-gray-400 text-xs">{new Date(news.publishedAt).toLocaleDateString()}</p>
//                 <p className="text-gray-300 mb-2">{news.description}</p>
//                 <a
//                   href={news.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-green-400 hover:text-green-500 underline text-xs"
//                 >
//                   Read more →
//                 </a>
//                 {/* Sentiment label */}
//                 <div className="absolute bottom-2 right-2 bg-gray-700 text-green-400 px-2 py-1 rounded text-xs">
//                   Sentiment: Neutral {/* Placeholder for sentiment */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default News;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentiments, setSentiments] = useState([]);  // To store sentiment predictions

  // Fetch news from News API
  useEffect(() => {
    const fetchNews = async (query = 'India stock market') => {
      try {
        const response =await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
        const data = await response.json();
        setNewsData(data.articles.slice(0, 20)); // Limit to 20 news articles
        setFilteredNews(data.articles.slice(0, 20)); // Display all by default
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews(); // Fetch initial news
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    const query = searchTerm || 'stock market'; // Default to general query if search term is empty
    const filtered = await fetchNews(query);
    const filteredData = filtered.articles.slice(0, 20); // Limit to 20 news articles
    setFilteredNews(filteredData);
  };

  const fetchNews = async (query) => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      return { articles: [] }; // Return empty articles on error
    }
  };

  // Function to get sentiment prediction from Flask API
  const getSentiment = async (newsText) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);  // 5-second timeout

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ news_text: newsText }),  // Send news title as 'news_text'
        signal: controller.signal,
      });

      clearTimeout(timeoutId);  // Clear the timeout once the response is received

      const data = await response.json();

      // Log the response data for debugging
      console.log('Sentiment Response:', data); 

      // If no prediction is available, return 'Unknown'
      return data.prediction || 'Unknown';  
    } catch (error) {
      console.error('Error fetching sentiment prediction:', error);
      return 'Unknown';  // Return 'Unknown' in case of failure
    }
  };

  // Fetch sentiment for all news articles
  useEffect(() => {
    const fetchSentiments = async () => {
      const sentimentsResults = await Promise.all(
        newsData.map(async (news) => {
          const sentiment = await getSentiment(news.title); // Pass news title for prediction
          return sentiment;
        })
      );
      setSentiments(sentimentsResults);
    };

    if (newsData.length > 0) {
      fetchSentiments();
    }
  }, [newsData]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Header with Search */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-left">Latest News</h2>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a stock..."
              className="bg-gray-800 text-white py-2 px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:border-green-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1 bottom-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        {/* Main News Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <div key={index} className="relative bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img
                src={news.urlToImage || 'https://via.placeholder.com/300x150'}
                alt={news.title}
                className="w-full h-auto object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{news.title}</h3>
              <p className="text-gray-400 text-xs">{new Date(news.publishedAt).toLocaleDateString()}</p>
              <p className="text-gray-300 mb-2">{news.description}</p>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-500 underline text-sm"
              >
                Read more →
              </a>
              {/* Sentiment label */}
              <div className="absolute bottom-2 right-2 bg-gray-700 text-green-400 px-2 py-1 rounded text-xs">
                Sentiment: {sentiments[index] || 'Loading...'} {/* Display sentiment */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;