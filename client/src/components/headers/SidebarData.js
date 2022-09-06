import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as Boostrap from "react-icons/bs";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Marking Schemes",
    path: "/viewMarking",
    icon: <AiIcons.AiOutlineRead />,
    cName: "nav-text",
  },
  {
    title: "Request Supervisor ",
    path: "/displayRequests",
    icon: <Boostrap.BsQuestionDiamondFill />,
    cName: "nav-text",
  },
  {
    title: "Group Registration",
    path: "/groupList",
    icon: <Boostrap.BsPeopleFill />,
    cName: "nav-text",
  },

  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
