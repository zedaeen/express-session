const express = require("express");
const router = require("./router");
const session = require("express-session");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'cftvgasjdfk',
  resave: false,
  saveUninitialized: false
}))

app.use(router);

app.listen(port, () => {
  console.log("app listening on port", port);
});