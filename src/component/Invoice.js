import React from "react";
import "./invoice.css";
import { useDispatch, useSelector } from "react-redux";
import numToWords from "number-to-words";
import { removeProduct } from "../redux/slices/ProductSlice";
import img from "../img/sign.jpg";

const Invoice = () => {
  const Products = useSelector((state) => state.product.product);
  const CustomerDetail = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();
  const totalPrice = Products.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  let cgst = CustomerDetail?.cgst || "0";
  let sgst = CustomerDetail?.sgst || "0";
  let igst = CustomerDetail?.igst || "0";

  // let totalGST = 18;
  let totalGST = Number(cgst) + Number(sgst) + Number(igst);
  let gstAmount = (totalPrice * totalGST) / 100;
  // let totalGST = 0;
  // Products.forEach((prod) => {
  //   cgst += Number(prod.cgst);
  //   sgst += Number(prod.sgst);
  //   igst += Number(prod.igst);
  //   const pric = Number(prod.price) * Number(prod.qty);
  //   const totalgst = Number(prod.cgst) + Number(prod.igst) + Number(prod.sgst);
  //   totalGST += (pric * totalgst) / 100;
  // });
  // const gstAmount = Products.reduce(
  //   (amount, prod) => amount + (prod.price * prod.qty * prod.gst) / 100,
  //   0
  // );
  // const gst = Products.reduce(
  //   (amount, prod) =>
  //     amount + (Number(prod.cgst) + Number(prod.igst) + Number(prod.sgst)),
  //   0
  // );
  // console.log(gst);
  // const gstAmount = (totalPrice * gst) / 100;
  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <p>
          <strong>GSTIN:</strong> 09BRSPT9478H1ZI
        </p>
        <h1>BHARAT AVIONICS</h1>
        <p>Sidhiyawan, Jagdishpur - Amethi (U.P.)</p>
        <p>
          Supplier of All types Aviation Spares for refueling, equipment and
          servicing of all component refueling equipments.
        </p>
        <p>Email: bharatavionics1@gmail.com</p>
      </header>

      <section className="invoice-info">
        <div className="info-left">
          <p>
            <strong>Bill No:</strong>
            {CustomerDetail?.sNo}
          </p>
          <p>
            <strong>
              Date of Issue:
              <span style={{ color: "gray" }}>
                {JSON.stringify(new Date().toDateString())}
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
            <span style={{ color: "gray" }}>{CustomerDetail?.name}</span>
          </p>
          <p style={{ fontWeight: "bold" }}>
            Address:
            <span style={{ color: "gray" }}>{CustomerDetail?.address}</span>
          </p>
          <p style={{ fontWeight: "bold" }}>
            GST No:
            <span style={{ color: "gray" }}>{CustomerDetail?.phone}</span>
          </p>
          <p style={{ fontWeight: "bold" }}>
            State Code:
            <span style={{ color: "gray" }}>{CustomerDetail?.stateCode}</span>
          </p>
          {/* <p>GSTIN/UIN: </p>
           */}
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
            <span style={{ color: "gray" }}>{CustomerDetail?.name}</span>
          </p>

          <p style={{ fontWeight: "bold" }}>
            Address:
            <span style={{ color: "gray" }}>{CustomerDetail?.address}</span>
          </p>

          <p style={{ fontWeight: "bold" }}>
            GST No:
            <span style={{ color: "gray" }}>{CustomerDetail?.phone}</span>
          </p>
          <p style={{ fontWeight: "bold" }}>
            State Code:
            <span style={{ color: "gray" }}>{CustomerDetail?.stateCode}</span>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Products?.map((prod, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{prod.prodName}</td>
                <td>{prod.hsnCode}</td>
                <td>{prod.qty}</td>
                <td>{prod.price}</td>
                <td>{prod.price * prod.qty}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(removeProduct({ id: prod.id }));
                  }}
                >
                  ❌
                </td>
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
            <strong>Total Amount After Tax: {totalPrice + gstAmount}</strong>
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
          <p style={{ margin: "0px", padding: "0px" }}>
            Certified that the particulars given above are true and correct
          </p>
          <p style={{ margin: "0px", padding: "0px" }}>
            For <strong>BHARAT AVIONICS</strong>
          </p>
          <p className="signature"></p>
          <p style={{ margin: "0px", padding: "0px" }}>Authorised Signatory</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
