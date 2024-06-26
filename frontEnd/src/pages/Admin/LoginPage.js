import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import * as FaIcons from "react-icons/fa";
import Images from "../../resource/img/imges";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastSuccess } from "../../components/Toaster/Tost";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NaveBar_SideBar/NavBar";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginPage({ setIsAuth }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (data.email === "admin@gmail.com" && data.password === "admin") {
        navigate("/dashboard");
        setIsAuth(true);
        ToastSuccess("Login Successful");
      } else {
        // Setting custom error message for password field
        errors.password.message = "Invalid email or password";
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  return (
    <>
      <div className="relative h-screen w-full">
        <img
          src={Images.backGround}
          alt="image 1"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center h-screen w-full">
        <Card className="w-full max-w-[48rem] flex-row shadow-2xl backdrop-blur-sm bg-white/90">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none bg-inherit"
          >
            <img
              src={Images.product7}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <form
            className="w-full p-10 flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h4" color="indigo" className="tracking-wider">
              Login
            </Typography>
            <Typography
              variant="h4"
              color="indigo"
              className="mb-2 tracking-widest"
            >
              Welcome Back
            </Typography>
            <Typography variant="h6" color="indigo" className="-mb-1 text-left">
              Your Email
            </Typography>
            <Input
              placeholder="name@mail.com"
              className=" !border-indigo-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 ">Invalid Email</p>
            )}
            <Typography variant="h6" color="indigo" className="-mb-1 text-left">
              Password
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className=" !border-indigo-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              icon={
                showPassword ? (
                  <FaIcons.FaEye
                    onClick={togglePasswordVisibility}
                    className="text-indigo-500 cursor-pointer"
                  />
                ) : (
                  <FaIcons.FaEyeSlash
                    onClick={togglePasswordVisibility}
                    className="text-indigo-500 cursor-pointer"
                  />
                )
              }
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 ">{errors.password.message}</p>
            )}
            <button className="text-indigo-500 text-sm text-right hover:underline hover:underline-offset-2 ">
              Forget Password ?
            </button>
            <Button variant="gradient" color="indigo" fullWidth type="submit">
              Login In
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
