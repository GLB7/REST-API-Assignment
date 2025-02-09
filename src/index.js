const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// UUID import
const { v4: uuidv4 } = require('uuid');
// Users array (All data stored locally in memory)
let users = [];

// Post request to create a new user.
// Request body must contain name and email. If not, return status code 400 (Bad Request).
// Each user must get a unique id. This is done using UUID function. 
// If successful return status code 201 (Created) along with the user object.
app.post('/users', (req, res) => {
    try {
        let {name, email} = req.body;
        if (!name && !email) return res.status(400).send({ error: 'Missing name and email.' });
        else if (!name) return res.status(400).send({ error: 'Missing name.' });
        else if (!email) return res.status(400).send({ error: 'Missing email.' });
        let user = {id: uuidv4(), name: name, email: email};
        console.log('New user created:', user); // Debugging
        users.push(user);
        return res.status(201).send(user);
    } catch (error) {
        console.error(error); 
        return res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});

// Get request to fetch specific user by id.
// If user is not found, return status code 404 (Not Found).
// If successful return status code 200 (OK) along with the user object.
app.get('/users/:id', (req, res) => {
    try {
        console.log('Fetching user with id:', req.params.id); // Debugging
        const user = users.find(user => user.id === req.params.id);
        if (!user){ 
            console.log('User not found:', req.params.id); // Debugging
            return res.status(404).send({ error: 'User not found.' });
        }
        console.log('User was found:', req.params.id); // Debugging
        return res.send(user);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});

// Put request to update user by id.
// Request body must contain name and email. If not, return status code 400 (Bad Request).
// If user is not found, return status code 404 (Not Found).
// If successful return status code 200 (OK) along with the updated user object.
app.put('/users/:id', (req, res) => {
    try {
        console.log('Updating user with id:', req.params.id); // Debugging
        const user = users.find(user => user.id === req.params.id);
        if (!user){ 
            console.log('User not found:', req.params.id); // Debugging
            return res.status(404).send({ error: 'User not found.' });
        }
        let {name, email} = req.body;
        if (!name && !email) return res.status(400).send({ error: 'Missing name and email.' });
        else if (!name) return res.status(400).send({ error: 'Missing name.' });
        else if (!email) return res.status(400).send({ error: 'Missing email.' });
        user.name = name;
        user.email = email;
        console.log('User updated:', user); // Debugging
        return res.send(user);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});

// Delete request to delete user by id.
// If user is not found, return status code 404 (Not Found).
// If successful return status code 204 (No Content) along with the deleted user object.
app.delete('/users/:id', (req, res) => {
    try {
        console.log('Deleting user with id:', req.params.id); // Debugging
        const user = users.find(user => user.id === req.params.id);
        if (!user){ 
            console.log('User not found:', req.params.id); // Debugging
            return res.status(404).send({ error: 'User not found.' });
        }
        users = users.filter(user => user.id !== req.params.id);
        console.log('User deleted:', req.params.id); // Debugging
        return res.status(204).send();
    } catch (error) {
        console.error(error); 
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing