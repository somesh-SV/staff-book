import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Typography,
  Button,
  IconButton,
  Input,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";

import EditButton from "../../components/Edit_Delete_Button/EditButton";
import DeleteButton from "../../components/Edit_Delete_Button/DeleteButton";
import {
  DeleteProduct,
  FilterProduct,
  GetProduct,
} from "../../services/productServices";
import CustomDialog from "../../components/Dialog/CustomDialog";
import { isOpen, isClose } from "../../Redux/Reducer/dialog.reducer";
import { useDispatch } from "react-redux";
import { ToastError } from "../../components/Toaster/Tost";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "Produc Name",
  "Product ID",
  "Product Model No",
  "stock",
  "Action",
];

const ViewStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  const setProductDetail = async () => {
    try {
      const res = await GetProduct();
      if (res) {
        console.log(res.data);
        setTableRows(res.data);
      }
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  const deleteProduct = async (_id) => {
    try {
      const res = await DeleteProduct(_id);
      if (res) {
        ToastError(res.message);
        setProductDetail();
        dispatch(isClose(false));
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };
  const openDialog = (_id) => {
    dispatch(isOpen(true));
    setDeleteId(_id);
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    const res = await FilterProduct(value);
    if (res) {
      setTableRows(res.data);
    }
  };

  useEffect(() => {
    setProductDetail();
  }, []);
  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center pt-1">
            <div>
              <Typography variant="h5" color="indigo">
                Stock List
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  color="indigo"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={handleChange}
                />
              </div>
              <Button
                onClick={() => navigate("/addStock")}
                className="flex items-center gap-3 bg-indigo-400"
                size="sm"
              >
                <PlusIcon className="h-4 w-4" /> Add Product
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <div className="w-full overflow-x-auto min-h-fit max-h-[440px] no-scrollbar">
            <table className="w-full min-w-max table-auto text-center ">
              <thead>
                <tr className="sticky top-0">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-indigo-100 bg-indigo-400 p-4"
                    >
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal leading-none "
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows &&
                  tableRows.map((item, index) => {
                    const isLast = index === tableRows?.length - 1;
                    const classes = isLast
                      ? "p-3 px-4"
                      : "p-3 px-4 border-b border-indigo-50";

                    return (
                      <tr key={index}>
                        {/* <td className={classes}>
                          <div className="w-24 min-h-32 max-h-fit">
                            <img
                              className="rounded-lg object-cover object-center"
                              src={item.img}
                              alt={"no data"}
                            />
                          </div>
                        </td> */}
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.productName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.productId}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.modelNo}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.stock}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <span className="inline-flex items-center space-x-3">
                            <EditButton path={`/editStock/${item._id}`} />
                            <DeleteButton fun={() => openDialog(item._id)} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardBody>
        <div className="flex items-center justify-between border-t border-blue-gray-50 p-3 ">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </Card>
      <CustomDialog onConfirm={() => deleteProduct(deleteId)} />
    </div>
  );
};

export default ViewStock;
