import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { SideNavData } from "../../Routes/SideNavData";
import imges from "../../resource/img/imges";

function SideBar({ open }) {
  const [selectedSubMenu, setselectedSubMenu] = useState({});
  const { pathname } = useLocation();

  const toggleSubMenu = (index) => {
    setselectedSubMenu((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const activeItem = "text-indigo-600 bg-indigo-50 shadow-lg duration-300";
  return (
    <div>
      <div
        className={`pt-4 h-full duration-300 ${
          open ? "w-52" : "w-0 overflow-hidden"
        }`}
      >
        <div className="rounded-lg w-40 h-20 mx-auto flex items-center justify-center mb-4">
          <img className="h-fit w-fit" src={imges.logo} alt="Company Logo" />
        </div>
        <hr className="my-3" />
        <ul className="text-indigo-500 px-3">
          {SideNavData.map((item, index) => (
            <li key={index}>
              {item.subMenu ? (
                <>
                  <span
                    className={`cursor-pointer inline-flex items-center gap-x-2 text-md p-2 my-1.5 w-full rounded-lg`}
                    onClick={() => toggleSubMenu(index)}
                  >
                    {item.icon}
                    {item.title}
                    <span
                      className={`ml-auto  ${
                        selectedSubMenu === index ? "-rotate-180" : ""
                      }`}
                    >
                      {selectedSubMenu[index] ? (
                        <FaIcons.FaChevronUp />
                      ) : (
                        <FaIcons.FaChevronDown />
                      )}
                    </span>
                  </span>
                  {selectedSubMenu[index] && item.subMenu ? (
                    <ul>
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`inline-flex items-center text-md rounded-lg space-x-2 p-2 my-1 w-full ${
                              pathname === subItem.path ? activeItem : ""
                            }`}
                          >
                            {subItem.icon}
                            <span>{subItem.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : (
                <Link
                  className={`inline-flex gap-x-2 items-center text-md rounded-lg p-2 my-1 w-full ${
                    pathname === item.path ? activeItem : ""
                  }`}
                  to={item.path}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
