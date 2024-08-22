import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, Logout } = useAuth();
  const navigate = useNavigate();

  const getOut = async () => {
    try {
      await Logout();
      navigate("/");
    } catch (error) {
      console.error("error is ", error);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-semibold">{`Logged in as ${user?.name} (${user?.email})`}</p>
      <button
        onClick={getOut}
        className="px-5 py-1.5 rounded-full bg-primary text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
