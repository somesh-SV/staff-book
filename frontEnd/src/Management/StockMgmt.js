import React, { useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
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
import { useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import EditButton from "../components/Edit_Delete_Button/EditButton";
import DeleteButton from "../components/Edit_Delete_Button/DeleteButton";
import { GetSingleStaff } from "../services/staffServices";
import { GetProduct } from "../services/productServices";
import CustomDialog from "../components/Dialog/CustomDialog";
import { isOpen, isClose } from "../Redux/Reducer/dialog.reducer";
import {
  selectBalanceState,
  setBalance,
} from "../Redux/Reducer/balance.reducer";
import { useDispatch, useSelector } from "react-redux";
import { ToastSuccess, ToastError } from "../components/Toaster/Tost";
import {
  DeleteStaffMgmt,
  FilterStaffMgmt,
  GetSingleStaffDetails,
  PostStaffMgmt,
  UpdateStaffMgmt,
} from "../services/staffMgmtServices";

const TABLE_HEAD = [
  "Date",
  "ProductName",
  "Wages",
  "Quantity",
  "TotalAmount",
  "CashPaid",
  "Action",
];

const StockMgmt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const balances = useSelector(selectBalanceState);
  const tableRef = useRef(null);
  const [staffDetail, setStaffDetail] = useState({});
  const [products, setProducts] = useState({});
  const [wages, setWages] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cashPaid, setCashPaid] = useState();
  const [total, setTotal] = useState();
  const [quantity, setQuantity] = useState();
  const [tableRows, setTableRows] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [deleteId, setDeleteId] = useState("");
  const [defaultOptions, setdefaultOptions] = useState();

  const getStaffDetail = async () => {
    try {
      const res = await GetSingleStaff(id);
      if (res) {
        setStaffDetail(res.data[0]);
        //console.log("single staff", res.data[0]);
      }
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  const loadStaffData = async () => {
    try {
      const res = await GetSingleStaffDetails(id);
      if (res) {
        setTableRows(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const hangleSelect = (selectedOption) => {
    setSelectedProduct(selectedOption);

    if (selectedOption) {
      console.log(selectedOption.label);
      let selectedLabel = selectedOption.label;
      const selectedProductWages = products.filter((data) =>
        data.productName?.toLowerCase().includes(selectedLabel?.toLowerCase())
      );
      setWages(selectedProductWages[0]?.wages);
    } else {
      setWages(null);
    }
  };

  const onSubmit = async () => {
    const data = {
      staffId: id,
      productName: selectedProduct?.label,
      wages: wages,
      quantity: Number(quantity),
      total: total,
      cashPaid: Number(cashPaid),
    };
    try {
      const res = await PostStaffMgmt(data);
      if (res.data) {
        ToastSuccess(res.message);
        clearForm();
        loadStaffData();
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  const onSave = async () => {
    const data = {
      staffId: id,
      productName: selectedProduct?.label,
      wages: wages,
      quantity: Number(quantity),
      total: total,
      cashPaid: Number(cashPaid),
    };
    try {
      const res = await UpdateStaffMgmt(editId, data);
      if (res.data) {
        ToastSuccess(res.message);
        clearForm();
        loadStaffData();
        setisEdit(false);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  const clearForm = () => {
    setSelectedProduct(null);
    setWages(null);
    setQuantity("");
    setTotal(null);
    setCashPaid("");
  };

  const noChange = () => {
    clearForm();
    setisEdit(false);
  };

  const editStockDetails = async (_id) => {
    try {
      setisEdit(true);
      setEditId(_id);
      const res = await GetSingleStaffDetails(_id);
      if (res.data) {
        const item = res.data[0];
        console.log(item);
        setSelectedProduct({ label: item.productName, value: item.productId });
        setWages(item.wages);
        setQuantity(item.quantity);
        setCashPaid(item.cashPaid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStaffMgmt = async (_id) => {
    try {
      const res = await DeleteStaffMgmt(_id);
      if (res) {
        ToastError(res.message);
        loadStaffData();
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
    const res = await FilterStaffMgmt(id, value);
    if (res) {
      setTableRows(res.data);
    }
  };

  useEffect(() => {
    if (wages !== undefined && quantity !== undefined) {
      const calculatedTotal = wages * quantity;
      setTotal(calculatedTotal);
    }
  }, [quantity, wages]);

  const subTotal = tableRows?.reduce((preVal, row) => {
    const rowTotal = parseInt(row?.total) || 0;
    return preVal + rowTotal;
  }, 0);

  const totalCashPaid = tableRows?.reduce((preVal, row) => {
    const rowCashPaid = parseInt(row?.cashPaid) || 0;
    return preVal + rowCashPaid;
  }, 0);

  useEffect(() => {
    let balance = subTotal - totalCashPaid;
    if (id && (balance || balance === 0)) {
      dispatch(setBalance({ staffId: id, balance }));
    }
  }, [subTotal, totalCashPaid]);

  useEffect(() => {
    getStaffDetail();
    loadStaffData();
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  }, []);

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
  useEffect(() => {
    fetchDefaultProducts();
  }, []);

  return (
    <div>
      <Card className="mb-4">
        <CardBody>
          <div className="flex justify-between mb-5">
            <span className="inline-flex items-center space-x-2">
              <Typography variant="h6" color="indigo">
                Staff Name :
              </Typography>
              <Typography variant="h6">{staffDetail.staffName}</Typography>
            </span>
            <span className="inline-flex items-center space-x-2">
              <Typography variant="h6" color="indigo">
                Phone No :
              </Typography>
              <Typography variant="h6">{staffDetail.staffMobileNo}</Typography>
            </span>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div>
              <AsyncSelect
                loadOptions={getProducts}
                onChange={hangleSelect}
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
                    borderColor: state.isFocused
                      ? "#ccc"
                      : provided.borderColor,
                  }),
                }}
              />
            </div>
            <div>
              <Input
                label="Wages"
                size="md"
                color="indigo"
                value={wages !== null ? wages : ""}
              />
            </div>
            <div>
              <Input
                label="Quantity"
                color="indigo"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <Input disabled label="Total" color="indigo" value={total} />
            </div>
            <div>
              <Input
                label="Cash Paid"
                color="indigo"
                value={cashPaid}
                onChange={(e) => setCashPaid(e.target.value)}
              />
            </div>
            {isEdit ? (
              <Button className="bg-indigo-400" onClick={onSave}>
                Save
              </Button>
            ) : (
              <Button className="bg-indigo-400" onClick={onSubmit}>
                Submit
              </Button>
            )}
            {isEdit ? (
              <>
                <Button
                  className="bg-red-50 text-red-600 shadow-sm hover:shadow-md"
                  onClick={clearForm}
                >
                  Clear
                </Button>
                <Button className="bg-indigo-400" onClick={noChange}>
                  Return
                </Button>
              </>
            ) : (
              <Button
                className="bg-red-50 text-red-600 shadow-sm hover:shadow-md"
                onClick={clearForm}
              >
                Clear
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none p-0">
          <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-96">
                <Input
                  label="Search"
                  color="indigo"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="ml-auto items-center pr-6">
              <span className="inline-flex items-center space-x-2">
                <Typography variant="h6" color="indigo">
                  Balance :
                </Typography>
                <Typography variant="h6">
                  {tableRows?.length === 0 ? 0 : balances?.[id]}
                </Typography>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 ">
          <div
            className="w-full  min-h-fit  overflow-x-auto h-[450px] no-scrollbar"
            ref={tableRef}
          >
            <table className="w-full min-w-max table-auto text-center">
              <thead>
                <tr className="sticky top-0 ">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-indigo-100 bg-indigo-400 p-4 text-white font-normal leading-none"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows &&
                  tableRows.map((item, index) => {
                    const isLast = index === tableRows?.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-indigo-50";

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.productName ?? "-"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.wages ?? "-"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.quantity ?? "-"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.total?.toLocaleString() ?? "-"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.cashPaid?.toLocaleString() ?? "-"}
                          </Typography>
                        </td>
                        <td className={classes} colSpan={1}>
                          <span className="inline-flex items-center space-x-3">
                            <EditButton
                              fun={() => editStockDetails(item._id)}
                            />
                            <DeleteButton fun={() => openDialog(item._id)} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                <tr>
                  <td colSpan={3}></td>
                  <td className="p-4 border-t border-indigo-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      SubTotal:
                    </Typography>
                  </td>
                  <td className="pl-4 border-t border-indigo-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {subTotal?.toLocaleString() ?? "-"}
                    </Typography>
                  </td>
                  <td className="pl-4 border-t border-indigo-100">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {totalCashPaid?.toLocaleString() ?? "-"}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 -mt-5">
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
      <CustomDialog onConfirm={() => deleteStaffMgmt(deleteId)} />
    </div>
  );
};

export default StockMgmt;
