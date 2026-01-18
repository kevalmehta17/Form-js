//assigning all the id to variable
const nameInput = document.getElementById("name");
const cityInput = document.getElementById("city");
const ageInput = document.getElementById("age");
const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("delBtn");
const selectingId = document.getElementById("selectId");
const selectingField = document.getElementById("selectField");
const showUnique = document.getElementById("selectUnique")
const filterBtn = document.getElementById("filterBtn");
const allBtn = document.getElementById("allBtn");
const tableSelect = document.getElementById("recordsTable");

// Array of Object that contains the data 
let storeData = [];


// user form
function saveUserDetail() {
    let userName = nameInput.value;
    let cityName = cityInput.value;
    let ageData = Number(ageInput.value);

    if (userName.trim() === "" || cityName.trim() === "" || ageData <= 0 ) {
        alert("Enter the Each field");
        return;
    }
    // console.log(userName, cityName, ageData);
    storeData.push({
        id: Date.now(),
        userName,
        cityName,
        ageData
    })
    console.log(storeData);
    appendData(storeData);
    appendId();
    selectField();
    resetFilters();
    clearInputFields();
}


function clearInputFields() {
    nameInput.value = "";
    cityInput.value = "";
    ageInput.value = "";
}

function appendData(showData) {
    tableSelect.innerHTML = `
    <tr>
    <th>Name</th>
    <th>City</th>
    <th>Age</th>
    `;
    for (const user of showData) {
        tableSelect.insertAdjacentHTML("beforeend", 
            `<tr>
             <td>${user.userName}</td>
            <td>${user.cityName}</td>
            <td>${user.ageData}</td>
            </tr>
            `
        )
    }
}

function appendId() {
    selectingId.innerHTML = `<option value="">Select ID</option>`;
    for (const user of storeData) {
        selectingId.insertAdjacentHTML("beforeend",
            `<option value="${user.id}"> ${user.id} </option>`
        )
    }
}

function selectOptionId() {
    console.log(selectingId.value);
    if (selectingId.value == "") return;
    const test = storeData.find((data) => data.id == selectingId.value);
    nameInput.value = test.userName;
    cityInput.value = test.cityName;
    ageInput.value = test.ageData;
    console.log(test.userName);
    saveBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";   

}

function updateData() {
    const findData = storeData.find((data) => data.id == selectingId.value);
    console.log(findData);
    if (!findData) return;
    findData.userName = nameInput.value;
    findData.cityName = cityInput.value;
    findData.ageData = Number(ageInput.value);
    clearInputFields();
    appendData(storeData);
    resetFilters();
    // appendId();
    selectingId.value = "";
    saveBtn.style.display = "block";
    updateBtn.style.display = "none";
    deleteBtn.style.display = "none"; 
}

function deleteData() {
    const newData = storeData.filter((data) => data.id != selectingId.value);
    storeData = [...newData];
    console.log(storeData);
    clearInputFields();
    appendData(storeData);
    selectField();
    resetFilters();
    appendId();
    selectingId.value = "";
    showUnique.innerHTML = `<option>Select Value</option>`; 
    saveBtn.style.display = "block";
    updateBtn.style.display = "none";
    deleteBtn.style.display = "none";
}

// Filter Section

function selectField() {
    selectingField.innerHTML = `<option value="">Select Field</option>`;
    if (storeData.length === 0) {
        return;
    }
    const key = Object.keys(storeData[0]);
    console.log("keys",key);
    for (const x of key) {
        console.log(x);
        if (x != "id") {
            selectingField.insertAdjacentHTML("beforeend",
                `<option value="${x}"> ${x} </option>`
            )
        }
    }
    // showUniqueValue();
    // for (const user of storeData) {
    //     for (x in user) {
    //         console.log(x);
    //         if (x != "id") {   
    //             selectingField.insertAdjacentHTML("beforeend",
    //                 `<option value="${x}">${x}</option>`
    //             )
    //         }
    //     }
    //     break;
    // }
}

function showUniqueValue() {
    let getValue = selectingField.value;
    console.log("value", getValue);
    const data = storeData.map((temp) => temp[getValue]);
    const unique = new Set(data);
    console.log(unique);
    showUnique.innerHTML = `<option value="">Select Value</option>`
    for (const newData of unique) {
        console.log("newData", newData);
        showUnique.insertAdjacentHTML("beforeend", 
            `<option value="${newData}">${newData}</option>`
        )
    }
}

function filterData() {
    const getSelectField = selectingField.value;
    const getUniqueValue = showUnique.value;
    if (!getSelectField || !getUniqueValue) {
        alert("Select Field or Select Unique Value to evaluate");
        return;
    }
    console.log("inside filterData", getSelectField);
    console.log("inside filterData value", getUniqueValue);
    
    const showFiltering = storeData.filter((data) => data[getSelectField] == getUniqueValue);
    console.log(showFiltering);
    appendData(showFiltering);
    // selectingField.innerHTML = `<option>Select Field</option>`;
    // showUnique.innerHTML = `<option>Select Unique</option>`;
}

function showAll() {
    appendData(storeData);
    selectField();
    resetFilters();
    // showUnique.innerHTML = `<option>Select Unique</option>`;
    console.log("Showing ALL Data inside from showAll function");
}

function resetFilters() {
    selectingField.value = "";
    showUnique.innerHTML = `<option value="">Select Value</option>`;
}

saveBtn.addEventListener("click", saveUserDetail);
selectingId.addEventListener("change", selectOptionId);
updateBtn.addEventListener("click", updateData);
deleteBtn.addEventListener("click", deleteData);
selectingField.addEventListener("change", showUniqueValue);
filterBtn.addEventListener("click", filterData);
allBtn.addEventListener("click", showAll);

// function appendDataInTable() {
//     tableSelect.innerHTML = `
//     <tr>
//     <th>Name</th>
//     <th>City</th>
//     <th>Age</th>
//     </tr>
//     `
//     for (const user of storeData) {
//         tableSelect.insertAdjacentHTML("beforeend",
//             `<tr>
//             <td>${user.userName}</td>
//             <td>${user.cityName}</td>
//             <td>${user.ageData}</td>
//             </tr>`
//         )
//     }
    // tableSelect.innerHTML = `
    // <tr>
    // <th>Name</th>
    // <th>City</th>
    // <th>Age</th>
    // </tr>
    // `
    // for (const user of storeData) {
    //     const rowC = document.createElement("tr");

    //     const nameTd = document.createElement("td");
    //     nameTd.textContent = user.userName;
    //     const cityTd = document.createElement("td");
    //     cityTd.textContent = user.cityName;
    //     const ageTd = document.createElement("td");
    //     ageTd.textContent = user.ageData;

    //     rowC.append(nameTd, cityTd, ageTd);
    //     tableSelect.appendChild(rowC);
    // }
    
//   for (const user of storeData) {
//     let rowHTML = "<tr>";

//     for (const key in user) {
//       if (key !== "id") {
//         rowHTML += `<td>${user[key]}</td>`;
//       }
//     }

//     rowHTML += "</tr>";

//     tableSelect.insertAdjacentHTML("beforeend", rowHTML);
//   }
//   for (const user of storeData) {
//     let rowHTML = "<tr>";

//     for (const key in user) {
//       if (key !== "id") {
//         rowHTML += `<td>${user[key]}</td>`;
//       }
//     }

//     rowHTML += "</tr>";

//     tableSelect.insertAdjacentHTML("beforeend", rowHTML);
//   }
// }