import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SideBar from "./SideBar";
import RouteComponents from "../../Routes/RouteComponents";
import LoginPage from "../../pages/Admin/LoginPage";

function NavBar(p) {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {isAuth ? (
        <div className="flex h-screen">
          <SideBar open={open} />
          <div className="flex flex-col w-full">
            <div className="py-3 sticky top-0 z-50">
              <div className="max-w-screen-xl flex items-center ml-3">
                <button onClick={() => setOpen(!open)}>
                  {open ? (
                    <XMarkIcon className="text-indigo-600 w-8 h-8 duration-300" />
                  ) : (
                    <Bars3Icon className=" w-8 h-8 duration-300 text-indigo-600" />
                  )}
                </button>

                <p className="text-indigo-600 text-lg ml-3 flex-grow">Menu</p>
              </div>
            </div>
            <div className="overflow-y-auto no-scrollbar bg-gray-100 w-full h-full">
              <RouteComponents />
            </div>
          </div>
        </div>
      ) : (
        <LoginPage setIsAuth={setIsAuth} />
      )}
    </>
  );
}

export default NavBar;
