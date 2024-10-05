import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  DeleteStaff,
  FilterStaff,
  GetStaff,
} from "../../services/staffServices";
import CustomDialog from "../../components/Dialog/CustomDialog";
import { isOpen, isClose } from "../../Redux/Reducer/dialog.reducer";
import { useDispatch } from "react-redux";
import { ToastError } from "../../components/Toaster/Tost";
import EditButton from "../../components/Edit_Delete_Button/EditButton";
import DeleteButton from "../../components/Edit_Delete_Button/DeleteButton";

const TABLE_HEAD = ["Name", "Phone Number", "Address", "Balance", "Action"];

const ViewStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tableRows, setTableRows] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  const getStaffDetail = async () => {
    try {
      const res = await GetStaff();
      if (res) {
        setTableRows(res.data);
      }
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  const deleteStaff = async (_id) => {
    try {
      const res = await DeleteStaff(_id);
      if (res) {
        ToastError(res.message);
        getStaffDetail();
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
    const res = await FilterStaff(value);
    if (res) {
      setTableRows(res.data);
    }
  };

  useEffect(() => {
    getStaffDetail();
  }, []);

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center pt-1">
            <div>
              <Typography variant="h5" color="indigo">
                Staff List
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
                onClick={() => navigate("/addStaff")}
                className="flex items-center gap-3 bg-indigo-400"
                size="sm"
              >
                <PlusIcon className="h-4 w-4" /> Add Staff
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <div className="w-full overflow-x-auto min-h-fit max-h-[440px] no-scrollbar">
            <table className="w-full min-w-max table-auto text-center">
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
                {tableRows.map((item, index) => {
                  const isLast = index === tableRows.length - 1;
                  const classes = isLast
                    ? "p-3"
                    : "p-3 border-b border-indigo-50";

                  return (
                    <tr key={index}>
                      <td
                        className={`${classes} cursor-pointer`}
                        onClick={() => navigate(`/stockMgmt/${item._id}`)}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.staffName}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.staffMobileNo}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.staffAddress}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.balance}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <span className="inline-flex items-center space-x-3">
                          <EditButton path={`/editStaff/${item._id}`} />
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
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3 -mt-4">
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
      <CustomDialog onConfirm={() => deleteStaff(deleteId)} />
    </>
  );
};

export default ViewStaff;
