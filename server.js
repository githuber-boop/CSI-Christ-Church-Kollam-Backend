// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import jsonServer from 'json-server';
// import cors from 'cors';
// import { fileURLToPath } from 'url';

// // Get the current file's directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 5000;
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// // Middleware to enable CORS
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Endpoint to handle file uploads
// app.post('/upload', (req, res) => {
//   const fileName = req.headers['file-name'];
//   console.log('Received file name:', fileName); // Debugging log

//   if (!fileName) {
//     return res.status(400).json({ message: 'File name is required' });
//   }

//   const uploadsDir = path.join(__dirname, 'uploads');

//   // Ensure the uploads directory exists
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//   }

//   const filePath = path.join(uploadsDir, fileName);
//   const fileStream = fs.createWriteStream(filePath);

//   req.pipe(fileStream);

//   fileStream.on('finish', () => {
//     const protocol = req.protocol;
//     const host = req.get('host');
//     const fileData = {
//       name: fileName,
//       url: `${protocol}://${host}/uploads/${fileName}`, // Dynamically generating the URL
//     };

//     // Read existing data
//     fs.readFile('db.json', (err, data) => {
//       if (err) {
//         console.error('Error reading db.json:', err);
//         return res.status(500).json({ message: 'Error reading database' });
//       }

//       const jsonData = JSON.parse(data);
//       jsonData.uploads = jsonData.uploads || [];
//       jsonData.uploads.push(fileData);

//       // Write updated data back to db.json
//       fs.writeFile('db.json', JSON.stringify(jsonData, null, 2), (err) => {
//         if (err) {
//           console.error('Error writing to db.json:', err);
//           return res.status(500).json({ message: 'Error saving to database' });
//         }

//         res.json({ message: 'File uploaded successfully', url: fileData.url });
//       });
//     });
//   });

//   fileStream.on('error', (err) => {
//     console.error('File stream error:', err);
//     res.status(500).json({ message: 'Error uploading file' });
//   });
// });

// // Use JSON Server as middleware
// app.use('/api', middlewares, router);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import jsonServer from 'json-server';
// import cors from 'cors';
// import { fileURLToPath } from 'url';

// // Get the current file's directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 5000;
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// // Middleware to enable CORS
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Endpoint to handle file uploads
// app.post('/upload', (req, res) => {
//   const fileName = req.headers['file-name'];
//   console.log('Received file name:', fileName); // Debugging log

//   if (!fileName) {
//     return res.status(400).json({ message: 'File name is required' });
//   }

//   const uploadsDir = path.join(__dirname, 'uploads');

//   // Ensure the uploads directory exists
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//   }

//   const filePath = path.join(uploadsDir, fileName);
//   const fileStream = fs.createWriteStream(filePath);

//   req.pipe(fileStream);

//   fileStream.on('finish', () => {
//     const fileData = {
//       name: fileName,
//       url: `https://church-kollam-backend.onrender.com/uploads/${fileName}`,
//     };
  
//     // Read existing data
//     fs.readFile('db.json', (err, data) => {
//       if (err) {
//         console.error('Error reading db.json:', err);
//         return res.status(500).json({ message: 'Error reading database' });
//       }
  
//       const jsonData = JSON.parse(data);
//       jsonData.uploads = jsonData.uploads || []; // Change to 'uploads'
//       jsonData.uploads.push(fileData); // Change to 'uploads'
  
//       // Write updated data back to db.json
//       fs.writeFile('db.json', JSON.stringify(jsonData, null, 2), (err) => {
//         if (err) {
//           console.error('Error writing to db.json:', err);
//           return res.status(500).json({ message: 'Error saving to database' });
//         }
  
//         res.json({ message: 'File uploaded successfully', url: fileData.url });
//       });
//     });
//   });

  
//   fileStream.on('error', (err) => {
//     console.error('File stream error:', err);
//     res.status(500).json({ message: 'Error uploading file' });
//   });
// });

// // Use JSON Server as middleware
// app.use('/api', middlewares, router);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from 'express';
import path from 'path';
import fs from 'fs';
import formidable from 'formidable';
import { fileURLToPath } from 'url';

// Helper to work with __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Create directories if they don't exist
const createDirectoryIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

createDirectoryIfNotExists('uploads/almanac');
createDirectoryIfNotExists('uploads/herald');

// Handle file upload for Almanac
app.post('/api/upload/almanac', (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, 'uploads/almanac');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }
    const file = files.file[0];
    res.json({
      filename: file.originalFilename,
      path: `/uploads/almanac/${path.basename(file.filepath)}`,
    });
  });
});

// Handle file upload for Herald
app.post('/api/upload/herald', (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, 'uploads/herald');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }
    const file = files.file[0];
    res.json({
      filename: file.originalFilename,
      path: `/uploads/herald/${path.basename(file.filepath)}`,
    });
  });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
