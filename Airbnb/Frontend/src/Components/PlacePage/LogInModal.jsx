import { Link } from "react-router-dom";
const LogInModal = ({ setShowModal }) => {
  return (
    <div
      className="fixed w-full h-full top-0 left-0 bg-gray-800 bg-opacity-50 
      backdrop-blur-sm flex justify-center items-center"
    >
      <article className="bg-gray-800 w-2/6 h-24 rounded-md flex items-center">
        <div className="h-4/6 w-full px-4">
          <h1 className="text-white text-lg">Log in to your account?</h1>
          <div className="w-2/6 ml-auto flex items-center gap-x-4">
            <button onClick={() => setShowModal(false)} className="text-error">
              CANCEL
            </button>
            <Link to={"/authenticate"} className="text-white">
              LOG IN
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default LogInModal;
