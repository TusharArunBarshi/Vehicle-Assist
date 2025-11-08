import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

async function submitTestDrive() {
  console.log("log");

  const name = document.getElementById("user-name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const vehicle = document.getElementById("test-vehicle").value;
  const city = document.getElementById("city").value;

  // Basic Validation
  if (!name || !mobile || !vehicle || !city) {
    alert("Please fill in all fields.");
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  try {
    // Save data to Firestore
    await addDoc(collection(db, "vehicle_bookings"), {
      name,
      mobile,
      vehicle,
      city,
      timestamp: serverTimestamp(),
    });

    // Show Success Popup
    showSuccessPopup("Test Drive Booked Successfully!");

    // Clear form fields
    document.getElementById("user-name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("test-vehicle").value = "honda-city";
    document.getElementById("city").value = "Bhiwandi";
  } catch (error) {
    console.error("Error booking test drive:", error);
    alert("Failed to book test drive. Please try again.");
  }
}

// Function to show a success popup
function showSuccessPopup(message) {
  const popup = document.createElement("div");
  popup.innerHTML = `<div style="
    position: fixed; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    background: #28a745;
    color: white; 
    padding: 15px 25px;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    z-index: 1000;
  ">${message}</div>`;

  document.body.appendChild(popup);

  // Remove Popup after 3 seconds
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Attach event listener to button
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("book-drive-btn")
    .addEventListener("click", submitTestDrive);
});
