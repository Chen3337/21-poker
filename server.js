const express = require("express");

const path = require("path");

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/indexen", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/indexen.html"));
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Application running on PORT ${PORT}`);
});
