import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebase.js";

let btn = document.querySelector(".btn");
let table = document.querySelector(".table_row");
let selectedRow = null;
let selectedRowId = null;

const loadData = async () => {
  try {
    table.innerHTML = ""; // Clear table before loading
    const querySnapshot = await getDocs(collection(db, "vehicles2"));
    querySnapshot.forEach((doc) => {
      insertData(doc.data(), doc.id);
    });
  } catch (error) {
    console.error("Error loading data: ", error);
  }
};

document.addEventListener("DOMContentLoaded", loadData);

const handleSubmit = async (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let vehicle_type = document.getElementById("vehicle_type").value;
  let vehicle_category = document.getElementById("vehicle_category").value;
  let average = document.getElementById("average").value;
  let brake_type = document.getElementById("brake_type").value;
  let description = document.getElementById("description").value;
  let image = document.getElementById("image").value;

  if (
    !name ||
    !vehicle_type ||
    !vehicle_category ||
    !average ||
    !brake_type ||
    !description ||
    !image
  ) {
    alert("Please fill in all fields");
    return;
  }

  const vehicle = {
    name,
    vehicle_type,
    vehicle_category,
    average,
    brake_type,
    description,
    image,
  };

  if (selectedRow === null) {
    await addData(vehicle);
  } else {
    await updateData(vehicle);
    selectedRow = null;
  }

  clearData();
};

btn.addEventListener("click", handleSubmit);

const addData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "vehicles2"), data);
    insertData(data, docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const insertData = (data, id) => {
  let row = table.insertRow(table.rows.length);
  row.insertCell(0).textContent = data.name;
  row.insertCell(1).textContent = data.vehicle_type;
  row.insertCell(2).textContent = data.vehicle_category;
  row.insertCell(3).textContent = data.average;
  row.insertCell(4).textContent = data.brake_type;
  row.insertCell(5).textContent = data.description;
  row.insertCell(
    6
  ).innerHTML = `<img src="${data.image}" width="100" height="60" />`;

  let actionsCell = row.insertCell(7);
  actionsCell.innerHTML = `
          <button class="btn btn-warning edit-btn">Edit</button>
          <button class="btn btn-danger delete-btn">Delete</button>
      `;

  row
    .querySelector(".edit-btn")
    .addEventListener("click", () => editData(row, id));
  row
    .querySelector(".delete-btn")
    .addEventListener("click", () => deleteData(row, id));
};

const editData = (row, id) => {
  selectedRow = row;
  selectedRowId = id;

  document.getElementById("name").value = row.cells[0].textContent;
  document.getElementById("vehicle_type").value = row.cells[1].textContent;
  document.getElementById("vehicle_category").value = row.cells[2].textContent;
  document.getElementById("average").value = row.cells[3].textContent;
  document.getElementById("brake_type").value = row.cells[4].textContent;
  document.getElementById("description").value = row.cells[5].textContent;
  document.getElementById("image").value =
    row.cells[6].querySelector("img").src;
};

const deleteData = async (row, id) => {
  await deleteDoc(doc(db, "vehicles2", id));
  row.remove();
};

const updateData = async (data) => {
  if (!selectedRowId) return;

  await updateDoc(doc(db, "vehicles2", selectedRowId), data);

  selectedRow.cells[0].textContent = data.name;
  selectedRow.cells[1].textContent = data.vehicle_type;
  selectedRow.cells[2].textContent = data.vehicle_category;
  selectedRow.cells[3].textContent = data.average;
  selectedRow.cells[4].textContent = data.brake_type;
  selectedRow.cells[5].textContent = data.description;
  selectedRow.cells[6].querySelector("img").src = data.image;
};

const clearData = () => document.querySelector("form").reset();
