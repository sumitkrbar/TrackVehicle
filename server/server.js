import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;

const app  = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});