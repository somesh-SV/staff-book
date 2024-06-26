import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import {
  GetLinkedProducts,
  UpdateLinkedProduct,
} from "../../../services/customerServices";
import { ToastSuccess } from "../../../components/Toaster/Tost";

const EditLinkProduct = ({ setIsEdit, linkProductId, getCustomerDetail }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});

  const getLinkedProduct = async () => {
    try {
      const res = await GetLinkedProducts(id, { linkProductId });
      setProductData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const save = async () => {
    const data = {
      linkedProducts: [
        { productId: productData.productId._id, price: productData.price },
      ],
      edit: true,
    };

    try {
      const res = await UpdateLinkedProduct(id, data);
      if (res) {
        setIsEdit(false);
        ToastSuccess(res.message);
        getCustomerDetail(id);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  useEffect(() => {
    getLinkedProduct();
  }, []);

  return (
    <div className="my-5 max-w-full flex flex-col shadow-md p-2">
      <div className="mb-3">
        <Typography variant="h6" color="indigo">
          Edit Link Product
        </Typography>
      </div>
      <div className="flex w-full md:w-auto items-center space-x-4 mb-4">
        <div className="inline-flex flex-wrap items-center space-x-4">
          <span>
            <Input
              label="ProductName"
              color="indigo"
              value={productData?.productId?.productName}
              disabled
            />
          </span>
          <span>
            <Input
              label="Price"
              color="indigo"
              value={productData?.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-2">
          <Button color="indigo" size="sm" onClick={save}>
            Save
          </Button>
          <Button
            className="flex gap-x-2 items-center justify-center bg-indigo-400 text-white"
            size="sm"
            onClick={() => setIsEdit(false)}
          >
            <ArrowUturnLeftIcon className="w-4 h-4" /> return
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditLinkProduct;
