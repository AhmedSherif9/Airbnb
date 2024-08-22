import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { Login } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const submit = async () => {
    try {
      if (!emailRef.current.value || !passwordRef.current.value) {
        return;
      }
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      await Login({ email, password });
      navigate("/");
    } catch (error) {
      console.error(`error is ${error}`);
    }
  };

  return (
    <article className="flex flex-col gap-3 p-5 items-center w-1/2">
      <h1 className="text-3xl font-semibold">Login</h1>
      <TextField
        id="email"
        label="email"
        variant="outlined"
        className="w-full"
        inputRef={emailRef}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#F5385D",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#F5385D",
          },
        }}
      />
      <TextField
        id="password"
        label="password"
        type="password"
        variant="outlined"
        className="w-full"
        inputRef={passwordRef}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#F5385D",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#F5385D",
          },
        }}
      />
      <button
        className="rounded-xl w-full px-4 py-1.5 bg-primary text-white font-semibold"
        onClick={submit}
      >
        Login
      </button>
    </article>
  );
};

export default LoginForm;
