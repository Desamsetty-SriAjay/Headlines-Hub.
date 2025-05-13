const Box = ({ name, headlines, handleClick }) => {
  return (
    <div
      className="flex flex-col shadow-lg rounded-lg overflow-hidden w-full max-w-[320px] mx-auto bg-gray-150  cursor-pointer"
      onClick={handleClick}
    >
      <div className="bg-zinc-700 text-white py-3 text-center font-medium">{name}</div>
      <div className="flex flex-col gap-3 p-4">
        {headlines.slice(0, 5).map((headline, idx) => (
          <div key={idx}>
            <p className="font-medium text-sm">{headline.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Box;
