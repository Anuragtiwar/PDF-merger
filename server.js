const express = require('express');
const path = require('path');
const { mergeredPdfs } = require('./merge');
const multer = require('multer');
const app = express();
const port = 3000;

// Set up Multer to store uploaded files in the 'merge/' directory
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));
app.use(express.static('src'));

// Serve the HTML file on the local server
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

// Handle file merge on the '/merge' endpoint
app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  // Log the uploaded files to the console
  console.log(req.files);
  let d =await mergeredPdfs(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect(`http://localhost:${port}/static/${d}.pdf`);
  // Send a response to the client
  // res.send({ data: req.files });
  
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
