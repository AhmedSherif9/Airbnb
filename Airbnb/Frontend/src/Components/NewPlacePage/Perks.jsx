import { FaCar } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import { GiGate } from "react-icons/gi";

const Perks = ({ perks, setPerks }) => {
  const labelClasses = () => {
    return "flex flex-col gap-1";
  };

  const checkBoxClasses = () => {
    return "flex items-center gap-2 p-2 border border-gray-200 rounded-2xl cursor-pointer";
  };

  const UpdatePerks = (perk) => {
    if (perks.includes(perk)) {
      setPerks(
        perks.filter((item) => {
          return item !== perk;
        })
      );
    } else {
      setPerks([...perks, perk]);
    }
  };

  return (
    <div className={labelClasses()}>
      <h1 className="text-xl">Perks</h1>
      <p className="text-sm text-gray-500">
        select all the perks of your place
      </p>
      <div className="my-1 grid grid-cols-6 gap-2">
        <label className={checkBoxClasses()}>
          <input
            type="checkbox"
            checked={perks.includes("Wifi")}
            onChange={() => {
              UpdatePerks("Wifi");
            }}
          />
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
              d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
            />
          </svg>
          Wifi
        </label>
        <label className={checkBoxClasses()}>
          <input
            type="checkbox"
            checked={perks.includes("Free parking spot")}
            onChange={() => {
              UpdatePerks("Free parking spot");
            }}
          />
          <FaCar className="scale-150" />
          Free parking spot
        </label>
        <label className={checkBoxClasses()}>
          <input
            type="checkbox"
            checked={perks.includes("TV")}
            onChange={() => {
              UpdatePerks("TV");
            }}
          />
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
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          TV
        </label>
        <label className={checkBoxClasses()}>
          <input
            type="checkbox"
            checked={perks.includes("Radio")}
            onChange={() => {
              UpdatePerks("Radio");
            }}
          />
          <FaRadio />
          Radio
        </label>
        <label className={checkBoxClasses()}>
          <input
            type="checkbox"
            checked={perks.includes("Pets")}
            onChange={() => {
              UpdatePerks("Pets");
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
          Pets
        </label>
        <label className={checkBoxClasses()}>
          <input
            type="checkbox"
            checked={perks.includes("Private entrance")}
            onChange={() => {
              UpdatePerks("Private entrance");
            }}
          />
          <GiGate className="scale-150" />
          Private entrance
        </label>
      </div>
    </div>
  );
};

export default Perks;
