require('dotenv').config(); // Load .env file
const express = require('express');
const ImageKit = require('imagekit');
const cors = require('cors');

const app = express();

const imagekit = new ImageKit({
  urlEndpoint: process.env.REACT_APP_IMAGE_KIT_URL,
  publicKey: process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(express.json()); // Parse JSON request bodies

// Authentication endpoint
app.get('/auth', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// File deletion endpoint
app.delete('/delete', async (req, res) => {
  const fileId = req.query.fileId;
  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required.' });
  }

  try {
    const result = await imagekit.deleteFile(fileId);
    res.status(200).json({ message: 'File deleted successfully.', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
