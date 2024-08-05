import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllBills = () => {
  const [bills, setBills] = useState();
  const navigate = useNavigate();

  const getAllBills = async () => {
    try {
      const { data } = await axios.get(
        "https://billing-application-mern.onrender.com/api/v1/product/get-bills"
      );
      setBills(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllBills();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    navigate("/");
  };
  return (
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
          <div style={{ padding: "20px" }} className="bills-container">
            {bills &&
              bills.map((bill) => {
                return (
                  <>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Bill No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Address</th>
                          <th scope="col">GST No</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{bill.sNo}</th>
                          <td>{bill.name}</td>
                          <td>{bill.address}</td>
                          <td>{bill.phone}</td>
                          <td>
                            <Link
                              to={`/show-bill/${bill._id}`}
                              className="btn btn-success"
                            >
                              Show
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBills;
