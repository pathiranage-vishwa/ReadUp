import React, { useEffect, useState } from "react";
import generatePDF from "./Report";
import axios from "axios";

const GetReport = () => {

    //Generate Report
   
  
    const[profile,setprofile] = useState([]);
  

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/user/allUsers");
        setprofile(res.data.existingUsers);
      } catch (err) {
        console.log("error");
      }
    };
    getAllUsers();
  }, []);

  
//   return (
//     <div>
//       <div className="container mb-4 mt-4 p-3">
//         <br/><br/><br/><br/><br/><br/><br/><br/>
//         <div className="row">
         
//             <button
//               className="btn btn-primary"
//               onClick={() => generatePDF(profile)}
//             >
//               Generate monthly report
//             </button>
          
//         </div>
//       </div>
     
//     </div>
//   );
return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 logimage"></div>
        <div className="col-md-8 col-lg-5">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="log-heading mb-4">Generate User Report</h3>
                    <div className="d-grid">
                      <button
                        className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-2"
                        onClick={() => generatePDF(profile)}
                        style={{ height: "50px" }}
                      >
                        Sign in
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetReport;