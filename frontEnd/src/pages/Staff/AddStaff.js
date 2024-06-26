import React from "react";
import {
  Card,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastSuccess } from "../../components/Toaster/Tost";
import { useNavigate } from "react-router-dom";
import { PostStaff } from "../../services/staffServices";

const schema = yup.object().shape({
  staffName: yup.string().required("Staff name is required"),
  staffMobileNo: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number can't exceed 10 digits")
    .required("Phone number is required"),
  staffAddress: yup.string().required("Address is required"),
});

const AddStaff = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      staffName: "",
      staffMobileNo: "",
      staffAddress: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await PostStaff(data);
      if (res) {
        navigate("/viewStaff");
        ToastSuccess(res.message);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  const handleEnterKeyPress = (e, nextFieldId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(nextFieldId).focus();
    }
  };

  return (
    <div className="flex justify-center mt-14">
      <div className="w-full max-w-md">
        <Card className="p-4">
          <Typography variant="h4" color="indigo" className="mb-4">
            Add Staff
          </Typography>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Name
              </Typography>
              <Input
                size="md"
                placeholder="Enter Staff Name ..."
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("staffName")}
                onKeyDown={(e) => handleEnterKeyPress(e, "mobileNo")}
              />
              {errors.staffName && (
                <p className="text-sm text-red-500">
                  {errors.staffName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Phone Number
              </Typography>
              <Input
                id="mobileNo"
                size="lg"
                placeholder="Phone Number"
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("staffMobileNo")}
                onKeyDown={(e) => handleEnterKeyPress(e, "address")}
              />
              {errors.staffMobileNo && (
                <p className="text-sm text-red-500">
                  {errors.staffMobileNo.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Address
              </Typography>
              <Textarea
                id="address"
                placeholder="Address ..."
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("staffAddress")}
              />
              {errors.staffAddress && (
                <p className="text-sm text-red-500">
                  {errors.staffAddress.message}
                </p>
              )}
            </div>
            <Button
              id="submitBtn"
              type="submit"
              className="bg-indigo-400 text-white"
              fullWidth
            >
              Add
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddStaff;
