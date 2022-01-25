const tasks = require("./routes/tasks");
const connection = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
app.use(helmet());



//calling the connection to database function here
connection();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/tasks", tasks);

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))


