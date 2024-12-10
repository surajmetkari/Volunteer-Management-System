



function fetchShifts() {
    fetch("http://localhost:3000/api/shifts")
        .then(response => response.json())
        .then(shifts => {
            const shiftsTableBody = document.getElementById("shifts-table-body");
            shiftsTableBody.innerHTML = ""; // Clear existing table rows

            shifts.forEach(shift => {
                const row = document.createElement("tr");

                // Add the data to the row
                row.innerHTML = `
                <td>${shift.type}</td>
                <td>${shift.shift_date}</td>
                <td>${shift.time}</td>
                <td>${shift.location}</td>
                <td>${shift.spots_available}</td>
                 <td>
                        <!-- Added Delete Button with class, onclick handler, and tooltip -->
                        <button class="btndelete  btn-secondary" 
                                onclick="deleteShift(${shift.id})"
                                title="Delete this shift" 
                                aria-label="Delete Shift">
                             Delete
                        </button>
                    </td>
            `;

                // Append the row to the table body
                shiftsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching shifts:', error);
            alert("Something went wrong while fetching the shifts.");
        });
}





// Function to delete a shift by ID
function deleteShift(shiftId) {
    if (confirm("Are you sure you want to delete this shift?")) {
        fetch(`http://localhost:3000/api/delete-shift/${shiftId}`, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(message => {
                alert(message); // Show success message from backend
                fetchShifts(); // Refresh the shift list after deletion
            })
            .catch(error => {
                console.error('Error deleting shift:', error);
                alert("Something went wrong while deleting the shift.");
            });

    }
}





// Fetch and display shifts when the page loads
document.addEventListener("DOMContentLoaded", fetchShifts);
