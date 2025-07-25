import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import aadharRoutes from './routes/aadharRoutes.js';

const app = express();

app.use(cors())
dotenv.config();

connectDB(); 

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api', aadharRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
