import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/ProductSlice";
import uniqueid from "uniqid";

const AddProduct = () => {
  const [ProductName, setProductName] = useState("");
  const [Price, setPrice] = useState("");
  const [Qty, setQty] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const dispatch = useDispatch();

  //add product
  const uid = uniqueid();
  const AddProducts = () => {
    dispatch(
      addToCart({
        prodName: ProductName,
        price: Price,
        qty: Qty,
        id: uid,
        hsnCode: hsnCode,
      })
    );
    setProductName("");
    setPrice("");
    setQty("");
    setHsnCode("");
    alert("product added add more..");
  };

  return (
    <>
      <div>
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  Product detail
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* Show a second modal and hide this one with the button below. */}
                <div className="product-detail">
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="product">
                      Product Name
                    </label>
                    <br />
                    <input
                      id="product"
                      type="text"
                      placeholder="Product Name"
                      value={ProductName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="price">
                      Price
                    </label>
                    <br />
                    <input
                      id="price"
                      type="text"
                      placeholder="Price"
                      value={Price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="input-item">
                    <label style={{ fontWeight: "bold" }} htmlFor="qty">
                      QTY
                    </label>
                    <br />
                    <input
                      id="qty"
                      type="phone"
                      placeholder="Qty"
                      value={Qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="input-item">
                      <label style={{ fontWeight: "bold" }} htmlFor="qty">
                        HSN ACS
                      </label>
                      <br />
                      <input
                        id="HSN-ACS"
                        type="text"
                        placeholder="HSN ACS"
                        value={hsnCode}
                        onChange={(e) => setHsnCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={AddProducts} className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>

        <a
          className="btn btn-primary"
          data-bs-toggle="modal"
          href="#exampleModalToggle"
          role="button"
        >
          Add Product
        </a>
      </div>
    </>
  );
};

export default AddProduct;
