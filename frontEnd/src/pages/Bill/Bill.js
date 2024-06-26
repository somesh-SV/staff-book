import React from "react";
import { ToWords } from "to-words";
const toWords = new ToWords();
function Bill(props) {
  return (
    <div className="bg-gray-50 p-1 h-screen text-black">
      <div className="text-center font-bold border-2 border-gray-900">
        <p className="pb-3 -mt-1 text-lg">Tax Invoice</p>
      </div>
      <div className="flex flex-col gap-1 border-t-0 border-2 border-gray-900 py-1 pt-0 text-center items-center justify-center">
        <p className="font-bold">SR Fancy Mart</p>
        <address className="w-[200px] text-sm">
          14B, Northern Street Greater South Avenue New York New York 10001
          U.S.A
        </address>
        <span className="flex space-x-3 mb-2 text-sm">
          <p className="font-semibold ">GSTIN</p>
          <p> : RA255YX87791</p>
        </span>
      </div>
      <div className="grid grid-cols-2 text-sm border-r-0 border-2 border-gray-900 border-t-0">
        <div className="border-r-2 border-gray-900 p-2 pt-0">
          <p className="font-semibold">Customer Name & Address</p>
          <p className="font-bold text-sm">Mr Ram</p>
          <address className="w-[200px] text-xs">
            14B, An den Irlen 8, Patriceberg, HH 91783 Avenue New York New York
            10001 U.S.A
          </address>
          <span className="flex space-x-3 mb-0.5">
            <p className="font-semibold ">GSTIN</p>
            <p> : RA255YX87791</p>
          </span>
        </div>
        <div className="border-r-2 border-y-0 border-gray-900">
          <div className="grid grid-cols-2 gap-2 mt-4 font-bold px-2">
            <span className="justify-between space-y-2">
              <p>Invoice No</p>
              <p>Invoice Date</p>
            </span>
            <span className="justify-between space-y-2">
              <p> : INV-0200303</p>
              <p> : {props.currentDate}</p>
            </span>
          </div>
        </div>
      </div>
      <table className="w-full text-xs text-center mb-4 border-2 border-t-0 border-gray-900">
        <thead>
          <tr className="border border-t-0 border-gray-900 text-white bg-indigo-300 ">
            <th className="border border-t-0 border-gray-900  p-2 pt-0">
              S.NO
            </th>
            <th className="border border-t-0 border-gray-900 w-[1113px] p-2 pt-0">
              Product Name
            </th>
            <th className="border border-t-0 border-gray-900 w-48 p-2 pt-0">
              HSN
            </th>
            <th className="border border-t-0 border-gray-900 w-48 p-2 pt-0 ">
              Price
            </th>
            <th className="border border-t-0 border-gray-900 w-48 p-2 pt-0 ">
              Quantity
            </th>
            <th className="border border-t-0 border-gray-900 w-48 p-2 pt-0 ">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {props.tableRows.map((items, index) => {
            return (
              <tr key={index} className="">
                <td className="border border-gray-900 p-2 pt-0">{index + 1}</td>
                <td className="border border-gray-900 text-left p-2 pt-0">
                  {items.ProductName}
                </td>
                <td className="border border-gray-900 p-2 pt-0">
                  YCV85854NB84
                </td>
                <td className="border border-gray-900 p-2 pt-0 ">
                  {items.price}
                </td>
                <td className="border border-gray-900 p-2 pt-0">
                  {items.Quantity}
                </td>
                <td className="border border-gray-900 p-2 pt-0 text-right">
                  {items.Total}
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="border  border-gray-900"></td>
            <td className="border  border-gray-900"></td>
            <td className="border  border-gray-900"></td>
            <td className="border border-gray-900"></td>
            <td className="p-2 pt-0 border border-gray-900 font-medium">
              Sub Total
            </td>
            <td className="text-right border border-gray-900 pb-4 px-2">
              {props.subTotal || 0}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900"></td>
            <td className="border border-gray-900"></td>
            <td className="border  border-gray-900"></td>
            <td className="border border-gray-900"></td>
            <td className="p-2 pt-0 border border-gray-900 font-medium">
              CGST
            </td>
            <td className="text-right border border-gray-900 pb-4 px-2">
              {props.cgst || 0}
            </td>
          </tr>
          <tr>
            <td className="border  border-gray-900"></td>
            <td className="border border-gray-900"></td>
            <td className="border  border-gray-900"></td>
            <td className="border border-gray-900"></td>
            <td className="p-2 pt-0 border border-gray-900 font-medium">
              SGST
            </td>
            <td className="text-right border border-gray-900 pb-4 px-2">
              {props.sgst || 0}
            </td>
          </tr>
          <tr>
            <td className="border  border-gray-900"></td>
            <td className="border  border-gray-900"></td>
            <td className="border  border-gray-900"></td>
            <td className="border border-gray-900"></td>
            <td className="p-2 pt-0 border border-gray-900  font-medium">
              IGST
            </td>
            <td className="text-right border border-gray-900 pb-4 px-2">
              {props.igst || 0}
            </td>
          </tr>
          <tr>
            <td className="border  border-gray-900"></td>
            <td className="border border-gray-900"></td>
            <td className="border  border-gray-900"></td>
            <td className="border border-gray-900"></td>
            <td className="p-2 pt-0 border border-gray-900  font-medium">
              Round Off
            </td>
            <td className="text-right border border-gray-900 pb-4 px-2">
              {props.roundedOff || 0}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex w-full justify-between">
        <span className="flex space-x-4">
          <p>Rupees :</p>
          <p>
            {props.totalAmount
              ? toWords.convert(parseInt(props?.totalAmount), {
                  currency: true,
                  ignoreDecimal: true,
                })
              : "ZERO"}
          </p>
        </span>

        <p className="font-bold">
          Grand Total: &#8377;{props.totalAmount || 0}
        </p>
      </div>
    </div>
  );
}

export default Bill;
