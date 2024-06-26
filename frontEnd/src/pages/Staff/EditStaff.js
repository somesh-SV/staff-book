import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetSingleStaff, UpdateStaff } from "../../services/staffServices";
import { ToastSuccess } from "../../components/Toaster/Tost";

const schema = yup.object().shape({
  staffName: yup.string().required("Staff Name is required"),
  staffMobileNo: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  staffAddress: yup.string().required("Address is required"),
});

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staffName: "",
    staffMobileNo: null,
    staffAddress: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const loadStaffData = async () => {
    try {
      const res = await GetSingleStaff(id);
      if (res) {
        setFormData(res.data[0]); // the structure it gives data:{0:{...data}}
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadStaffData();
  }, []);
  useEffect(() => {
    reset(formData);
  }, [formData]);

  const onSubmit = async (data) => {
    try {
      const res = await UpdateStaff(id, data);
      if (res) {
        navigate("/viewStaff");
        ToastSuccess(res.message);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };
  return (
    <div className="flex justify-center mt-14">
      <div className="w-full max-w-md">
        <Card className="p-4">
          <Typography variant="h4" color="indigo" className="mb-4">
            Edit Staff
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
                type="number"
                size="md"
                placeholder="phone Number"
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("staffMobileNo")}
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
            <Button type="submit" className="bg-indigo-500" fullWidth>
              Save
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditStaff;
