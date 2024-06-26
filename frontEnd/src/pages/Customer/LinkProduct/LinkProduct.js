import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import AsyncSelect from "react-select/async";
import { PlusIcon } from "@heroicons/react/24/solid";
import { GetProduct } from "../../../services/productServices";
import { ToastError, ToastSuccess } from "../../../components/Toaster/Tost";
import { UpdateLinkedProduct } from "../../../services/customerServices";
import { useParams } from "react-router-dom";

const LinkProduct = ({ getCustomerDetail }) => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [products, setproducts] = useState();

  const getProducts = async (searchValue, callback) => {
    try {
      const res = await GetProduct();
      if (res) {
        setproducts(res.data);
        const filteredOptions = res.data
          .filter((option) =>
            option.productName
              ?.toLowerCase()
              .includes(searchValue?.toLowerCase())
          )
          .map((option) => ({
            label: option.productName,
            value: option.productId,
          }));
        callback(filteredOptions);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleSelect = (selectedOption) => {
    setSelectedProduct(selectedOption);
    if (selectedOption) {
      setProductId(selectedOption.value);
      let selectedLabel = selectedOption.label;
      const selectedProductWages = products.filter((data) =>
        data.productName?.toLowerCase().includes(selectedLabel?.toLowerCase())
      );
      setProductId(selectedProductWages[0]._id);
    } else {
      setProductId("");
      setPrice("");
    }
  };

  const onSubmit = async () => {
    const data = {
      linkedProducts: [{ productId, price }],
      edit: false,
    };

    try {
      const res = await UpdateLinkedProduct(id, data);
      if (res) {
        if (res.message === "Already Updated") {
          ToastError(res.message);
          setSelectedProduct("");
          setPrice("");
        } else {
          ToastSuccess(res.message);
          setSelectedProduct("");
          setPrice("");
          getCustomerDetail(id);
        }
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  return (
    <div className="my-5 max-w-full flex flex-col rounded-lg p-2">
      <div className="mb-3">
        <Typography variant="h6" color="indigo">
          Link Product
        </Typography>
      </div>
      <div className="flex w-full md:w-auto items-center space-x-4 mb-4">
        <div className="inline-flex flex-wrap items-center space-x-4">
          <span className="w-72">
            <AsyncSelect
              loadOptions={getProducts}
              onChange={handleSelect}
              isClearable
              value={selectedProduct}
            />
          </span>
          <span>
            <Input
              label="Price"
              size="md"
              color="indigo"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </span>
        </div>
        <div className="">
          <Button
            className="flex items-center gap-3 bg-indigo-400"
            size="sm"
            onClick={onSubmit}
          >
            <PlusIcon className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkProduct;
