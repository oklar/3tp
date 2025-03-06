const express = require("express");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const multer = require("multer");

const upload = multer(); // Multer middleware for parsing multipart/form-data
const app = express();

app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded
app.use(express.json()); // For application/json

// Live reload setup
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/public");

app.use(connectLivereload());
app.use(express.static("public"));

app.patch("/item", upload.none(), (req, res) => {
  console.log("PUT Request:");
  console.log("Headers:", req.headers);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  console.log("Body item:", req.body.item);
  res.send("<div id=content><h1>/patch</h1></div>");
});

app.delete("/item", upload.none(), (req, res) => {
  console.log("PUT Request:");
  console.log("Headers:", req.headers);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  console.log("Body item:", req.body.item);
  res.send("<div id=content><h1>/delete</h1></div>");
});

app.put("/item", upload.none(), (req, res) => {
  console.log("PUT Request:");
  console.log("Headers:", req.headers);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  console.log("Body item:", req.body.item);
  res.send("<div id=content><h1>/put</h1></div>");
});

app.post("/item", upload.none(), (req, res) => {
  console.log("POST with PRG pattern:");
  console.log("Heapoders:", req.headers);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  console.log("Body item:", req.body.comment);
  res.redirect("/item");
});

app.get("/item", (req, res) => res.send("<div id=content><h1>/get</h1></div>"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

// Notify browser when files change
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
