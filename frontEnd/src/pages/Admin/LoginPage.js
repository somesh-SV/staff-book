import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import * as FaIcons from "react-icons/fa";
import Background from "../../resource/img/bg.jpg";
import sideImage from "../../resource/img/sideFlower.jpg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastError, ToastSuccess } from "../../components/Toaster/Tost";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function LoginPage({ setIsAuth }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur", // This mode triggers validation when an input field loses focus.
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      if (data.email === "admin@gmail.com" && data.password === "admin") {
        navigate("/dashboard");
        setIsAuth(true);
        ToastSuccess("Login Successful");
      } else {
        ToastError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="relative h-screen w-full">
        <img src={Background} alt="Background" className="w-full h-screen " />
      </div>
      <div className="absolute inset-0 flex justify-center items-center h-screen w-full">
        <Card className="w-[28rem] flex-row shadow-2xl backdrop-blur-sm bg-white/0 text-center">
          {/* <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none bg-inherit"
          >
            <img
              src={sideImage}
              alt="Login Image"
              className="h-full w-full object-cover"
            />
          </CardHeader> */}
          <form
            className="w-full p-10 flex flex-col space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h4" color="pink" className="tracking-wider">
              Login
            </Typography>
            <Typography
              variant="h4"
              color="pink"
              className="mb-2 tracking-widest"
            >
              Welcome Back
            </Typography>
            <div>
              <Typography variant="h6" color="pink" className="-mb-1 text-left">
                Email
              </Typography>
              <Input
                placeholder="name@mail.com"
                className="!border-pink-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("email", {
                  onBlur: () => {
                    trigger("email");
                  },
                })}
              />
              {errors.email && touchedFields.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Typography variant="h6" color="pink" className="-mb-1 text-left">
                Password
              </Typography>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="!border-pink-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                icon={
                  showPassword ? (
                    <FaIcons.FaEye
                      onClick={togglePasswordVisibility}
                      className="text-pink-500 cursor-pointer"
                    />
                  ) : (
                    <FaIcons.FaEyeSlash
                      onClick={togglePasswordVisibility}
                      className="text-pink-500 cursor-pointer"
                    />
                  )
                }
                {...register("password", {
                  onBlur: () => {
                    trigger("password");
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="text-pink-500 text-sm text-right hover:underline hover:underline-offset-2">
              Forget Password?
            </button>
            <Button variant="gradient" color="pink" fullWidth type="submit">
              Log In
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
