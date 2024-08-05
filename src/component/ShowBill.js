import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import numToWords from "number-to-words";
const ShowBill = () => {
  const [prod, setBill] = useState();
  const { bid } = useParams();
  if (prod) {
    var Products = prod?.products;
    console.log(Products);
    var totalPrice = Products.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
    var cgst = prod?.cgst;
    var sgst = prod?.sgst;
    var igst = prod?.igst;
    var totalGST = Number(cgst) + Number(sgst) + Number(igst);
    var gstAmount = (totalPrice * totalGST) / 100;
  }

  const getBill = async () => {
    try {
      const { data } = await axios.post(
        "https://billing-application-mern.onrender.com/api/v1/product/get-bill",
        { bid: bid }
      );
      if (data) {
        setBill(data[0]);
      }
    } catch (error) {
      console.log("Error while get bill");
    }
  };

  useEffect(() => {
    getBill();
  }, []);
  return (
    <div>
      {prod ? (
        <>
          <div className="invoice-container">
            <header className="invoice-header">
              <p>
                <strong>GSTIN:</strong> 09BRSPT9478H1ZI
              </p>
              <h1>BHARAT AVIONICS</h1>
              <p>Sidhiyawan, Jagdishpur - Amethi (U.P.)</p>
              <p>
                Supplier of All types Aviation Spares for refueling, equipment
                and servicing of all component refueling equipments.
              </p>
              <p>Email: bharatavionics1@gmail.com</p>
            </header>

            <section className="invoice-info">
              <div className="info-left">
                <p>
                  <strong>Bill No:</strong>
                  {prod?.sNo}
                </p>
                <p>
                  <strong>
                    Date of Issue:
                    <span style={{ color: "gray" }}>
                      {JSON.stringify(new Date(prod?.date).toDateString())}
                    </span>
                  </strong>
                </p>
                <hr />
                <p>
                  <strong>Details of Receiver / Billed to:</strong>
                </p>
                <hr />
                <p style={{ fontWeight: "bold" }}>
                  Name:
                  <span style={{ color: "gray" }}>{prod?.name}</span>
                </p>
                <p style={{ fontWeight: "bold" }}>
                  Address:
                  <span style={{ color: "gray" }}>{prod?.address}</span>
                </p>
                <p style={{ fontWeight: "bold" }}>
                  GST No:
                  <span style={{ color: "gray" }}>{prod?.phone}</span>
                </p>
                <p style={{ fontWeight: "bold" }}>
                  State Code:
                  <span style={{ color: "gray" }}>{prod?.stateCode}</span>
                </p>
                {/* <p>GSTIN/UIN: </p>
        <p>State: </p> */}
              </div>
              <div className="info-right">
                <p>
                  <strong>State:</strong> Uttar Pradesh
                </p>
                <p>
                  <strong>State Code:</strong> 09
                </p>
                <hr />
                <p>
                  <strong>Details of Consignee/Shipped to:</strong>
                </p>
                <hr />
                <p style={{ fontWeight: "bold" }}>
                  Name:
                  <span style={{ color: "gray" }}>{prod?.name}</span>
                </p>
                <p style={{ fontWeight: "bold" }}>
                  Address:
                  <span style={{ color: "gray" }}>{prod?.address}</span>
                </p>
                <p style={{ fontWeight: "bold" }}>
                  GST No:
                  <span style={{ color: "gray" }}>{prod?.phone}</span>
                </p>
                <p style={{ fontWeight: "bold" }}>
                  State Code:
                  <span style={{ color: "gray" }}>{prod?.stateCode}</span>
                </p>
                {/* <p>GSTIN/UIN: </p>
        <p>State: </p> */}
              </div>
            </section>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Description of Product / Service</th>
                  <th>HSN ACS</th>
                  <th>Qty.</th>
                  <th>Rate</th>
                  <th>Amount Rs.</th>
                  <th>Amount Ps.</th>
                </tr>
              </thead>
              <tbody>
                {Products?.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.prodName}</td>
                      <td>{p.hsnCode}</td>
                      <td>{p.qty}</td>
                      <td>{p.price}</td>
                      <td>{p.price * p.qty}</td>
                      <td>.00</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <footer className="invoice-footer">
              <div className="footer-left">
                <p>
                  <strong>
                    Total Amount in words:
                    <br />
                    <span style={{ color: "gray" }}>
                      {numToWords.toWords(totalPrice + gstAmount).toUpperCase()}
                    </span>
                  </strong>
                </p>
              </div>
              <div className="footer-right">
                <p>
                  <strong>Total Amount: {totalPrice}</strong>
                </p>
                <p>Add.: C.G.S.T = {cgst}%</p>
                <p>Add.: S.G.S.T = {sgst}%</p>
                <p>Add.: I.G.S.T = {igst}%</p>
                <p>Total GST Amuont:{gstAmount} </p>
                <p>Cartridge</p>
                <p>
                  <strong>
                    Total Amount After Tax: {totalPrice + gstAmount}
                  </strong>
                </p>
              </div>
            </footer>

            <div className="invoice-terms">
              <p>
                <strong>Terms & Conditions:</strong>
              </p>
              <p>(Common Seal)</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <p>
                  Certified that the particulars given above are true and
                  correct
                </p>
                <p>
                  For <strong>BHARAT AVIONICS</strong>
                </p>
                <p className="signature"></p>
                <p>Authorised Signatory</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ShowBill;
