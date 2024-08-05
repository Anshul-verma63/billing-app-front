import React, { useRef, useState } from "react";
import axios from "axios";
import BillPage from "./BillPage";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const SearchBill = () => {
  const [phone, setNumber] = useState();
  const [products, setProducts] = useState();

  // print bill
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //search
  const handleSearch = async () => {
    try {
      const { data } = await axios.post(
        "https://billing-application-mern.onrender.com/api/v1/product/search",
        { phone }
      );
      if (data.length === 0) {
        return alert("No data found");
      }
      setProducts(data);
    } catch (error) {
      console.log("Error while search product");
    }
  };

  return (
    <>
      <Link style={{ marginLeft: "10px" }} to={"/admin-dashboard"}>
        Dashboard
      </Link>

      <div className="search-container">
        <h1>Search Bill GST No</h1>
        {products?.length > 0 && (
          <>
            <h5>{products?.length} record found</h5>
            <button className="search-btn" onClick={handlePrint}>
              Print
            </button>
          </>
        )}
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter GST number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="section">
        <div className="bill-page" ref={componentRef}>
          {products?.map((prod, i) => {
            return (
              <div style={{ margin: "10px" }}>
                <BillPage key={i} prod={prod} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchBill;
