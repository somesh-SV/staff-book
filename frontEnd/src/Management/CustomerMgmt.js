import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import EditLinkProduct from "../pages/Customer/LinkProduct/EditLinkProduct";
import LinkPrtoduct from "../pages/Customer/LinkProduct/LinkProduct";
import EditButton from "../components/Edit_Delete_Button/EditButton";
import DeleteButton from "../components/Edit_Delete_Button/DeleteButton";
import {
  DeleteLinkedProduct,
  FilterLinkedProduct,
  GetSingleCustomer,
} from "../services/customerServices";
import { ToastError } from "../components/Toaster/Tost";
import { useDispatch } from "react-redux";
import { isOpen, isClose } from "../Redux/Reducer/dialog.reducer";
import CustomDialog from "../components/Dialog/CustomDialog";

const TABLE_HEAD = ["Product", "Price", "Action"];

const CustomerMgmt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [customerDetail, setCustomerDetail] = useState({});
  const [linkProductId, setlinkProductId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const getCustomerDetail = async () => {
    try {
      const res = await GetSingleCustomer(id);
      if (res) {
        setCustomerDetail(res.data[0]);
        console.log();
        setTableRows(res.data[0].linkedProducts);
      }
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  const edit = (_id) => {
    setlinkProductId(_id);
    //console.log(_id);
    setIsEdit(true);
  };

  const deleteCustomerMgmt = async (_id) => {
    const data = {
      linkedProducts: [{ productId: _id }],
      delete: true,
    };
    try {
      const res = await DeleteLinkedProduct(id, data);
      if (res) {
        ToastError(res.message);
        getCustomerDetail();
        dispatch(isClose(false));
      }
      console.log("woking", _id);
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
    const res = await FilterLinkedProduct(id, value);
    if (res) {
      setTableRows(res.data);
    }
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col flex-wrap items-center pt-3">
          <Typography variant="h5" color="indigo">
            {customerDetail.customerName}
          </Typography>
          <span className="inline-flex items-center space-x-2">
            <Typography variant="h6" color="indigo">
              Ph No :
            </Typography>
            <Typography variant="h6">
              {customerDetail.customerMobileNo}
            </Typography>
          </span>
          <span className="inline-flex items-center space-x-2">
            <Typography variant="h6" color="indigo">
              Address :
            </Typography>
            <Typography variant="h6">
              <address>{customerDetail.customerAddress}</address>
            </Typography>
          </span>
        </div>
        {isEdit ? (
          <EditLinkProduct
            linkProductId={linkProductId}
            setIsEdit={setIsEdit}
            getCustomerDetail={getCustomerDetail}
          />
        ) : (
          <LinkPrtoduct getCustomerDetail={getCustomerDetail} />
        )}
      </div>
      <Card className="h-full w-full">
        <div className="m-3 mb-5 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <Typography variant="h6" color="indigo">
              Product List
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              color="indigo"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto min-h-fit max-h-[500px] no-scrollbar">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr className="sticky top-0">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-indigo-400 p-4"
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
              {tableRows?.map((item, index) => {
                const isLast = index === tableRows?.length - 1;
                const classes = isLast
                  ? "p-3"
                  : "p-3 border-b border-indigo-50";

                return (
                  <tr key={index}>
                    {/* <td className={classes}>
                      <div className="w-24 min-h-32 max-h-fit">
                        <img
                          className="rounded-lg object-cover object-center"
                          src={item?.productId?.img}
                          alt={"No data"}
                        />
                      </div>
                    </td> */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.productId?.productName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <span className="inline-flex items-center space-x-3">
                        <EditButton fun={() => edit(item?._id)} />
                        <DeleteButton fun={() => openDialog(item._id)} />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3">
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
        </CardFooter>
      </Card>
      <CustomDialog onConfirm={() => deleteCustomerMgmt(deleteId)} />
    </div>
  );
};

export default CustomerMgmt;
