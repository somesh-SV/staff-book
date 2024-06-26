import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { ToastSuccess } from "../../components/Toaster/Tost";
import { useNavigate } from "react-router-dom";
import { PostProduct } from "../../services/productServices";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  productId: yup.string().required("Product ID is required"),
  modelNo: yup.string().required("Model number is required"),
  wages: yup
    .number()
    .typeError("Wages must be a number")
    .required("Wages is required"),
});

const AddStock = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productName: "",
      productId: "",
      modelNo: "",
      wages: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("data : ", data);
      const res = await PostProduct(data);
      if (res) {
        navigate("/viewStock");
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
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-md">
        <Card className="p-4">
          <Typography variant="h4" color="indigo" className="mb-4">
            Add Stock
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Product Name
              </Typography>
              <Input
                placeholder="Enter Product Name ..."
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("productName")}
                onKeyDown={(e) => handleEnterKeyPress(e, "productId")}
              />
            </div>
            {errors.productName && (
              <p className="text-sm text-red-500">
                {errors.productName.message}
              </p>
            )}
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Product ID
              </Typography>
              <Input
                id="productId"
                placeholder="Enter Product ID ..."
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("productId")}
                onKeyDown={(e) => handleEnterKeyPress(e, "modelNo")}
              />
              {errors.productId && (
                <p className="text-sm text-red-500">
                  {errors.productId.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Model No
              </Typography>
              <Input
                id="modelNo"
                placeholder="Enter Model No ..."
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("modelNo")}
                onKeyDown={(e) => handleEnterKeyPress(e, "wages")}
              />
            </div>
            {errors.modelNo && (
              <p className="text-sm text-red-500">{errors.modelNo.message}</p>
            )}
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Wages
              </Typography>
              <Input
                id="wages"
                placeholder="Wages"
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("wages")}
              />
            </div>
            {errors.wages && (
              <p className="text-sm text-red-500">{errors.wages.message}</p>
            )}
            <Button type="submit" className="bg-indigo-400" fullWidth>
              Add
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddStock;
