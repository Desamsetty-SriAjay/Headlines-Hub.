const HeadlinePreview = ({ name, headlines, onClose }) => {
  if (!headlines || headlines.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-lg w-[90%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:max-w-3xl max-h-[80vh] p-4 sm:p-6 z-50 overflow-y-auto border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">{name} - Top Headlines</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-lg">×</button>
      </div>

      <div className="space-y-3">
        {headlines.slice(0, 10).map((headline, idx) => (
          <div key={idx}>
            <p className="font-medium text-sm sm:text-base">{headline.title}</p>
            <a
              href={headline.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline text-xs sm:text-sm break-words"
            >
              {headline.link}
            </a>
            <p className="text-xs text-gray-500">{headline.pubDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadlinePreview;
