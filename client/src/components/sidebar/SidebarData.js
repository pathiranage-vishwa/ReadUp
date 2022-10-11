import React from "react";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";
import * as Boostrap from "react-icons/bs";

export const SidebarData = [
  {
    title: "Manage Users",
    path: "/allusers",
    icon: <FaIcons.FaRegUser />,
    cName: "nav-text",
    user: "admin",
  },
  {
    title: "Manage Categories",
    path: "/allcategory",
    icon: <BiIcons.BiCategory />,
    cName: "nav-text",
    user: "admin",
  },
  {
    title: "Customer Orders ",
    path: "/manageOrders",
    icon: <GiIcons.GiNotebook />,
    cName: "nav-text",
  },
  {
    title: "Requests Dashboard",
    path: "/requestHome",
    icon: <Boostrap.BsQuestionDiamondFill />,
    cName: "nav-text",
  },
  {
    title: "My Orders",
    path: "/displayOrders",
    icon: <GiIcons.GiReceiveMoney />,
    cName: "nav-text",
  },
  {
    title: "My Ads",
    path: "/myAds",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "My Cards",
    path: "/displayCard",
    icon: <FaIcons.FaCcMastercard />,
    cName: "nav-text",
  },
];
