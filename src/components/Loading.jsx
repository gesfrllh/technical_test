
const LoadingPage = ({ items }) => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-4 justify-center items-center">
          <span className="animate rounded-full"></span>
          <span className="text-gray-500">Loading {items}...</span>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
