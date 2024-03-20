// Application by Brad Surinak
// Programming Web Applications Spring 2024
// Exercise Journal

// the pullData function takes user input data on new_entry.html and saves to local storage 
// this function is called when the user clicks the Post button
function pullData () {
    ls_date = document.getElementById("date").value;
    ls_exercise = document.getElementById("exercise").value;
    ls_weight = document.getElementById("weight").value;
    ls_sets = document.getElementById("sets").value;
    ls_reps = document.getElementById("reps").value;

    let exerciseData = {
        date: ls_date,
        exercise: ls_exercise,
        weight: ls_weight,
        sets: ls_sets,
        reps: ls_reps
    };

    //get existing entries, convert to object, push to exerciseData variable, set to local storage as string
    let exerciseDataList = JSON.parse(localStorage.getItem("exerciseDataList")) || [];
    exerciseDataList.push(exerciseData);
    localStorage.setItem("exerciseDataList", JSON.stringify(exerciseDataList));
    // alert("posted")
}

// the clearData function clears all journal entries 
function clearData(){
    let confirmation = confirm("Are you sure you want to clear all data?")
    if (confirmation) {
    localStorage.clear();
    window.location.href = "archive.html";
    }
}

// the removeEx function allows the user to delete a single entry on their journal page, without deleting all
//postData function is called at the end to update the table
function removeEx(index) {
    let exerciseDataList = JSON.parse(localStorage.getItem("exerciseDataList")) || [];

    let confirmation = confirm("Are you sure you want to clear this row?")
    if (confirmation) {
        // Remove the entry corresponding to the given index from the array
        exerciseDataList.splice(index, 1);

        // Update local storage with the modified array
        localStorage.setItem("exerciseDataList", JSON.stringify(exerciseDataList));

        // Run postData function to update the table 
        postData();
    }
}

// the chooseDate function is from bootstrap and displays the date choosen from the embedded calendar icon
function chooseDate () {
    document.getElementById('date').click();
}

//the postData function pulls the data from local storage and adds it to the table on journal.html
// a button to call removeEx is included in the table
function postData () {
    
    let tableBody = document.querySelector("#saved_ex tbody");
    tableBody.innerHTML = '';

    //retrieve data from local storage, empty brackets ensure that blank fields are included 
    let exerciseDataList = JSON.parse(localStorage.getItem("exerciseDataList")) || [];
    
    //loop to iterate over each element in exerciseDataList
    exerciseDataList.forEach(function(exerciseData, index) {

        // new <tr> is created for each exercise element, innerHTML of row set to include <td>
        let row = document.createElement("tr");

        row.innerHTML = `
        <td>${exerciseData.date}</td>
        <td>${exerciseData.exercise}</td>
        <td>${exerciseData.weight}</td>
        <td>${exerciseData.sets}</td>
        <td>${exerciseData.reps}</td>
        <td><button class="btn btn-info btn-sm" onclick="archiveData(${index})">Archive</button></td>
        <td><button class="btn btn-danger btn-sm" onclick="removeEx(${index})">Remove</button></td>
        `;
        
        //new row is appended to tableBody, which represents tbody element of table
        tableBody.appendChild(row);
    });
}


// the archiveData function is called when the archive button is clicked on a row
// the data on that row is removed from the table and added to archivedEntry
function archiveData(index) {
    let tableBody = document.querySelector("#saved_ex tbody");
    let row = tableBody.children[index];

    let arc_date = row.cells[0].innerText;
    let arc_exercise = row.cells[1].innerText;
    let arc_weight = row.cells[2].innerText;
    let arc_sets = row.cells[3].innerText;
    let arc_reps = row.cells[4].innerText;
    
    let archivedEntry = {
        date: arc_date,
        exercise: arc_exercise,
        weight: arc_weight,
        sets: arc_sets,
        reps: arc_reps
    };

    let archivedEntryList = JSON.parse(localStorage.getItem("archivedEntryList")) || [];
    archivedEntryList.push(archivedEntry);
    localStorage.setItem("archivedEntryList", JSON.stringify(archivedEntryList));

    // removes from exerciseDataList
    let exerciseDataList = JSON.parse(localStorage.getItem("exerciseDataList")) || [];
    exerciseDataList.splice(index, 1);
    localStorage.setItem("exerciseDataList", JSON.stringify(exerciseDataList));

    postData();
}

function postArchive() {
    let tableBody = document.querySelector("#archived_ex tbody");
    tableBody.innerHTML = '';

    //retrieve data from local storage
    let archivedEntryList = JSON.parse(localStorage.getItem("archivedEntryList")) || [];
    
    //loop to iterate over each element in exerciseDataList
    archivedEntryList.forEach(function(archivedData, index) {

        // new <tr> is created for each exercise element, innerHTML of row set to include <td>
        let row = document.createElement("tr");

        row.innerHTML = `
        <td>${archivedData.date}</td>
        <td>${archivedData.exercise}</td>
        <td>${archivedData.weight}</td>
        <td>${archivedData.sets}</td>
        <td>${archivedData.reps}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeEx(${index})">Remove</button></td>
        `;
        
        //new row is appended to tableBody, which represents tbody element of table
        tableBody.appendChild(row);
    });
}