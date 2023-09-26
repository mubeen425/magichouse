import axios from "axios";

export async function makePayment(data) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(
      "http://localhost:5000/api/subscription/payment",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
}
