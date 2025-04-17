const express = require('express') //dependency //class
const dotenv  = require('dotenv');
const bodyParser = require('body-parser') //dependeny
const cors = require('cors') //dependency
dotenv.config();
const db = require('./src/db/index.js') //
const { auth, adminOnly } = require('./src/middleware/auth');
const leadRoutes = require('./src/routes/leadRoutes.js')
const propertyRoutes = require('./src/routes/propertyRoutes.js')
const authRoutes     = require('./src/routes/authRoutes');
const app = express()  //objects
const apiPort = 8888
const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use("/api/leads", leadRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))