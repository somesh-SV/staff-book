import React from "react";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import AddStaff from "../pages/Staff/AddStaff";
import EditStaff from "../pages/Staff/EditStaff";
import ViewStaff from "../pages/Staff/ViewStaff";
import AddStock from "../pages/Stock/AddStock";
import EditStock from "../pages/Stock/EditStock";
import ViewStock from "../pages/Stock/ViewStock";
import StockMgmt from "../Management/StockMgmt";
import AddCustomer from "../pages/Customer/AddCustomer";
import ViewCustomer from "../pages/Customer/ViewCustomer";
import EditCustomer from "../pages/Customer/EditCustomer";
import CustomerMgmt from "../Management/CustomerMgmt";
import Invoice from "../pages/Bill/Invoice";
import InvoiceList from "../pages/Bill/InvoiceList";
import SalesList from "../pages/SalesList/SalesList";

const RouteComponents = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/addStaff" element={<AddStaff />} />
        <Route path="/editStaff/:id" element={<EditStaff />} />
        <Route path="/viewStaff" element={<ViewStaff />} />
        <Route path="/addStock" element={<AddStock />} />
        <Route path="/editStock/:id" element={<EditStock />} />
        <Route path="/viewStock" element={<ViewStock />} />
        <Route path="/stockMgmt/:id" element={<StockMgmt />} />
        <Route path="/addCustomer" element={<AddCustomer />} />
        <Route path="/editCustomer/:id" element={<EditCustomer />} />
        <Route path="/viewCustomer" element={<ViewCustomer />} />
        <Route path="/customerMgmt/:id" element={<CustomerMgmt />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/invoiceList/" element={<InvoiceList />} />
        <Route path="/sales/" element={<SalesList />} />
      </Routes>
    </div>
  );
};

export default RouteComponents;
