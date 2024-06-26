import * as materialIcon from "@mui/icons-material";

export const SideNavData = [
  {
    title: "Dasboard",
    path: "/dashboard",
    icon: <materialIcon.Dashboard />,
  },
  {
    title: "Staff",
    icon: <materialIcon.PeopleAlt />,
    subMenu: [
      {
        title: "Add Staff",
        path: "/addStaff",
        icon: <materialIcon.LibraryAdd />,
      },
      {
        title: "Staff Table",
        path: "/viewStaff",
        icon: <materialIcon.ListAlt />,
      },
    ],
  },
  {
    title: "Stock",
    path: "/stock",
    icon: <materialIcon.Warehouse />,
    subMenu: [
      {
        title: "Add Stock",
        path: "/addStock",
        icon: <materialIcon.LibraryAdd />,
      },
      {
        title: "Stock Table",
        path: "/viewStock",
        icon: <materialIcon.ListAlt />,
      },
    ],
  },
  {
    title: "Customer",
    icon: <materialIcon.Groups />,
    subMenu: [
      {
        title: "Add Customer",
        path: "/addCustomer",
        icon: <materialIcon.LibraryAdd />,
      },
      {
        title: "Customer Table",
        path: "/viewCustomer",
        icon: <materialIcon.ListAlt />,
      },
    ],
  },
  {
    title: "Invoice",
    path: "/invoice",
    icon: <materialIcon.ReceiptLong />,
  },
];
