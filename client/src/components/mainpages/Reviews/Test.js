import React from "react";

export default function Test() {
  const [bookDetail, setBookDetail] = React.useState([]);
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    const bookDetails = JSON.parse(localStorage.getItem("bookDetails"));
    setBookDetail(bookDetails);
    const bookImage = JSON.parse(localStorage.getItem("bookImage"));
    setImage(bookImage);
  }, []);

  console.log(image);

  return (
    <div>
      <div className="detail">
        <img src={image} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{bookDetail.title}</h2>
            <h6> {bookDetail.content}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
