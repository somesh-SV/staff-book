import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastSuccess } from "../../components/Toaster/Tost";
import { useNavigate } from "react-router-dom";
import { PostCustomer } from "../../services/customerServices";

const AddCustomer = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      customerName: "",
      customerMobileNo: "",
      gst: "",
      customerAddress: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const res = await PostCustomer(data);
      if (res) {
        navigate("/viewCustomer");
        ToastSuccess(res.message);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };
  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-md">
        <Card className="p-4">
          <Typography variant="h4" color="indigo" className="mb-4">
            Add Customer
          </Typography>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Customer Name
              </Typography>
              <Input
                size="regular"
                placeholder="Customer Name ..."
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("customerName")}
              />
            </div>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Phone Number
              </Typography>
              <Input
                type="number"
                size="lg"
                placeholder="phone Number"
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("customerMobileNo")}
              />
            </div>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                GST
              </Typography>
              <Input
                size="lg"
                placeholder="GST Number ... "
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("gst")}
              />
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
                {...register("customerAddress")}
              />
            </div>
            <Button type="submit" className="bg-indigo-400" fullWidth>
              Add
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddCustomer;
