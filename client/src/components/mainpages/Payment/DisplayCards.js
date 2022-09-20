import React, { useContext, useState ,useEffect} from "react";
import { GlobalState } from "../../../GlobalState";
import CardItem from "../utils/cardItem/CardItem";
import { useHistory } from "react-router-dom";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import "./displaycard.css";
//import Filters from "./Filters";
// import LoadMore from "./LoadMore";

function DisplayCards() {

  //const history = useHistory();
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;
  
  const [cards, setCards] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  //const [callback, setCallback] = state.cardsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [userId,setUserID] = useState("");
  const [status,setStatus]= useState(0);
  //const handleCheck = (id) => {
  //   cards.forEach((book) => {
  //     if (book._id === id) book.checked = !book.checked;
  //   });
  //   setCards([...cards]);
  // };
  
    //setUserID(user._id);
    const id = user._id;
  async function getDetails(){ 
    

    axios.get(`http://localhost:5000/card/getMyCard/${id}`).then((res)=>{ 

      
      console.log(res.data); 

      
      setCards(res.data)
      
      setStatus(1);
    

     
    }).catch((err)=>{
        alert(err.message);
    })

  }
  if (cards === undefined || cards.length == 0){
    getDetails();
  }     
  
console.log(id);


  const deleteBook = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteBook = axios.delete(`http://localhost:5000/card/delete/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteBook;
      //setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    cards.forEach((book) => {
      book.checked = !isCheck;
    });
    setCards([...cards]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    cards.forEach((book) => {
      if (book.checked) deleteBook(book._id, book.images.public_id);
    });
  };

//   if (loading)
//     return (
//       <div>
//         <Loading />
//       </div>
//     );

console.log(cards);
console.log(user._id);
console.log(status);

  return (
    <>
      {/* <Filters /> */}
{/* 
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )} */}
<center>  
<div style={{marginTop:"2%"}}>   
<h3 className="category-heading mb-6">Save Cards Details</h3>
</div> 
</center>  
  <div className="categoryTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 savecard"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
              
                  <div className="dis_card">
                    {cards.map((card,key) => {
                      return (
                        <div key={key}>
                        <CardItem
                          key={card._id}
                          card={card}
                          deleteBook={deleteBook}
                          // handleCheck={handleCheck}
                        />
                        </div>
                      );
                    })}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div> 
    </div>                   

      {/* <LoadMore />
      {cards.length === 0 && <Loading />} */}
    </>
  );
}

export default DisplayCards;
