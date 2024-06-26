import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetSingleProduct,
  UpdateProduct,
} from "../../services/productServices";
import { ToastSuccess } from "../../components/Toaster/Tost";
import { useForm } from "react-hook-form";
const EditStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    img: "",
    productId: "",
    modelNo: "",
    wages: "",
    stock: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const loadProductData = async () => {
    try {
      const res = await GetSingleProduct(id);
      if (res) {
        setFormData(res.data[0]); // the structure it gives data:{0:{...data}}
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    try {
      const res = await UpdateProduct(id, data);
      if (res) {
        navigate("/viewStock");
        ToastSuccess(res.message);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };
  useEffect(() => {
    loadProductData();
  }, []);
  useEffect(() => {
    reset(formData);
  }, [formData]);
  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-md">
        <Card className="p-4">
          <Typography variant="h4" color="indigo" className="mb-4">
            Edit Stock
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
              />
            </div>
            <div className="py-2">
              <input type="file" {...register("img")} />
            </div>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Product ID
              </Typography>
              <Input
                placeholder="Enter Product ID ..."
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("productId")}
              />
            </div>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Model No
              </Typography>
              <Input
                placeholder="Enter Model No ..."
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("modelNo")}
              />
            </div>
            <div className="space-y-2">
              <Typography variant="h6" color="blue-gray">
                Wages
              </Typography>
              <Input
                placeholder="Wages"
                className=" !border-t-blue-gray-200 focus:!border-indigo-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("wages")}
              />
            </div>
            <Button type="submit" className="bg-indigo-400" fullWidth>
              Save
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditStock;
