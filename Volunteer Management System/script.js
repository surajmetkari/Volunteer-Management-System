// Function to send data to the backend API (POST request)
document.getElementById('shift-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from refreshing the page on submit

    // Get form data
    const shiftData = {
        shift_date: document.getElementById('shift_date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        type: document.getElementById('type').value,
        spots_available: document.getElementById('spots_available').value
    };

    // Send data to the backend API (POST request)
    fetch('http://localhost:3000/api/add-shift', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shiftData) // Send data as JSON
    })
        .then(response => response.json())  // Ensure the response is parsed as JSON
        .then(data => {
            if (data.message === "New shift added successfully.") {
                alert('Shift added successfully!'); // Show success message from backend
                document.getElementById('shift-form').reset(); // Clear the form
                fetchShifts(); // Refresh the shift table to show the new data
            } else {
                alert('Failed to add shift: ' + data.message); // Handle failure response
            }
        })

});



