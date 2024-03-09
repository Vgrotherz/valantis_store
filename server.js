const path = require('path');
const express = require('express');

const app = express();

// Serve static files from the '../../../build' directory of your React application
app.use(express.static(path.join(__dirname, './build')));

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});