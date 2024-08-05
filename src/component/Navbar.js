import Invoice from "./Invoice";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Modal from "./AddCustomer";
import AddProduct from "./AddProduct";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();

  // save bill
  const Products = useSelector((state) => state.product.product);
  const CustomerDetail = useSelector((state) => state.customer.customer);
  const savebill = async () => {
    if (Products.length === 0 && !CustomerDetail) {
      return alert("please provide customer details");
    }
    try {
      const { data } = await axios.post(
        "https://billing-application-mern.onrender.com/api/v1/product/save-product",
        {
          name: CustomerDetail?.name,
          phone: CustomerDetail?.phone,
          address: CustomerDetail?.address,
          products: Products,
          sNo: CustomerDetail?.sNo,
          stateCode: CustomerDetail?.stateCode,
          cgst: CustomerDetail?.cgst,
          sgst: CustomerDetail?.sgst,
          igst: CustomerDetail?.igst,
        }
      );
      console.log(data.message);
      if (data?.success) {
        return alert("product saved successfully");
      }
      alert(data?.message);
    } catch (error) {
      alert("Please add product and custmer detail");
    }
  };

  //handle reset
  const resetPage = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <div id="body">
        <div className="navbar-box">
          <NavLink style={{ paddingLeft: "10px" }} to={"/admin-dashboard"}>
            Dashboard
          </NavLink>
          <h1 style={{ marginLeft: "25rem" }} className="headi">
            CREATE YOUR BILL
          </h1>
          {/* <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Cumtomer detail
          </button>
          <AddProduct />
          <button onClick={handlePrint} className="btn btn-primary">
            Print Bill
          </button>
          <button onClick={savebill} className="btn btn-primary">
            Save Bill
          </button>
          <button onClick={resetPage} className="btn btn-primary">
            Reset
          </button>
          <NavLink to={"/search"}>
            <button className="btn btn-primary">Search Bill</button>
          </NavLink> */}
        </div>
        <div className="btn-section">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Cumtomer detail
          </button>
          <AddProduct />
          <button onClick={handlePrint} className="btn btn-primary">
            Print Bill
          </button>
          <button onClick={savebill} className="btn btn-primary">
            Save Bill
          </button>
          <button onClick={resetPage} className="btn btn-primary">
            Reset
          </button>
          <NavLink to={"/search"}>
            <button className="btn btn-primary">Search Bill</button>
          </NavLink>
        </div>
        <div className="container">
          <div ref={componentRef} id="content" className="right">
            <Modal />
            <Invoice />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
