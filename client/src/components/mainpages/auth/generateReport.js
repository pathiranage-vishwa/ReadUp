import React, { useEffect, useState } from "react";
import generatePDF from "./Report";
import axios from "axios";

const GetReport = () => {
   
  
    const[profile,setprofile] = useState([]);
  

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8070/user/profiles");
        setprofile(res.data.existingUsers);
      } catch (err) {
        console.log("error");
      }
    };
    getAllUsers();
  }, []);

  
  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
         
            <button
              className="btn btn-primary"
              onClick={() => generatePDF(profile)}
            >
              Generate monthly report
            </button>
          
        </div>
      </div>
     
    </div>
  );
};

export default GetReport;