import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [totalBill, setTotalBill] = useState(0);
  const [totalBills, setTotalBills] = useState();

  let totalPrice = 0;
  let tPrice = 0;
  totalBills?.map((bill) => {
    const prod = bill?.products;
    totalPrice += prod.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
    let cgst = bill?.cgst || "0";
    let sgst = bill?.sgst || "0";
    let igst = bill?.igst || "0";
    let totalGST = Number(cgst) + Number(sgst) + Number(igst);
    totalPrice += (totalPrice * totalGST) / 100;
    tPrice += totalPrice;
    totalPrice = 0;
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    navigate("/");
  };

  //get total bills
  const getTotalBill = async () => {
    try {
      const { data } = await axios.get(
        "https://billing-application-mern.onrender.com/api/v1/product/get-bills"
      );
      if (data) {
        setTotalBill(data.length);
        setTotalBills(data);
      }
    } catch (error) {
      console.log("Error while get total bills");
    }
  };

  useEffect(() => {
    getTotalBill();
  }, []);
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
            <div style={{ padding: "20px" }} className="dashboard-container">
              <div
                className="card"
                style={{ width: "12rem", margin: "20px", height: "100px" }}
              >
                <div className="card-body">
                  <h5 className="card-title ">Total Bills : {totalBill}</h5>
                  {/* <h5 className="card-text">{totalBill}</h5> */}
                </div>
              </div>
              <div
                className="card"
                style={{ width: "12rem", height: "100px", margin: "20px" }}
              >
                <div className="card-body">
                  <h5 className="card-title ">Total Amount : {tPrice}</h5>
                  {/* <h5 className="card-text">{totalBill}</h5> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
