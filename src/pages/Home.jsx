import Event from "../components/eventClick/Event";

const Home = () => {
    return (
      <>
        <div className="absolute z-10 bottom-8 right-5 py-4 ">
          <Event />
        </div>
        <div className="flex items-center justify-center h-screen bg-[#43B78D] relative z-0">
          <div className="text-9xl font-bold flex flex-col items-center text-white">
            <span>SIMPLE</span> <span>QUIKS</span>
          </div>
        </div>
      </>
    );
  };
  
  export default Home;
  
