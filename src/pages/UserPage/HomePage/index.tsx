import SearchBar from "./SearchBar";
import HeroSection from "./HeroSection";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <SearchBar />
        <HeroSection />
      </div>
    </div>
  );
};

export default HomePage;
