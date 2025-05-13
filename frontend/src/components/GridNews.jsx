import { useState } from 'react';
import Box from './Box';
import HeadlinePreview from './HeadlinePreview';

const GridNews = ({ newsData }) => {
  const [activeSource, setActiveSource] = useState(null);

  const handleBoxClick = (source) => {
    setActiveSource(source);
  };

  const handleClosePreview = () => {
    setActiveSource(null);
  };

  return (
    <div className="relative min-h-screen p-6 bg-gray-100">
      {/* Grid of Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newsData.map(({ name, headlines }) => (
          <Box
            key={name}
            name={name}
            headlines={headlines}
            handleClick={() => handleBoxClick({ name, headlines })}
          />
        ))}
      </div>

      {/* Expanded Preview Box */}
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

export default GridNews;
