// Application by Brad Surinak
// Programming Web Applications Spring 2024
// Exercise Journal

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

    //get existing entries
    let exerciseDataList = JSON.parse(localStorage.getItem("exerciseDataList")) || [];
    exerciseDataList.push(exerciseData);
    localStorage.setItem("exerciseDataList", JSON.stringify(exerciseDataList));
    // alert("posted")
}

function clearData(){
    let confirmation = confirm("Are you sure you want to clear all data?")
    if (confirmation) {
    localStorage.clear();
    window.location.href = "journal.html";
    }
}

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

function chooseDate () {
    document.getElementById('date').click();
}

function postData () {
    
    let tableBody = document.querySelector("#saved_ex tbody");
    tableBody.innerHTML = '';

    //retrieve data from local storage
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
        <td><button class="btn btn-danger btn-sm" onclick="removeEx(${index})">Remove</button></td>
        `;
        
        //new row is appended to tableBody, which represents tbody element of table
        tableBody.appendChild(row);
    });
}
