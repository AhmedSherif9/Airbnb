import TextField from "@mui/material/TextField";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { Login } = useAuth();

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const submit = async (data) => {
    try {
      toast.loading("Logging In", {
        id: "login",
        duration: 3000,
      });
      await Login(data);
      toast.success("Logged In Successfully", { id: "login", duration: 3000 });
      navigate("/");
    } catch (error) {
      console.error(`error is ${error}`);
      toast.error(`${error}`, { id: "login", duration: 3000 });
    }
  };

  return (
    <article className="flex flex-col gap-3 p-5 items-center w-1/2">
      <h1 className="text-3xl font-semibold">Login</h1>
      <form
        className="flex flex-col gap-3 items-center w-full"
        onSubmit={handleSubmit(submit)}
      >
        <TextField
          id="email"
          label="email"
          variant="outlined"
          className="w-full"
          {...register("email", {
            required: {
              value: true,
              message: "email is required",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
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
          {...register("password", {
            required: {
              value: true,
              message: "password is required",
            },
            validate: (value) => {
              let errorMessage = "";

              if (!/[A-Z]/.test(value)) {
                if (errorMessage.includes("Password must contain at least")) {
                  errorMessage += ", 1 uppercase letter";
                } else {
                  errorMessage +=
                    "Password must contain at least 1 uppercase letter";
                }
              }

              if (!/[a-z]/.test(value)) {
                if (errorMessage.includes("Password must contain at least")) {
                  errorMessage += ", 1 lowercase letter";
                } else {
                  errorMessage +=
                    "Password must contain at least 1 lowercase letter";
                }
              }

              if (!/\d/.test(value)) {
                if (errorMessage.includes("Password must contain at least")) {
                  errorMessage += ", 1 digit";
                } else {
                  errorMessage += "Password must contain at least 1 digit";
                }
              }

              if (value.length < 8) {
                if (errorMessage.includes("Password must contain at least")) {
                  errorMessage += ", 8 characters";
                } else {
                  errorMessage += "Password must contain at least 8 characters";
                }
              }

              return errorMessage || true;
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
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
          type="submit"
          className="rounded-xl w-full px-4 py-1.5 bg-primary text-white font-semibold"
        >
          Login
        </button>
      </form>
    </article>
  );
};

export default LoginForm;
