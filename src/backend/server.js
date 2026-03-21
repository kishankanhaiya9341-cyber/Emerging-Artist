const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "bookings.json";

// create file if not exists
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([]));
}

// GET all bookings (admin)
app.get("/bookings", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// POST new booking
app.post("/bookings", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));

  const newBooking = {
    id: Date.now().toString(),
    ...req.body,
    status: "pending",
    submittedAt: new Date()
  };

  data.push(newBooking);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});