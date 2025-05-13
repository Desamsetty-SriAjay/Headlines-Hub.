import Box from "../components/Box";
import HeadlinePreview from "../components/HeadlinePreview"; 
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const sources = {
  bbc: 'BBC News',
  ndtv: 'NDTV',
  ie: 'Indian Express',
  hindu: 'The Hindu'
};

const Home = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState({});
  const [activeSource, setActiveSource] = useState(null); 

  const goToNotes = () => {
    navigate('/notes');
  };

  const handleBoxClick = (key, name) => {
    setActiveSource(activeSource?.key === key ? null : { key, name, headlines: newsData[key] || [] });
  };

  const handleClosePreview = () => {
    setActiveSource(null);
  };

  useEffect(() => {
    const fetchAllNews = async () => {
      const results = {};
      for (const key in sources) {
        try {
          const res = await fetch(`http://localhost:5000/api/news/${key}`);
          const data = await res.json();
          results[key] = data;
        } catch (err) {
          console.error(`Error fetching ${key}:`, err);
          results[key] = [];
        }
      }
      setNewsData(results);
    };

    fetchAllNews();
  }, []);

  return (
    <div className="relative py-10 space-y-10 min-h-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(sources).map(([key, name]) => (
          <Box
            key={key}
            name={name}
            headlines={newsData[key] || []}
            isActive={activeSource?.key === key}
            handleClick={() => handleBoxClick(key, name)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={goToNotes}
          className="bg-zinc-800 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition cursor-pointer"
        >
          Notes
        </button>
      </div>

      {/* Expanded Preview */}
      {activeSource && (
        <HeadlinePreview
          name={activeSource.name}
          headlines={activeSource.headlines}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default Home;
