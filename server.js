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
import { fileURLToPath } from 'url';
import { Formidable } from 'formidable';
import cors from 'cors';
import jsonServer from 'json-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const almanacDir = path.join(__dirname, 'uploads/almanac');
const heraldDir = path.join(__dirname, 'uploads/herald');

// Create directories if they don't exist
const createDirectoryIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const updateDbJson = (fileDetails, category) => {
  const dbPath = path.join(__dirname, 'db.json');
  let db = { almanac: [], herald: [] };

  if (fs.existsSync(dbPath)) {
    db = JSON.parse(fs.readFileSync(dbPath));
  }

  db[category].push(fileDetails);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

createDirectoryIfNotExists(almanacDir);
createDirectoryIfNotExists(heraldDir);

// Handle file upload for Almanac
app.post('/api/upload/almanac', (req, res) => {
  const form = new Formidable({ 
    uploadDir: almanacDir, 
    keepExtensions: true 
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }

    const file = files.file[0];
    const fileDetails = {
      filename: file.originalFilename,
      path: `/uploads/almanac/${path.basename(file.filepath)}`
    };
    updateDbJson(fileDetails, 'almanac');
    res.json(fileDetails);

  });
});

// Handle file upload for Herald
app.post('/api/upload/herald', (req, res) => {
  const form = new Formidable({ 
    uploadDir: heraldDir, 
    keepExtensions: true 
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }

    const file = files.file[0];
    const fileDetails = {
      filename: file.originalFilename,
      path: `/uploads/herald/${path.basename(file.filepath)}`
    };
    updateDbJson(fileDetails, 'herald');
    res.json(fileDetails);
  });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up json-server
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use json-server middleware
app.use('/api', middlewares, router);
app.get('/api/files/almanac', (req, res) => {
  fs.readdir('uploads/almanac', (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading files' });
    }
    res.json(files.map(file => ({
      filename: file,
      path: `/uploads/almanac/${file}`
    })));
  });
});

// Endpoint to list Herald files
app.get('/api/files/herald', (req, res) => {
  fs.readdir('uploads/herald', (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading files' });
    }
    res.json(files.map(file => ({
      filename: file,
      path: `/uploads/herald/${file}`
    })));
  });
});
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
