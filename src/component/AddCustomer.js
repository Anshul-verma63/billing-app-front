import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../redux/slices/CustomerSlice";
import axios from "axios";

const Modal = () => {
  const [CusName, setCusName] = useState();
  const [CusAddress, setCusAddress] = useState();
  const [CusPhone, setCusPhone] = useState();
  const [billNo, setBillNo] = useState();
  const [stateCode, setStateCode] = useState();
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [igst, setIgst] = useState("");
  const dispatch = useDispatch();

  //add customer
  // const billNo = Math.floor(Math.random() * 1000);

  const handleCustomer = () => {
    dispatch(
      addCustomer({
        name: CusName,
        phone: CusPhone,
        address: CusAddress,
        stateCode: stateCode,
        sNo: billNo,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
      })
    );
  };
  //get total bill
  const getTotalBill = async () => {
    try {
      const { data } = await axios.get(
        "https://billing-application-mern.onrender.com/api/v1/product/get-length"
      );
      setBillNo(data + 1);
    } catch (error) {
      console.log("Error while get total bills");
    }
  };
  useEffect(() => {
    getTotalBill();
  });
  return (
    <>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Customer detail
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body customer-body">
                {/* Cumtomr detail  */}
                <div className="customer-detail">
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="phone">
                      GST NO.
                    </label>
                    <br />
                    <input
                      id="phone"
                      type="phone"
                      placeholder="Enter GST No"
                      onChange={(e) => setCusPhone(e.target.value)}
                    />
                  </div>
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="name">
                      Cus Name
                    </label>
                    <br />
                    <input
                      id="name"
                      type="text"
                      placeholder="Customer Name"
                      onChange={(e) => setCusName(e.target.value)}
                    />
                  </div>
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="address">
                      Address
                    </label>
                    <br />
                    <input
                      id="address"
                      type="text"
                      placeholder="Address"
                      onChange={(e) => setCusAddress(e.target.value)}
                    />
                  </div>
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="address">
                      State Code
                    </label>
                    <br />
                    <input
                      id="state"
                      type="text"
                      placeholder="State Code"
                      onChange={(e) => setStateCode(e.target.value)}
                    />
                  </div>
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="qty">
                      CGST
                    </label>
                    <br />
                    <input
                      id="cgst"
                      type="text"
                      placeholder="CGST in %"
                      value={cgst}
                      onChange={(e) => setCgst(e.target.value)}
                    />
                  </div>
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="qty">
                      SGST
                    </label>
                    <br />
                    <input
                      id="SGST"
                      type="text"
                      placeholder="SGST in %"
                      value={sgst}
                      onChange={(e) => setSgst(e.target.value)}
                    />
                  </div>
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="qty">
                      IGST
                    </label>
                    <br />
                    <input
                      id="IGST"
                      type="text"
                      placeholder="IGST in %"
                      value={igst}
                      onChange={(e) => setIgst(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={handleCustomer}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
