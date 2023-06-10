const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/tutorials')
const db = require('./models');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8080/'
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Turing.com' });
});

app.use(routes);


// set port, listen for requests
const PORT = process.env.PORT || 8080;

// The user should not forget to summon the sync() method in the server.js.
// const app = express();
// app.use(....);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
})
.catch(err => {
    console.log('XX Error - could not sync() sequalize');
    console.log(err);
})