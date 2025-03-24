import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-black-800">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
