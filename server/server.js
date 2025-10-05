const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const gdpRoutes = require('./routes/gdpRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB Atlas
connectDB();

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Country GDP Records API is running' });
});

// Routes
app.use('/api/gdp', gdpRoutes);

// Error handler (must come after routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
