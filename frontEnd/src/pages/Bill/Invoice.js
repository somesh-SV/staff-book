import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import EditButton from "../../components/Edit_Delete_Button/EditButton";
import DeleteButton from "../../components/Edit_Delete_Button/DeleteButton";
import * as materialIcon from "@mui/icons-material";
import Bill from "./Bill";
import { GetCustomer } from "../../services/customerServices";
import { ToastError } from "../../components/Toaster/Tost";
import { ClearProduct } from "../../services/productServices";
import { useNavigate } from "react-router-dom";
const TABLE_HEAD = ["Product Name", "Price", "Quantity", "Total", "Action"];

const Invoice = () => {
  const [open, setOpen] = useState(false);
  const [conform, setConform] = useState(false);
  const invoiceRef = useRef(null);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [customer, setCustomer] = useState();
  const [customerDetail, setCustomerDetail] = useState({});
  const [linkedProducts, setLinkedProducts] = useState([{}]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState();
  const [total, setTotal] = useState();
  const [tableRows, setTableRows] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [roundedOffValue, setRoundedOffValue] = useState(0);
  const [editingItem, setEditingItem] = useState(null);
  const [editId, setEditId] = useState();
  const [cgst, setCgst] = useState(false);
  const [sgst, setSgst] = useState(false);
  const [igst, setIgst] = useState(false);
  const [cgstVal, setCgstVal] = useState(0);
  const [sgstVal, setSgstVal] = useState(0);
  const [igstVal, setIgstVal] = useState(0);
  const [withOutRound, setWithOutRound] = useState(0);
  const [productStock, setProductStock] = useState(null);

  const handleOpen = () => setOpen(!open);
  const currentDate = new Date().toISOString().split("T")[0];
  const generatePDF = async () => {
    const element = invoiceRef.current;
    const customerName = selectedCustomer
      ? selectedCustomer.label.replace(/ /g, "_")
      : "Unknown_Customer";
    const fileName = `${currentDate}_${customerName}.pdf`;

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, height: 1000 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(opt)
      .outputPdf("blob")
      .then(function (pdf) {
        const url = URL.createObjectURL(pdf);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });

    const res = await ClearProduct(tableRows);
    if (res) {
      setCustomerDetail({
        customerMobileNo: "",
        customerAddress: "",
        gst: "",
      });
      setSelectedCustomer(null);
      setLinkedProducts([{}]);
      setSelectedProduct(null);
      setPrice(null);
      setQuantity(null);
      setTableRows([]);
      setCgst(false);
      setIgst(false);
      setSgst(false);
      handleOpen();
    }
  };

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
      setLinkedProducts(
        (selectedCustomerDetails && selectedCustomerDetails.linkedProducts) || [
          {},
        ]
      );
    } else {
      setCustomerDetail({
        customerMobileNo: "",
        customerAddress: "",
        gst: "",
      });
      setLinkedProducts([{}]);
    }
    setSelectedProduct(null);
    setPrice(null);
    setQuantity(null);
    setTableRows([]);
  };

  const searchProduct = () => {
    return linkedProducts
      .filter((linkedProduct) => {
        return !tableRows.some(
          (row) => row.ProductName === linkedProduct?.productId?.productName
        );
      })
      .map((linkedProduct) => {
        return {
          value: linkedProduct?.productId?._id,
          label: linkedProduct?.productId?.productName,
          price: linkedProduct?.price,
          stock: linkedProduct?.productId?.stock,
        };
      });
  };

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
    if (selectedOption) {
      setProductStock(selectedOption.stock);
      setPrice(selectedOption.price);
    } else {
      setPrice(null);
      setQuantity(null);
    }
  };
  const addProducts = () => {
    if (selectedProduct && quantity) {
      if (quantity <= productStock) {
        const newRow = {
          ProductName: selectedProduct.label,
          price: price,
          Quantity: quantity,
          Total: price * quantity,
        };
        setTableRows([...tableRows, newRow]);
        setSelectedProduct(null);
        setQuantity(null);
        setPrice(null);
      } else {
        ToastError("Insufficient Stock");
      }
    } else {
      ToastError("Fill Quantity field");
    }
  };
  const deleteProduct = (index) => {
    const updatedRows = tableRows.filter((_, rowIndex) => rowIndex !== index);
    setTableRows(updatedRows);
  };
  const handleEdit = (index) => {
    const itemToEdit = tableRows[index];
    setEditingItem(itemToEdit);
    setEditId(index);
  };
  const saveEdit = () => {
    if (
      !editingItem ||
      !editingItem.ProductName ||
      !editingItem.price ||
      !editingItem.Quantity
    ) {
      ToastError("Please fill the fields ");
      return;
    } else if (quantity <= productStock) {
      const updatedRows = [...tableRows];
      updatedRows[editId] = editingItem;
      setTableRows(updatedRows);
      setEditingItem(null);
      setSelectedProduct(null);
      setQuantity(null);
      setPrice(null);
    } else {
      ToastError("Insufficient Stock");
    }
  };

  const handleCgstChange = (e) => {
    setCgst(e.target.checked);
    if (e.target.checked) {
      setIgst(false);
    }
  };

  const handleSgstChange = (e) => {
    setSgst(e.target.checked);
    if (e.target.checked) {
      setIgst(false);
    }
  };

  const handleIgstChange = (e) => {
    setIgst(e.target.checked);
    if (e.target.checked) {
      setCgst(false);
      setSgst(false);
    }
  };

  const handleQuantity = async (e) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        Quantity: e.target.value,
      });
    } else {
      setQuantity(e.target.value);
    }
  };

  useEffect(() => {
    const calculatedSubTotal = tableRows.reduce(
      (total, item) => total + item.Quantity * item.price,
      0
    );
    setSubTotal(calculatedSubTotal);

    let newGstAmount = 0;

    if (igst) {
      newGstAmount = +(calculatedSubTotal * (5 / 100)).toFixed(2);
    } else if (cgst || sgst) {
      newGstAmount = +(calculatedSubTotal * (2.5 / 100)).toFixed(2);
      if (cgst && sgst) {
        newGstAmount *= 2;
      }
    }
    setGstAmount(newGstAmount);
    const newTotalAmount = calculatedSubTotal + newGstAmount;
    const roundedTotalAmount = Math.round(newTotalAmount);
    const difference = +(roundedTotalAmount - newTotalAmount).toFixed(2);
    setTotalAmount(roundedTotalAmount);
    setRoundedOffValue(difference);
    setWithOutRound(newTotalAmount);
  }, [tableRows, cgst, sgst, igst]);

  useEffect(() => {
    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;
    if (cgst) {
      cgstAmount = subTotal * 0.025;
    }
    if (sgst) {
      sgstAmount = subTotal * 0.025;
    }
    if (igst) {
      igstAmount = subTotal * 0.05;
    }
    setCgstVal(cgstAmount.toFixed(2));
    setSgstVal(sgstAmount.toFixed(2));
    setIgstVal(igstAmount.toFixed(2));
  }, [subTotal, cgst, sgst, igst]);
  useEffect(() => {
    if (editingItem) {
      const calculatedTotal =
        parseInt(editingItem.price) * parseInt(editingItem.Quantity);
      setTotal(calculatedTotal);
      editingItem.Total = calculatedTotal;
    } else if (price !== undefined && quantity !== undefined) {
      const calculatedTotal = parseInt(price) * parseInt(quantity);
      setTotal(calculatedTotal);
    }
  }, [price, quantity, editingItem]);

  return (
    <>
      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="inline-flex flex-wrap justify-between items-center w-full">
            <Typography variant="h5" color="indigo">
              Invoice
            </Typography>
            <div className="space-x-5">
              <Button
                size="sm"
                color="indigo"
                onClick={handleOpen}
                className="space-x-3 p-2"
              >
                <span>Preview</span>
                <span>
                  <materialIcon.Visibility className="w-5 h-5 text-gray-50" />
                </span>
              </Button>
              {/* <Button
                size="sm"
                color="indigo"
                className="space-x-3 p-2"
                onClick={generatePDF}
              >
                <span>Bill</span>
                <span>
                  <materialIcon.ReceiptLongOutlined className="w-5 h-5 text-gray-50" />
                </span>
              </Button> */}
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Typography variant="h6" color="indigo">
              CUSTOMER
            </Typography>
            <hr className="mb-4 mt-1 bg-gradient-to-r from-indigo-500 p-0.5 rounded-3xl" />
            <form>
              <div className="grid grid-cols-4 justify-between w-full gap-4">
                <AsyncSelect
                  className="w-full"
                  loadOptions={getCustomer}
                  onChange={handleSelect}
                  isClearable
                  value={selectedCustomer}
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      maxHeight: "160px",
                      overflowY: "auto",
                    }),
                  }}
                />
                <Input
                  label="Phone Number"
                  type="text"
                  color="indigo"
                  value={customerDetail?.customerMobileNo}
                  disabled
                />
                <Input
                  label="GST"
                  type="text"
                  color="indigo"
                  value={customerDetail?.gst}
                  disabled
                />
                <Input
                  label="Address"
                  type="text"
                  color="indigo"
                  value={customerDetail?.customerAddress}
                  disabled
                />
              </div>
            </form>
          </div>
          <div className="mt-5">
            <Typography variant="h6" color="indigo">
              Purchase List
            </Typography>
            <hr className="mb-4 mt-1 bg-gradient-to-r from-indigo-500 p-0.5 rounded-3xl" />
            <form className="grid grid-cols-4 gap-4 w-full">
              <Select
                className="w-full"
                onChange={handleProductChange}
                options={searchProduct()}
                isClearable
                value={
                  editingItem
                    ? {
                        label: editingItem.ProductName,
                        value: editingItem.productId,
                      }
                    : selectedProduct
                }
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: "160px",
                    overflowY: "auto",
                  }),
                }}
              />
              <Input
                label="Price"
                type="number"
                color="indigo"
                value={editingItem ? editingItem.price : price || ""}
                disabled
              />
              <div>
                <Input
                  label="Quantity"
                  type="number"
                  color="indigo"
                  value={editingItem ? editingItem.Quantity : quantity || ""}
                  onChange={handleQuantity}
                />
                {(editingItem || selectedProduct) && (
                  <span className="text-sm m-2 text-indigo-500">
                    Stock: {productStock}
                  </span>
                )}
              </div>
              <Input
                label="Total"
                color="indigo"
                value={editingItem ? editingItem.Total || 0 : total || 0}
                disabled
              />
              <Button
                size="sm"
                color="indigo"
                onClick={editingItem ? saveEdit : addProducts}
                className="w-fit"
              >
                {editingItem ? "Save" : "Add"}
              </Button>
            </form>
            <div className="h-full w-full mt-4">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className="border-b border-gray-200 p-4 bg-indigo-400"
                      >
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal leading-none"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((items, index) => {
                    const isLast = index === tableRows.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-gray-200";

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {items.ProductName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {items.price}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {items.Quantity}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {items.Total}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <span className="inline-flex items-center space-x-3">
                            <EditButton fun={() => handleEdit(index)} />
                            <DeleteButton fun={() => deleteProduct(index)} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Subtotal row */}
                  <tr className="border-b border-gray-200">
                    <td colSpan="4" className="p-2 text-right font-medium">
                      SubTotal
                    </td>
                    <td className="p-2">{subTotal || 0}</td>
                  </tr>
                  {/* Tax rows */}
                  <tr className="border-b border-gray-200">
                    <td colSpan="4" className="p-2">
                      <label className="flex space-x-2 float-right">
                        <input
                          type="checkbox"
                          checked={cgst}
                          onChange={handleCgstChange}
                        />
                        <span>CGST 2.5%</span>
                      </label>
                    </td>
                    <td className="p-2">{cgstVal}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td colSpan="4" className="p-2">
                      <label className="flex space-x-2 float-right">
                        <input
                          type="checkbox"
                          checked={sgst}
                          onChange={handleSgstChange}
                        />
                        <span>SGST 2.5%</span>
                      </label>
                    </td>
                    <td className="p-2">{sgstVal}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td colSpan="4" className="p-2">
                      <label className="flex space-x-2 float-right">
                        <input
                          type="checkbox"
                          checked={igst}
                          onChange={handleIgstChange}
                        />
                        <span>IGST 5%</span>
                      </label>
                    </td>
                    <td className="p-2">{igstVal}</td>
                  </tr>
                  {/* Without Rounded */}
                  <tr className="border-b border-gray-200 ">
                    <td colSpan="4" className="p-2 text-right">
                      Total Amount
                    </td>
                    <td className="p-2">{withOutRound || 0}</td>
                  </tr>
                  {/* Round Off row */}
                  <tr className="border-b border-gray-200 ">
                    <td colSpan="4" className="p-2 text-right">
                      Round Off
                    </td>
                    <td className="p-2">{roundedOffValue || 0}</td>
                  </tr>
                  {/* Total Amount row */}
                  <tr className="border-b border-gray-200">
                    <td colSpan="4" className="p-2 text-right">
                      Grand Total
                    </td>
                    <td className="p-2">{totalAmount || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardBody>
      </Card>
      <Dialog size="xxl" open={open} handler={handleOpen}>
        <DialogBody className="overflow-y-auto ">
          <div className="max-h-full" ref={invoiceRef}>
            <Bill
              tableRows={tableRows}
              subTotal={subTotal}
              gstAmount={gstAmount}
              gst={customerDetail?.gst}
              totalAmount={totalAmount}
              cgst={cgstVal}
              sgst={sgstVal}
              igst={igstVal}
              roundedOff={roundedOffValue}
              currentDate={currentDate}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            color="indigo"
            className="space-x-3 p-2"
            onClick={generatePDF}
          >
            <span>Bill</span>
            <span>
              <materialIcon.ReceiptLongOutlined className="w-5 h-5 text-gray-50" />
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Invoice;
