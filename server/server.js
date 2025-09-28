const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const gdpRoutes = require('./routes/gdpRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/gdp', gdpRoutes);

app.get('/', (req,res)=> res.send({ status: 'ok', message: 'Country GDP Records API' }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
