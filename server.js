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

import express, { json } from 'express';
import path from 'path';
import fs from 'fs';
import jsonServer from 'json-server';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware to enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/heralds', express.static(path.join(__dirname, 'heralds')));
app.use('/almanacs', express.static(path.join(__dirname, 'almanacs')));

app.post('/herald-upload', (req, res) => {
  const fileId = req.headers['file-id'];
  const fileName = req.headers['file-name'];
  console.log('Received file ID:', fileId); // Debugging log
  console.log('Received file name:', fileName); // Debugging log

  if (!fileId || !fileName) {
    return res.status(400).json({ message: 'File ID and name are required' });
  }

  const uploadsDir = path.join(__dirname, 'heralds');

  const deleteAllFilesInDir = (dir) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      files.forEach(file => {
        const filePath = path.join(dir, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
          }
        });
      });
    });
  };

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, fileName);


  // Check if the file already exists and delete it
  deleteAllFilesInDir(uploadsDir)

  const fileStream = fs.createWriteStream(filePath);

  req.pipe(fileStream);

  fileStream.on('finish', () => {
    const fileData = {
      name: fileName,
      url: `https://church-kollam-backend.onrender.com/heralds/${fileName}`,
      id: fileId // Use the provided file ID
    };

    // Read existing data
    fs.readFile('db.json', (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        return res.status(500).json({ message: 'Error reading database' });
      }



      const jsonData = JSON.parse(data);
      jsonData.heralds = jsonData.heralds || [];

      // Find and replace the file entry based on ID
      const index = jsonData.heralds.findIndex(file => file.id === fileId);
      if (index > -1) {
        jsonData.heralds[index] = fileData;
      } else {
        jsonData.heralds.push(fileData);
      }
      
      console.log(data)
      console.log(JSON.stringify(jsonData));

      // Write updated data back to db.json
      fs.writeFile('db.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to db.json:', err);
          return res.status(500).json({ message: 'Error saving to database' });
        }
        console.log(JSON.stringify(jsonData));

        res.json({ message: 'File uploaded successfully', url: fileData.url });
      });
    });
  });
});

app.post('/almanac-upload', (req, res) => {
  const fileId = req.headers['file-id'];
  const fileName = req.headers['file-name'];
  console.log('Received file ID:', fileId); // Debugging log
  console.log('Received file name:', fileName); // Debugging log

  if (!fileId || !fileName) {
    return res.status(400).json({ message: 'File ID and name are required' });
  }

  const uploadsDir = path.join(__dirname, 'almanacs');

  const deleteAllFilesInDir = (dir) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      files.forEach(file => {
        const filePath = path.join(dir, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
          }
        });
      });
    });
  };

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, fileName);


  // Check if the file already exists and delete it
  deleteAllFilesInDir(uploadsDir)

  const fileStream = fs.createWriteStream(filePath);

  req.pipe(fileStream);

  fileStream.on('finish', () => {
    const fileData = {
      name: fileName,
      url: `https://church-kollam-backend.onrender.com/almanacs/${fileName}`,
      id: fileId // Use the provided file ID
    };

    // Read existing data
    fs.readFile('db.json', (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        return res.status(500).json({ message: 'Error reading database' });
      }

      const jsonData = JSON.parse(data);
      jsonData.almanacs = jsonData.almanacs || [];
      console.log(` Before changing ${JSON.stringify(jsonData)}`)


      jsonData.almanacs.push(fileData);


      console.log(` Data of db.json ${data}`)
      console.log(` After changing ${JSON.stringify(jsonData)}`)



      // Write updated data back to db.json
      fs.writeFile('db.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to db.json:', err);
          return res.status(500).json({ message: 'Error saving to database' });
        }
        console.log(JSON.stringify(jsonData.almanacs));
        res.json({ message: 'File uploaded and replaced successfully', url: fileData.url });
      });

      console.log(` Data of db.json ${data}`)
      console.log(` After changing ${JSON.stringify(jsonData)}`)

    });
  });
});

// Use JSON Server as middleware
app.use('/api', middlewares, router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

