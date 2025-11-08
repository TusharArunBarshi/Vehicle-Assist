import { db } from "./firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const tableBody = document.querySelector(".table_row");

// Function to load bookings from Firestore
const loadBookings = async () => {
  try {
    tableBody.innerHTML = ""; // Clear table before loading data

    const querySnapshot = await getDocs(collection(db, "vehicle_bookings"));

    querySnapshot.forEach((doc) => {
      const booking = doc.data();
      insertBookingRow(booking, doc.id);
    });
  } catch (error) {
    console.error("Error loading bookings: ", error);
  }
};

// Function to insert booking data into the table
const insertBookingRow = (booking, id) => {
  let row = tableBody.insertRow();

  row.insertCell(0).textContent = booking.name;
  row.insertCell(1).textContent = booking.vehicle;
  row.insertCell(2).textContent = booking.city;
  row.insertCell(3).textContent = booking.mobile;
  row.insertCell(4).textContent = new Date(
    booking.timestamp?.toDate()
  ).toLocaleString();

  // Add a delete button
  let actionsCell = row.insertCell(5);
  actionsCell.innerHTML = `<button class="btn btn-danger delete-btn" data-id="${id}">Delete</button>`;

  // Attach delete event listener
  row
    .querySelector(".delete-btn")
    .addEventListener("click", () => deleteBooking(id, row));
};

// Function to delete a booking
const deleteBooking = async (id, row) => {
  if (confirm("Are you sure you want to delete this booking?")) {
    try {
      await deleteDoc(doc(db, "vehicle_bookings", id));
      row.remove();
      alert("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking: ", error);
      alert("Failed to delete booking.");
    }
  }
};

// Load bookings when the page is ready
document.addEventListener("DOMContentLoaded", loadBookings);
