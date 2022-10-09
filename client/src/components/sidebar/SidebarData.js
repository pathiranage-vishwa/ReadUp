import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as Boostrap from "react-icons/bs";

export const SidebarData = [
  {
    title: "Manage Users",
    path: "/allusers",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Manage Categories",
    path: "/viewMarking",
    icon: <AiIcons.AiOutlineRead />,
    cName: "nav-text",
  },
  {
    title: "Manage Orders ",
    path: "/displayRequests",
    icon: <Boostrap.BsQuestionDiamondFill />,
    cName: "nav-text",
  },
  {
    title: "Manage Requests ",
    path: "/displayRequests",
    icon: <Boostrap.BsQuestionDiamondFill />,
    cName: "nav-text",
  },
  {
    title: "My Orders",
    path: "/groupList",
    icon: <Boostrap.BsPeopleFill />,
    cName: "nav-text",
  },
  {
    title: "My Ads",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "My Cards",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];