import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';  // CORS package to allow cross-origin requests

const app = express();
app.use(bodyParser.json()); //middleware to contains json data
app.use(cors()); // Enable CORS for all routes


// MySQL Database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'volunteer_management'
});

connection.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit if unable to connect to the database
    }
    console.log('Connected to the MySQL database.');
});



// POST: Add a new shift
app.post('/api/add-shift', (request, response) => {
    try {
        const data = request.body; //extract the data , json format

        // Prepare the query to insert a new shift
        const insertQuery = `
            INSERT INTO shifts (shift_date, time, location, type, spots_available) 
            VALUES ('${data.shift_date}', '${data.time}', '${data.location}', '${data.type}', ${data.spots_available})
        `;

        connection.query(insertQuery, (error, result) => {
            if (error) {
                console.error('Error inserting shift:', error);  // Log the error for debugging
                return response.status(500).send({ message: "Something went wrong while adding the shift" });
            } else {
                response.status(201).send({ message: "New shift added successfully." });
            }
        });
    } catch (error) {
        console.error('Error in the POST request:', error);  // Log the error for debugging
        response.status(500).send({ message: "Something went wrong" });
    }
});


// GET: Fetch all shifts or filter by type
// GET: Fetch all shifts or filter by type
app.get('/api/shifts', (req, res) => {
    connection.query('SELECT * FROM shifts', (err, results) => {
        if (err) {
            console.error('Error fetching shifts:', err);
            res.status(500).send('Error fetching shifts');
            return;
        }
        res.json(results);
    });
});





// PUT: Update a shift by ID
app.put('/api/update-shift/:id', (req, res) => {
    const { id } = req.params;
    const { shift_date, time, location, type, spots_available } = req.body;
    const query = 'UPDATE shifts SET shift_date = ?, time = ?, location = ?, type = ?, spots_available = ? WHERE id = ?';
    connection.query(query, [id, shift_date, time, location, type, spots_available], (err, result) => {
        if (err) {
            console.error('Error updating shift:', err);
            res.status(500).send('Error updating shift');
            return;
        }
        res.send('Shift updated successfully.');
    });
});



// DELETE: Remove a shift by ID
app.delete('/api/delete-shift/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM shifts WHERE id = ?'; // Query to delete shift by ID
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting shift:', err);
            res.status(500).send('Error deleting shift');
            return;
        }
        res.send('Shift deleted successfully.'); // Send success message if deletion is successful
    });
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});
