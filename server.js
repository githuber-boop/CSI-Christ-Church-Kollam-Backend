import express from "express";
import userRouter from './routers/userRouter.js'
import connectDb  from "./config/db.js";
import cors from 'cors';
import dotenv from 'dotenv';
import messageRouter from "./routers/messageRouter.js";
import eventsRouter from "./routers/eventsRouter.js";
import fs from 'fs'
import path from "path";
import multer from "multer";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const corsOptions = {
  origin: 'https://csi-christ-church-kollam.pages.dev/', 
  methods: 'GET, POST, PUT, DELETE, PATCH',
};
const app = express();

app.use(express.json());
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true })); 
app.use('/api/users',userRouter)
app.use('/api/message',messageRouter)
app.use('/api/events',eventsRouter)
connectDb();


// Set up multer storage configuration


app.get("/", (req, res) => {
  res.send("API is working");
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.params.folder;
    const uploadPath = path.join(__dirname, 'uploads', folder);

    // Ensure the folder exists
    fs.mkdirSync(uploadPath, { recursive: true });

    // Remove existing file in the folder
    fs.readdirSync(uploadPath).forEach((f) => {
      fs.unlinkSync(path.join(uploadPath, f));
    });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload/:folder', (req, res) => {
  const folder = req.params.folder;
  if (folder !== 'almanac' && folder !== 'herald') {
    return res.status(400).json({ error: 'Invalid folder name' });
  }

  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: `${folder} file uploaded successfully!` });
  });
});

app.get('/files/:folder', (req, res) => {
  const folder = req.params.folder;
  if (folder !== 'almanac' && folder !== 'herald') {
    return res.status(400).json({ error: 'Invalid folder name' });
  }

  const folderPath = path.join(__dirname, 'uploads', folder);
  const files = fs.readdirSync(folderPath);
  if (files.length > 0) {
    res.json({ fileName: files[0] });
  } else {
    res.json({ fileName: null });
  }
});

app.get('/download/:folder', (req, res) => {
  const folder = req.params.folder;
  if (folder !== 'almanac' && folder !== 'herald') {
    return res.status(400).json({ error: 'Invalid folder name' });
  }

  const folderPath = path.join(__dirname, 'uploads', folder);
  const files = fs.readdirSync(folderPath);
  if (files.length > 0) {
    const filePath = path.join(folderPath, files[0]);
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
