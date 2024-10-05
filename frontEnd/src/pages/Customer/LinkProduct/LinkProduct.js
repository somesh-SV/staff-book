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
  const [products, setProducts] = useState();
  const [defaultOptions, setdefaultOptions] = useState();

  const getProducts = async (searchValue, callback) => {
    try {
      const res = await GetProduct();
      if (res) {
        setProducts(res.data);
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

  const fetchDefaultProducts = async () => {
    try {
      const res = await GetProduct();
      if (res.data.length > 0) {
        setProducts(res.data);
        const firstFiveProducts = res.data
          .slice(0, res.data.length)
          .map((option) => ({
            label: option.productName,
            value: option.productId,
          }));
        console.log("res.data : ", firstFiveProducts);
        setdefaultOptions(firstFiveProducts);
      }
    } catch (error) {
      console.error("Error fetching default products:", error);
    }
  };
  React.useEffect(() => {
    fetchDefaultProducts();
  }, []);

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
              defaultOptions={defaultOptions}
              value={selectedProduct}
              styles={{
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: "150px",
                  color: "black",
                }),
                control: (provided, state) => ({
                  ...provided,
                  "&:hover": {
                    borderColor: "back",
                    boxShadow: "none",
                  },
                  boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  borderColor: state.isFocused ? "#ccc" : provided.borderColor,
                }),
              }}
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
