import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (profile) => {
  const doc = new jsPDF();

  // define the columns and Headers
  const tableColumn = ["FullName", "Email", "UserName", "User Type"];
  // define an array of rows
  const tableRows = [];

  profile.forEach((profile) => {
    const profileData = [
      profile.firstName + " " + profile.lastName,
      profile.email,
      profile.username,
      profile.userType,
    ];
    // push each users's info into a row
    tableRows.push(profileData);
    console.log(profileData);
  });

  var img = new Image();
  img.src =
    "https://res.cloudinary.com/dlprhahi4/image/upload/v1665404789/Bookstore/Group_4_cxmlgv_cb8p5s.jpg";
  doc.addImage(img, "png", 14, 2, 181, 42);
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
    startY: 47,
  });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`General Sales Report `, 15, 350);
  doc.text(
    `This sales report contain all the orders that are complete buy the.`,
    15,
    356
  );
  // Define the name of our PDF file.
  doc.save(`profile_.pdf`);
};

export default generatePDF;
