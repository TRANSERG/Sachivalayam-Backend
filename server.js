const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) 
        {
          new Role({
              name: "secretary"
          }).save(err => {
              if (err) {
              console.log("error", err);
              }

              console.log("added 'secretary' to roles collection");
          });

          new Role({
              name: "worker"
          }).save(err => {
              if (err) {
              console.log("error", err);
              }

              console.log("added 'worker' to roles collection");
          });

          new Role({
              name: "admin"
          }).save(err => {
              if (err) {
              console.log("error", err);
              }

              console.log("added 'admin' to roles collection");
          });

          new Role({
              name: "sanitaryInspector"
          }).save(err => {
              if (err) {
              console.log("error", err);
              }

              console.log("added 'sanitary inspector' to roles collection");
          });
        }
    });
}

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/task.routes')(app);
require('./app/routes/zone.routes')(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sachivalyam Repoting System." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});