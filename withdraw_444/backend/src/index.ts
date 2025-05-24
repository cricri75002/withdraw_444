import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import plaidRoutes from './routes/plaid';

app.use('/api/plaid', plaidRoutes);
import paymentRoutes from './routes/payment';
app.use('/api/payment', paymentRoutes);
import cardRoutes from './routes/cards';
app.use('/api/cards', cardRoutes);