const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace <DB_PRIVATE_IP> with the Private IP of your Mongo EC2
const MONGO_URI = process.env.MONGO_URI || 'mongodb://<DB_PRIVATE_IP>:27017/devops_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB on Private EC2'))
  .catch(err => console.error('Mongo Connection Error:', err));

const CounterSchema = new mongoose.Schema({ count: Number });
const Counter = mongoose.model('Counter', CounterSchema);

// Get current count
app.get('/api/count', async (req, res) => {
  let data = await Counter.findOne();
  if (!data) data = await Counter.create({ count: 0 });
  res.json({ count: data.count });
});

// Increment count
app.post('/api/increment', async (req, res) => {
  let data = await Counter.findOne();
  if (!data) data = await Counter.create({ count: 0 });
  data.count += 1;
  await data.save();
  res.json({ count: data.count });
});

// Listening on '0.0.0.0' is the "Docker way" to allow external access
app.listen(5000, '0.0.0.0', () => {
  console.log('Backend is reachable on port 5000');
});