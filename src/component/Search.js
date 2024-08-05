import React, { useRef, useState } from "react";
import axios from "axios";
import BillPage from "./BillPage";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Search = () => {
  const [phone, setNumber] = useState();
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    navigate("/");
  };

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
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="left">
            <h2>Admin</h2>
            <div className="nav">
              <ul className="list">
                <div className="list-item">
                  <Link to={"/add-product"}>
                    <li>Generate Bill</li>
                  </Link>
                </div>
                <div className="list-item">
                  <Link to={"/all-bills"}>
                    <li>All Bills</li>
                  </Link>
                </div>
                <div className="list-item">
                  <Link to={"/search"}>
                    <li>Search Bill</li>
                  </Link>
                </div>
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="dashboard-header">
              <h2>Admin Dashboard</h2>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
            <div className="search-con">
              <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Search Bill By GST No
              </h3>
              {products?.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    padding: "0px 30px",
                  }}
                >
                  <h5>{products?.length} record found</h5>
                  <button className="search-btn" onClick={handlePrint}>
                    Print
                  </button>
                </div>
              )}
              <div className="search-box">
                <input
                  style={{
                    padding: "5px 4px",
                    outline: "none",
                    fontSize: "15px",
                  }}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
