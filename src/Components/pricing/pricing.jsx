import "./Pricing.css";
import EndImage from "../endlogo/endimage";
import Footer from "../footer/footer";
import React, { useEffect, useState } from "react";
import { makePayment } from "./paymentapi";
import { useNavigate } from "react-router-dom";
function Pricing() {
  const [paymentData, setPaymentData] = useState(null);
  const [newStringState, setNewStringState] = useState("");
  const [isSubscribed9, setIsSubscribed9] = useState(
    localStorage.getItem("isSubscribed9") === "true"
  );
  const [isSubscribed24, setIsSubscribed24] = useState(
    localStorage.getItem("isSubscribed24") === "true"
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isSubscribed9", isSubscribed9);
    localStorage.setItem("isSubscribed24", isSubscribed24);
  }, [isSubscribed9, isSubscribed24]);

  async function dataPayment(amount) {
    try {
      const response = await makePayment({ amount });
      console.log("Payment Response:", response);

      setPaymentData(response?.data?.amount?.value);
      const amountValue = response?.data?.amount?.value;
      setNewStringState(amountValue ? String(amountValue) : "");

      const popupContent = `
        <html>
          <head>
            <title>Payment Form</title>
            <!-- Include Bootstrap CSS -->
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"
            />
            <!-- Custom CSS for the "Pay" button -->
            <style>
              .dark-pink-gradient-button {
                background: linear-gradient(to bottom, #ff1493, #c71585);
                color: #fff;
              }
              .dark-pink-gradient-button:hover {
                background: linear-gradient(to bottom, #c71585, #ff1493);
                color: #fff;
              }
            </style>
          </head>
          <body>
            <!-- Create a Bootstrap modal -->
            <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="paymentModalLabel">Payment Form</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <!-- Payment form goes here -->
                    <div class="form-group">
                      <label for="amount">Amount</label>
                      <input type="text" class="form-control" id="amount" value="${amount}" readonly>
                    </div>
                    <div class="form-group">
                      <label for="description">Description</label>
                      <input type="text" class="form-control" id="description" value="${response.description}" placeholder="Description">
                    </div>
                    <div class="form-group">
                      <label for="cardNumber">Card Number</label>
                      <input type="text" class="form-control" id="cardNumber" placeholder="Card Number" required  >
                    </div>
                    <div class="form-group">
                      <label for="expiryDate">Expiry Date</label>
                      <input type="date" class="form-control" id="expiryDate" placeholder="MM/YY" required>
                    </div>
                    <div class="form-group">
                      <label for="cvv">CVV</label>
                      <input type="text" class="form-control" id="cvv" placeholder="CVV" required>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn dark-pink-gradient-button" onclick="processPayment()">Pay</button>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Include Bootstrap JavaScript -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
            <script>
            function processPayment() {
              const cardNumber = document.getElementById("cardNumber").value;
              const expiryDate = document.getElementById("expiryDate").value;
              const cvv = document.getElementById("cvv").value;
          
              // Basic validation
              if (!cardNumber || !expiryDate || !cvv) {
                alert("Please fill out all required fields.");
                return;
              }
          
              // Additional validation logic can be added here, such as checking the card number format, expiry date, etc.
          
              // If validation passes, you can send the payment data to your server for processing
              // Replace this with your actual payment processing logic
          
              // For simplicity, I'm just closing the modal here
              var myModal = new bootstrap.Modal(document.getElementById("paymentModal"));
              myModal.hide();
          
              // Simulate a successful payment (replace this with your actual payment processing logic)
              // After the payment is successful, send a message to the parent window.
              window.opener.postMessage('payment_successful', '*');
            }
          
            // Show the Bootstrap modal when the page loads
            document.addEventListener("DOMContentLoaded", function() {
              var myModal = new bootstrap.Modal(document.getElementById("paymentModal"), {
                backdrop: "static",
                keyboard: false
              });
              myModal.show();
            })
            </script>
          </body>
        </html>
      `;

      const blob = new Blob([popupContent], { type: "text/html" });
      const popupURL = URL.createObjectURL(blob);
      const popupWindow = window.open(
        popupURL,
        "_blank",
        `width=500,height=500,left=${(window.screen.width - 500) / 2},top=${
          (window.screen.height - 500) / 2
        }`
      );

      if (popupWindow) {
        popupWindow.focus();

        window.addEventListener("message", async (event) => {
          if (event.data === "payment_successful") {
            if (amount === 9) {
              setIsSubscribed9(true);
            } else if (amount === 24) {
              setIsSubscribed24(true);
            }

            popupWindow.close();

            navigate("/");

            showNotification("Payment Successful");
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  function showNotification(message) {
    setNotificationMessage(message);
    alert(message);
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-xl-1  col-lg-1  col-md-12 col-sm-12 col-xs-12"></div>
          <div className="col-xl-10 m-auto col-lg-8  col-md-12 col-sm-12 col-xs-12">
            <div className="background-gradient1">
              <p className="main-text main-text133">
                <span className="main-text1">PRI</span>CING PLAN
              </p>
            </div>
            <h2 className="sub-heading1">Buy MagicMyHouse credits</h2>
            <p className="sub-text1">
              You have 10 credits. Join thousands of happy customers. Explore
              more options below.
            </p>
          </div>
          <div className="col-xl-1  col-lg-1  col-md-12 col-sm-12 col-xs-12"></div>
        </div>
        <div className="row mt-5">
          <div className="col-xl-1 col-lg-1  col-md-12 col-sm-12 col-xs-12"></div>
          <div className="col-xl-5 mt-4 col-lg-5  col-md-12 col-sm-12 col-xs-12">
            <div className="">
              <div className="box1">
                <div className="pac">1 Month Package</div>
                <div className="price-heading">$5</div>
                <div className="price-description">
                  Unlimited credits  <br />
                  <span className="colorrr"> For a duration of 1 month</span>
                </div>
                {isSubscribed9 ? (
                  <button
                    className="pay-button"
                    style={{
                      width: "18rem",
                      textAlign: "center",
                      paddingRight: "9rem",
                      paddingLeft: "6rem",
                    }}
                    disabled
                  >
                    Subscribed
                  </button>
                ) : (
                  <button
                    className="pay-button"
                    onClick={() => {
                      dataPayment(9);
                    }}
                  >
                    PAY
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-5  mt-4 col-lg-5  col-md-12 col-sm-12 col-xs-12">
            <div className="">
              <div className="box2">
                <div className="pac">6 Month Package</div>
                <div className="price-heading">$9</div>
                <div className="price-description">
                  Unlimited credits <br />
                  <span className="colorrr"> For a duration of 6 month</span>
                </div>
                {isSubscribed24 ? (
                  <button
                    className="pay-button"
                    style={{
                      width: "18rem",
                      textAlign: "center",
                      paddingRight: "9rem",
                      paddingLeft: "6rem",
                    }}
                    disabled
                  >
                    Subscribed
                  </button>
                ) : (
                  <button
                    className="pay-button"
                    onClick={() => {
                      dataPayment(24);
                    }}
                  >
                    PAY
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-1 col-lg-1  col-md-12 col-sm-12 col-xs-12"></div>
        </div>
        <div className="row mt-5">
          <div className="col-xl-1 col-lg-1  col-md-12 col-sm-12 col-xs-12"></div>
          <div className="col-xl-5 col-lg-5  col-md-12 col-sm-12 col-xs-12">
            <div className="x12">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  style={{
                    justifyContent: "space-between",
                    marginRight: "10px",
                  }}
                  fill="#009EE2"
                  class="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
                Onetime payments
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  style={{
                    justifyContent: "space-between",
                    marginRight: "10px",
                  }}
                  fill="#009EE2"
                  class="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
                Premium support by email
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  style={{
                    justifyContent: "space-between",
                    marginRight: "10px",
                  }}
                  fill="#009EE2"
                  class="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
                Commercial usage of photos
              </p>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5  col-md-12 col-sm-12 col-xs-12">
            <div className="x12">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  style={{
                    justifyContent: "space-between",
                    marginRight: "10px",
                  }}
                  fill="#009EE2"
                  class="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
                Onetime payments
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  style={{
                    justifyContent: "space-between",
                    marginRight: "10px",
                  }}
                  fill="#009EE2"
                  class="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
                Premium support by email
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  style={{
                    justifyContent: "space-between",
                    marginRight: "10px",
                  }}
                  fill="#009EE2"
                  class="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
                Commercial usage of photos
              </p>
            </div>
          </div>

          <div className="col-xl-1 col-lg-1  col-md-12 col-sm-12 col-xs-12"></div>
        </div>
        <div className="row mt-5">
          <div className="col-xl-8 m-auto col-lg-10  col-md-12 col-sm-12 col-xs-12">
            <div className="ok123">
              <p className="main-text" style={{ marginBottom: "0" }}>
                Interested in team or bulk pricing? Email :
                info@magicmyhouse.com or KVK : 08214009
              </p>
            </div>
          </div>
        </div>
        <div className="circle left-top"></div>
        <div className="circle right-top"></div>
      </div>

      <EndImage />
      <Footer />
    </div>
  );
}
export default Pricing;
