import { useState } from "react";
import LoginForm from "../Components/AuthenticatePage/LoginForm";
import RegisterForm from "../Components/AuthenticatePage/RegisterForm";

const AuthenticatePage = ({ darkMode }) => {
  const [login, setLogin] = useState(true);
  return (
    <div className="flex flex-col items-center my-20 dark:text-white">
      {login ? (
        <>
          <LoginForm darkMode={darkMode} />
          <p className="text-sm ">
            <span className="text-gray-500">
              {"Don't"} have an account yet?{" "}
            </span>
            <span
              onClick={() => {
                setLogin(false);
              }}
              className="underline font-semibold cursor-pointer"
            >
              Register now
            </span>
          </p>
        </>
      ) : (
        <>
          <RegisterForm darkMode={darkMode} />
          <p className="text-sm ">
            <span className="text-gray-500">Already a member? </span>
            <span
              onClick={() => {
                setLogin(true);
              }}
              className="underline font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthenticatePage;
