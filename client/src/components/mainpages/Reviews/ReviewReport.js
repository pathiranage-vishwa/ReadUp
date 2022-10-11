import jsPDF from "jspdf";
import "jspdf-autotable";


// define a generatePDF function that accepts a tickets argument
const generatePDF = review => {

    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = ["Rate", "Review", "Date"];
    // define an empty array of rows
    const tableRows = [];


    review.forEach(data => {
        const reviewData = [
            data.rate,
            data.date,
            data.CommentReview,

        ];

        tableRows.push(reviewData);
        console.log(reviewData);
    });


    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });

    doc.text("Total Reviews and Rates", 14, 15);
    // we define the name of our PDF file.
    doc.save(`Reviews_.pdf`);
};

export default generatePDF;