const express = require("express");
const connectDb = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
connectDb();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}.`));
