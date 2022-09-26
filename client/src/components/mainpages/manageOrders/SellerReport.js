import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";

const SellerReport = (order) => {
  console.log(order);
  const doc = new jsPDF();

  const tableColumn = ["No", "Name", "Address", "Phone Number", "Order"];

  const tableRows = [];

  var no = 0;

  order.forEach((data) => {
    ++no;

    console.log(data.cart);

    data.cart.forEach((item) => {
      // const SellerIt = [item.title, item.price, item.quantity];

      const SellerHistory = [
        no,
        data.name,
        data.address,
        data.phoneNumber,
        item.title,
      ];

      tableRows.push(SellerHistory);
    });
  });

  //   var img = new Image();
  //   img.src =
  //     "https://res.cloudinary.com/donfmtaf4/image/upload/v1654153704/Group_2_ny8ylr.png";
  //   doc.addImage(img, "png", 10, 10, 180, 42);

  // startY is basically margin-top
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    headerStyles: {
      fillColor: [168, 168, 168],
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
    },
    startY: 75,
  });
  doc.setFont("helvetica", "bold");

  //   // Received items title. and margin-top + margin-left
  //   doc.text(Type, 80, 50);

  //   doc.setFontSize(10);
  //   doc.text(`General marks `, 15, 60);
  //   doc.text(`This mark sheet contain ${Type} marks.`, 15, 66);
  //   doc.text(
  //     `Note that this is final marks that evaluate by marking panel.`,
  //     15,
  //     71
  //   );

  //we define the name of our PDF file.
  doc.save(`sellerReport_.pdf`);
};

export default SellerReport;
