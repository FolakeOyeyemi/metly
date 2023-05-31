require("dotenv").config();
const express = require('express');
const connectDB = require('./src/database/db');
const app = express();
const userRoutes = require('./src/routes/users.route');

// Connect to the database
connectDB();

// Middleware to parse incoming JSON data
app.use(express.json());


// Route to handle GET requests to the root URL path
app.get('/', (req, res) => {
  res.send('Welcome to the Pet Store');
});

// Route to handle POST requests to the root URL path
app.use('/api', userRoutes);

//404
app.use((req,res,next) => {
  const error = new error("Not Found" );
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) =>{
  res.json({
      error: {
          message: error.message
      }
  });
});


// Start the server
const PORT = process.env.PORT || 5678;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgMagenta);
});
