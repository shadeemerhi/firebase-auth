const express = require('express');
require("dotenv").config();
const app = express();
const BodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

// Express configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
