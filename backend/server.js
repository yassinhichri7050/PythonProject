const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // ⬅️ Load env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));


// Routes
const etudiantRoutes = require('./routes/etudiants');
const formationRoutes = require('./routes/formations');
const departementRoutes = require('./routes/departements');

app.use('/api/etudiants', etudiantRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/departements', departementRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
