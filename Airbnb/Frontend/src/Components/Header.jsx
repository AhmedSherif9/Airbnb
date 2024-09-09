import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useSearch } from "../Context/SearchContext";

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const { setSearchTerm, searchTerm, searchBar, setSearchBar, close } =
    useSearch();

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="flex justify-between items-center relative dark:text-white">
      <Link
        onClick={close}
        to="/"
        className="font-black flex gap-1 items-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span>airbnb</span>
      </Link>

      <div
        className="w-2/5 px-4 py-2 border border-gray-200 font-semibold 
      rounded-full shadow-md shadow-gray-300 flex gap-2 cursor-pointer"
      >
        {searchBar ? (
          <>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="search for a place..."
              className="flex-grow border-none outline-none
            placeholder:text-sm placeholder:font-semibold"
            />
          </>
        ) : (
          <>
            <span>Anywhere</span>
            <div className="border border-gray-300"></div>
            <span>Any week</span>
            <div className="border border-gray-300"></div>
            <span>Add guests</span>
          </>
        )}
        <button
          disabled={!isHomePage}
          onClick={() =>
            setSearchBar((prev) => {
              if (prev) {
                setSearchTerm("");
                return false;
              }
              return true;
            })
          }
          className={`rounded-full p-1 ${
            !isHomePage
              ? "bg-gray-600"
              : searchBar
              ? "bg-white border border-1 border-primary"
              : "bg-primary"
          }`}
        >
          <CiSearch
            className={`scale-110 ${
              !isHomePage
                ? "text-white"
                : searchBar
                ? "text-primary"
                : "text-white"
            }`}
          />
        </button>
      </div>

      <Link
        onClick={close}
        to={isAuthenticated ? "/userpage/profile" : "/authenticate"}
        className="py-1.5 px-4 flex items-center gap-2 border-2 border-gray-200 rounded-full cursor-pointer"
      >
        <GiHamburgerMenu className="text-gray-600 scale-110 dark:text-white" />
        <div
          className="rounded-full p-1 bg-gray-600 border border-gray-600 overflow-hidden
         dark:bg-white"
        >
          <FaUser className="invert relative top-1 scale-125 " />
        </div>
        {isAuthenticated ? (
          <span className="font-semibold">{user.name}</span>
        ) : (
          <></>
        )}
      </Link>
    </header>
  );
};

export default Header;
