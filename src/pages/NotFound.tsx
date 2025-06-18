import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Path not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-gradient-to-b from-[#0f172a] to-[#111827]">
      <div className="text-center max-w-lg mx-4">
        <div className="text-white text-8xl font-bold mb-6">404</div>
        <h2 className="text-xl text-blue-400 mb-10">
          Sorry, we can't find the page you are looking for.
        </h2>

        <a
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
