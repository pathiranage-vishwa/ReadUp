import jsPDF from "jspdf";
import "jspdf-autotable";

const requestReport = (requests) => {
  const doc = new jsPDF();

  const tableColumn = [
    "BookName",
    "Author",
    "Category",
    "ISBN Number",
    "Status",
  ];

  const tableRows = [];

  requests.forEach((requests) => {
    const requestsData = [
      requests.bookName,
      requests.author,
      requests.category,
      requests.isbnNumber,
      requests.status,
    ];
    // push each users's info into a row
    tableRows.push(requestsData);
  });

  var img = new Image();
  img.src =
    "https://res.cloudinary.com/dlprhahi4/image/upload/v1665513744/Bookstore/Group_4_cx33mlgv_gdlm9q.jpg";
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
    startY: 82,
  });
  doc.setFont("helvetica", "bold");

  //we define the name of our PDF file.
  doc.save(`SalesReport_.pdf`);
};

export default requestReport;
