import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Input,
  Dialog,
  Button,
} from "@material-tailwind/react";

import AsyncSelect from "react-select/async";
import DeleteButton from "../../components/Edit_Delete_Button/DeleteButton";
import CustomDialog from "../../components/Dialog/CustomDialog";
import { GetCustomer } from "../../services/customerServices";
import FileUpload from "../../components/FileUpload";
import { getInvoiceById } from "../../services/invoiceServices";

const TABLE_HEAD = ["Date", "Bill", "Action"];
function SalesList() {
  const [tableRows, setTableRows] = useState([]);
  const [customer, setCustomer] = useState();
  const [customerDetail, setCustomerDetail] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [defaultOptions, setdefaultOptions] = useState();

  const getCustomer = async (searchValue, callback) => {
    try {
      const res = await GetCustomer();
      if (res) {
        setCustomer(res.data);
        const filteredOptions = res.data
          .filter((option) =>
            option.customerName
              ?.toLowerCase()
              .includes(searchValue?.toLowerCase())
          )
          .map((option) => ({
            label: option.customerName,
            value: option._id,
          }));
        callback(filteredOptions);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  const handleSelect = (selectedOption) => {
    setSelectedCustomer(selectedOption);
    if (selectedOption) {
      const selectedCustomerDetails = customer.find(
        (customer) => customer._id === selectedOption.value
      );
      setCustomerDetail(
        selectedCustomerDetails || {
          customerMobileNo: "",
          customerAddress: "",
          gst: "",
        }
      );
    } else {
      setCustomerDetail({
        customerMobileNo: "",
        customerAddress: "",
        gst: "",
      });
    }
  };

  const fetchDefaultCustomer = async () => {
    try {
      const res = await GetCustomer();
      if (res.data.length > 0) {
        setCustomer(res.data);
        const firstFiveCustomers = res.data.slice(0, 5).map((option) => ({
          label: option.customerName,
          value: option._id,
        }));
        console.log("res.data : ", firstFiveCustomers);
        setdefaultOptions(firstFiveCustomers);
      }
    } catch (error) {
      console.error("Error fetching default customers:", error);
    }
  };

  const fetchInvoice = async () => {
    try {
      const res = await getInvoiceById("66a9d1976c1186b0ac149c55");
      if (res.data) {
        const billName = `${res.data[0]?.invoiceNumber}_${res.data[0]?.customerId?.customerName}`;
        const tableData = [{ Date: res.data[0].currentDate, bill: billName }];
        setTableRows(tableData);
      }
    } catch (err) {
      console.log("error in fethching Invoice : ", err);
    }
  };

  React.useEffect(() => {
    fetchDefaultCustomer();
    fetchInvoice();
    // console.log(defaultOptions);
  }, []);

  return (
    <div>
      <div>
        <Card className="h-full w-full">
          <div className="p-2 mt-4 flex px-4 space-x-8">
            <AsyncSelect
              className="w-full"
              loadOptions={getCustomer}
              onChange={handleSelect}
              isClearable
              value={selectedCustomer}
              defaultOptions={defaultOptions}
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
            <IconButton className="bg-indigo-400 px-14">
              <div className=" flex items-center gap-3">
                <MagnifyingGlassIcon className="h-4 w-4" />
                <span>Search</span>
              </div>
            </IconButton>
          </div>
          <CardBody className="px-0">
            <div className="w-full overflow-x-auto min-h-fit max-h-[450px] no-scrollbar">
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
                    const isLast = index === tableRows.length - 1;
                    const classes = isLast
                      ? "p-3"
                      : "p-3 border-b border-indigo-50";

                    return (
                      <tr key={index}>
                        <td className={`${classes} cursor-pointer`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.Date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal underline underline-offset-4 text-blue-500 cursor-pointer"
                          >
                            {item?.bill}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <span className="inline-flex items-center space-x-3">
                            <DeleteButton />
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
      </div>
      {/* <Dialog open={dialogOpen} size="sm">
        <div className="p-5">
          <div className="">
           
            <form className="space-y-4">
              <div className="space-y-2">
                <Typography variant="h6" color="blue-gray">
                  Customer Name
                </Typography>
                <AsyncSelect
                  className="w-full"
                  loadOptions={getCustomer}
                  onChange={handleSelect}
                  isClearable
                  value={selectedCustomer}
                  defaultOptions={defaultOptions}
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
                      borderColor: state.isFocused
                        ? "#ccc"
                        : provided.borderColor,
                    }),
                  }}
                />
              </div>
              <div className="space-y-4">
                <Typography variant="h6" color="blue-gray">
                  File
                </Typography>
                <FileUpload
                  onFileUpload={(uploadedFiles) => {
                    setfile(uploadedFiles[0]);
                    //setFieldValue("attachment", uploadedFiles[0]);
                  }}
                />
                {file ? (
                  <div className="space-y-3">
                    <Typography color="blue-gray" variant="h6">
                      Uploaded Files :
                    </Typography>
                    <div className="inline-flex space-x-2 justify-center w-1/2">
                      <button
                        className="text-blue-800 underline font-semibold -mt-0.5 truncate overflow-hidden whitespace-nowrap "
                        //onClick={() => openPdfInNewWindow(selectedData._id)}
                      >
                        {file?.name}
                      </button>
                      <div>
                        <XMarkIcon
                          className="w-6 h-6 text-black font-bold cursor-pointer"
                          onClick={() => {
                            setfile(null);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-indigo-400 mt-5" fullWidth>
                  Add
                </Button>
                <Button
                  className="bg-red-400 mt-5"
                  fullWidth
                  onClick={() => setDialogOpen(false)}
                >
                  cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog> */}
    </div>
  );
}

export default SalesList;
