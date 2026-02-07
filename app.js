const nameInput = document.getElementById("name");
const cityInput = document.getElementById("city");
const ageInput = document.getElementById("age");
const form = document.getElementById("userForm");
const table = document.getElementById("recordsTable");
const selectId = document.getElementById("selectId");
const selectField = document.getElementById("selectField");
const selectUnique = document.getElementById("selectUnique");
const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const filterBtn = document.getElementById("filterBtn");
const allBtn = document.getElementById("allBtn");
const takeInput = document.querySelectorAll("input");

let storeData = [];
let selectedId = null;
let mode = "save";

let activeFilter = {
  field: "",
  value: "",
};

function saveUserDetails(e) {
  e.preventDefault();
  if(!form){
    alert("Not get FormId");
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.userName = data.userName.trim();
  data.cityName = data.cityName.trim();
  data.ageData = Number(data.ageData);
  console.log("data", data);

  if (!data.userName || !data.cityName || data.ageData <= 0) {
    alert("Enter valid input");
    return;
  }

  if (mode === "save") {
    data.id = +new Date();
    storeData.push(data);
  }

  if (mode === "update") {
    const user = storeData.find((u) => u.id === selectedId);
    if (!user) return;
    console.log("User in Upd", user,storeData);
    user.userName = data.userName.trim();
    user.cityName = data.cityName.trim();
    user.ageData = Number(data.ageData);
      console.log("User after Upd", user,storeData);
  }

  resetForm();
  afterDataChange();
}

function selectOptionId() {
  if (!selectId.value || !updateBtn || !deleteBtn) {
    alert("No id selected");
    resetForm();
  }
  selectedId = Number(selectId.value);
  console.log("found selectId", selectId);
  const user = storeData.find((u) => u.id === selectedId);
  if (!user) return;

  nameInput.value = user.userName;
  cityInput.value = user.cityName;
  ageInput.value = Number(user.ageData);

  mode = "update";
  saveBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
  deleteBtn.style.display = "inline-block";
}

function deleteRecord() {
  if (!selectId.value) {
    alert("No id selected");
    resetForm();
  }
  storeData = storeData.filter((u) => u.id !== selectedId);
  console.log("after delete", storeData);
  resetForm();
  afterDataChange();
}

// function fieldAndUnique() {
//   if (!selectField.value) {
//     selectUnique.innerHTML = `<option value="">Select Value</option>`;
//     return;
//   }
//   const field = selectField.value;
//   let uniqueValues;
//   let prevValue;
//   if (!field) return;
//   if (field == "ageData") {
//     prevValue = Number(selectUnique.value);
//   } else {
//     prevValue = selectUnique.value;
//   }
//   console.log("prevValue", typeof prevValue);

//   const values = storeData.map((d) => d[field]);
//   console.log("values", values);
//   if (field == "ageData") {
//     uniqueValues = [...new Set(values)];
//   } else {
//     const newP = [];
//     for (const x of values) {
//       newP.push(x.toLowerCase());
//     }
//     console.log(newP);
//     console.log("values", newP);
//     uniqueValues = [...new Set(newP)];
//   }
//   console.log("uniqueValues", typeof uniqueValues[0]);

//   selectUnique.innerHTML = `<option value="">Select Value</option>`;

//   for (const uni of uniqueValues) {
//     selectUnique.insertAdjacentHTML(
//       "beforeend",
//       `<option value="${uni}">${uni}</option>`,
//     );
//   }

//   if (uniqueValues.includes(prevValue)) {
//     selectUnique.value = prevValue;
//   }
// }

function fieldAndUnique() {
  if (!selectField.value) {
    selectUnique.innerHTML = `<option value="">Select Value</option>`;
    return;
  }
  const field = selectField.value;
  let uniqueValues = [];
  let prevValue;
  if (!field) return;
  if (field == "ageData") {
    prevValue = Number(selectUnique.value);
  } else {
    prevValue = selectUnique.value;
  }
  console.log("prevValue", typeof prevValue);

  // const values = storeData.map((d) => d[field].toLowerCase());
  const values = storeData.map((d) => {
    let y = d[field];
    if(typeof y == "string"){
      y.toLowerCase();
    }
    return y;
    // if(d[field] == "ageData"){
    //    y = d[field]
    //    console.log("age", d[field])
    //   // uniqueValues = [...new Set(d[field])];
    // }else{
    //  y = d[field];
    //  console.log(y);
    //  y.toLowerCase();
    // }
    // return y;
  })
  console.log("values", values);
  uniqueValues = [...new Set(values)];
  console.log("uniqueValues", uniqueValues);
  // if (field == "ageData") {
  //   uniqueValues = [...new Set(values)];
  // } else {
  //   // const newP = [];
  //   for (const x of values) {
  //     let temp = x.toLowerCase();
  //     if(!uniqueValues.includes(temp)){
  //       uniqueValues.push(temp);
  //     }
  //     // newP.push(x.toLowerCase());
  //   }
  //   // console.log(newP);
  //   // console.log("values", newP);
  //   // uniqueValues = [...new Set(newP)];
  // }
  console.log("uniqueValues", typeof uniqueValues[0]);

  selectUnique.innerHTML = `<option value="">Select Value</option>`;

  for (const uni of uniqueValues) {
    selectUnique.insertAdjacentHTML(
      "beforeend",
      `<option value="${uni}">${uni}</option>`,
    );
  }

  if (uniqueValues.includes(prevValue)) {
    selectUnique.value = prevValue;
  }
}

function filterButton() {
  if(!selectField || !selectUnique){
    alert("Not get selectField or selectUnique");
    return;
  }
  const field = selectField.value;
  const value = selectUnique.value;
  if (!field || !value){
    alert("Fill the values");
    return;
  }

  activeFilter.field = field;
  activeFilter.value = value;

  applyActiveFilter();
}

function applyActiveFilter() {
  const { field, value } = activeFilter;

  if (!field || !value) {
    renderTable(storeData);
    return;
  }

  const filtered = storeData.filter(
    (user) => user[field].toLowerCase() == value.toLowerCase(),
  );

  renderTable(filtered);
}

// Validate after data chng
function validateActiveFilter() {
  const { field, value } = activeFilter;
  if (!field || !value) return;

  const existsorNot = storeData.some((user) => user[field] == value);
  console.log("k-existrnt", existsorNot);

  if (!existsorNot) {
    activeFilter.field = "";
    activeFilter.value = "";
    selectField.value = "";
    selectUnique.innerHTML = `<option value="">Select Value</option>`;
  }
}

function afterDataChange() {
  renderSelectId();

  if (selectField.value) {
    fieldAndUnique();
  }

  validateActiveFilter();
  applyActiveFilter();
}

function showAll() {
  if(storeData.length == 0){
    alert("Nothing to show");
    return;
  }
  activeFilter.field = "";
  activeFilter.value = "";
  selectField.value = "";
  selectUnique.innerHTML = `<option value="">Select Value</option>`;
  renderTable(storeData);
}

function renderTable(data) {
  if(!table){
    console.log(table)
    alert("Nothing to show");
    return;
  }
  table.innerHTML = "";
  for (const user of data) {
    table.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td>${user.userName}</td>
        <td>${user.cityName}</td>
        <td>${user.ageData}</td>
      </tr>`,
    );
  }
}

function renderSelectId() {
  if(!selectId){
    alert("Not get Select Id");
    return;
  }
  selectId.innerHTML = `<option value="">Select ID</option>`;
  for (const user of storeData) {
    selectId.insertAdjacentHTML(
      "beforeend",
      `<option value="${user.id}">${user.id}</option>`,
    );
  }
}

function renderSelectField() {
  if(!selectField || !takeInput){
    alert("Not get selectField Id or input");
    return;
  }
  selectField.innerHTML = `<option value="">Select Field</option>`;
  for (const input of takeInput) {
    selectField.insertAdjacentHTML(
      "beforeend",
      `<option value="${input.name}">${input.name}</option>`,
    );
  }
}

renderSelectField();

function resetForm() {
  if(!saveBtn || !updateBtn || !deleteBtn){
    alert("No get save or update or delete button");
    return;
  }
  form.reset();
  mode = "save";
  selectedId = null;
  saveBtn.style.display = "block";
  updateBtn.style.display = "none";
  deleteBtn.style.display = "none";
}

if(!filterBtn || !allBtn){
  alert("Not get Filter or all Button");
}

deleteBtn.addEventListener("click", deleteRecord);
filterBtn.addEventListener("click", filterButton);
allBtn.addEventListener("click", showAll);