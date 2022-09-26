import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";

const SellerReport = (order, seller) => {
  const sellerName =
    seller.charAt(0).toUpperCase() + seller.slice(1).toLowerCase();
  const doc = new jsPDF();

  const tableColumn = ["No", "Name", "Address", "Phone Number", "Order"];

  const tableRows = [];

  var no = 0;
  var total = 0;

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
        [
          `Book Title\t\t   :` +
            item.title +
            `\nBook Price(LKR)\t:` +
            item.price +
            `\nBook Quantity\t    :` +
            item.quantity +
            `\nTotal Price(LKR)\t:` +
            item.price * item.quantity,
        ],
        (total = total + item.price * item.quantity),
      ];

      tableRows.push(SellerHistory);
    });
  });

  console.log(total);

  var img = new Image();
  img.src =
    "https://res.cloudinary.com/donfmtaf4/image/upload/v1664219957/Group_3_m4hond.png";
  doc.addImage(img, "png", 10, 10, 180, 42);

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

  // Received items title. and margin-top + margin-left
  doc.text(`${sellerName}'s Total Income (LKR) : ${total}`, 40, 140);

  doc.setFontSize(10);
  doc.text(`General Seller Report `, 15, 60);
  doc.text(
    `This seller report contain all the orders that are complete buy the seller.`,
    15,
    66
  );
  doc.text(
    `Total amount of money that the seller has earned is : ${total}`,
    15,
    71
  );

  //we define the name of our PDF file.
  doc.save(`sellerReport_.pdf`);
};

export default SellerReport;
