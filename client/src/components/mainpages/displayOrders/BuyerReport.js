import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";
import moment from "moment";

const BuyerReport = (order, buyer) => {
  const buyerName =
    buyer.charAt(0).toUpperCase() + buyer.slice(1).toLowerCase();
  const doc = new jsPDF();

  const tableColumn = ["No", "Amount", "Date", "Time", "Order"];

  const tableRows = [];

  var no = 0;
  var total = 0;
  order.forEach((data) => {
    ++no;
    console.log(data.cart);
    //const [orderHistory,setOrderHistory] =[]
    const buyerHistory = [
      no,
      data.total,
      moment(data.createdAt).utc().format('YYYY-MM-DD'),
      moment(data.createdAt).utc().format('HH:MM:SS'),
    ]
    data.cart.forEach((item) => {
      const orderHistory = [
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

      ]
      
    })
    
    tableRows.push(buyerHistory);
  });

  console.log(total);


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
 

  doc.setFontSize(10);
  doc.text(`General Buyer Report `, 15, 60);
  doc.text(
    `This buyer report contain all the orders ${buyerName}.`,
    15,
    66
  );

  //we define the name of our PDF file.
  doc.save(`BuyerReport_.pdf`);
};

export default BuyerReport;
