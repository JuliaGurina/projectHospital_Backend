const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const apiLoginRoutes = require("./src/modules/routes/routesLogin");
const apiDomRoutes = require("./src/modules/routes/routesDom");

app.use(cors());

const url = "mongodb+srv://user:user1234@cluster0.1054y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/', apiLoginRoutes);
app.use('/', apiDomRoutes);

app.listen(5000, () => {
    console.log("Example app listening on port 5000!");
})

