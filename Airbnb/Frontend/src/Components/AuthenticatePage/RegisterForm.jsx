import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
  const { Register } = useAuth();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const submit = async () => {
    try {
      if (
        !nameRef.current.value ||
        !emailRef.current.value ||
        !passwordRef.current.value
      ) {
        return;
      }
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      toast.loading("Signing Up", {
        id: "register",
        duration: 3000,
      });
      await Register({ name, email, password });
      toast.success("Signed Up Successfully", {
        id: "register",
        duration: 3000,
      });
      navigate("/");
    } catch (error) {
      console.error(`error is ${error}`);
      toast.error("Signing Up Failed", { id: "register", duration: 3000 });
    }
  };

  return (
    <article className="flex flex-col gap-3 p-5 items-center w-1/2">
      <h1 className="text-3xl font-semibold">Register</h1>
      <TextField
        id="full name"
        label="full name"
        variant="outlined"
        className="w-full"
        inputRef={nameRef}
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
        Register
      </button>
    </article>
  );
};

export default RegisterForm;
