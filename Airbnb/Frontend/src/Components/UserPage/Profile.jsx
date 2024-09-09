import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, Logout } = useAuth();
  const navigate = useNavigate();

  const getOut = async () => {
    try {
      toast.loading("Logging Out", { id: "logout", duration: 9000 });
      await Logout();
      toast.success("Logged Out Successfully", {
        id: "logout",
        duration: 3000,
      });
      navigate("/");
    } catch (error) {
      console.error("error is ", error);
      toast.error("Logging Out Failed", { id: "logout", duration: 3000 });
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-semibold">{`Logged in as ${user?.name} (${user?.email})`}</p>
      <button
        onClick={getOut}
        className="px-5 py-1.5 rounded-full bg-primary text-white dark:text-black"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
