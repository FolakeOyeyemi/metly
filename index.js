const app = require("./app");
const connectDB = require("./src/database/db");



const port = process.env.PORT || 5678

//listen to server

// app.listen(port,() => {
//     console.log(`Server running on port ${port}`);
//     connectDB();
// });