const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(userRoutes.router);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));