import jsPDF from "jspdf";
import "jspdf-autotable";


//import { format } from "date-fns";


// define a generatePDF function that accepts a tickets argument
const generatePDF = profile => {
 
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["FullName", "Email", "UserName"];
  // define an empty array of rows
  const tableRows = [];

  
  profile.forEach(profile => {
    const profileData = [
      profile.firstName + " " + data.lastName,
      profile.email,
      profile.username,
      // called date-fns to format the date on the profile
     // format(new Date(profile.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(profileData);
    console.log(profileData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  //const date = Date().split(" ");
  // we use a date string to generate our filename.
 // const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Closed profile within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`profile_.pdf`);
};

export default generatePDF;