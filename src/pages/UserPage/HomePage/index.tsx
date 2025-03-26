import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/index.ts";
import { fetchLocations } from "../../../store/slices/location.ts";
import Destinations from "./Destinations.tsx/index.tsx";
import SearchBar from "./SearchBar/index.tsx";
import banner from "../../../assets/images/banner.jpg";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations, loading } = useSelector(
    (state: RootState) => state.location
  );
  const [showFixedSearch, setShowFixedSearch] = useState(false);

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(fetchLocations());
    }

    const handleScroll = () => {
      setShowFixedSearch(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, locations.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div
            className={`transition-all duration-300 ${
              showFixedSearch
                ? "fixed top-5 left-1/2 transform -translate-x-1/2 z-50 scale-90 sm:scale-100 w-[90%] sm:w-[70%] md:w-[50%]"
                : "absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] sm:max-w-[70%] md:max-w-3xl"
            }`}
          >
            <SearchBar locations={locations} loading={loading} />
          </div>

          {!showFixedSearch && (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-4 text-center">
              Nhờ có Host, mọi điều đều có thể
            </h1>
          )}
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Khám phá những điểm đến gần đây
        </h2>
        <Destinations />
      </div>
    </div>
  );
};

export default HomePage;
