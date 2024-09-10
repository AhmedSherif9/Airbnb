import { Link, useParams } from "react-router-dom";
import Profile from "../Components/UserPage/Profile";
import Bookings from "../Components/UserPage/Bookings";
import Accommodations from "../Components/UserPage/Accommodations";

const UserPage = () => {
  const { option } = useParams();

  const classesForButtons = (section) => {
    let classes = "px-5 py-1.5 rounded-full flex items-center gap-1";
    if (section === option) {
      classes +=
        " bg-primary dark:bg-primaryDark text-white dark:text-gray-800";
    } else {
      classes += " bg-gray-200 text-black dark:bg-gray-900 dark:text-white";
    }
    return classes;
  };

  return (
    <div className="flex flex-col gap-7 items-center dark:text-white">
      <div className="flex flex-row gap-2 font-semibold text-sm">
        <Link to={"/userpage/profile"} className={classesForButtons("profile")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My profile
        </Link>
        <Link
          to={"/userpage/bookings"}
          className={classesForButtons("bookings")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My bookings
        </Link>
        <Link
          to={"/userpage/accommodations"}
          className={classesForButtons("accommodations")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          My accommodations
        </Link>
      </div>

      {option === "profile" && <Profile />}
      {option === "bookings" && <Bookings />}
      {option === "accommodations" && <Accommodations />}
    </div>
  );
};

export default UserPage;
