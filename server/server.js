const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());

connectDB();

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/blogs", require("./routes/blog"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));