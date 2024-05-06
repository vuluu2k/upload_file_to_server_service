require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const upload = require("./utils/upload");
const protocol = process.env.ENV == "prod" ? "https" : "http";

app.use("/contents", express.static(path.join(__dirname, "contents")));

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const host = req.get("host");
  res.status(200).json({
    success: true,
    message: "File uploaded successfully!",
    filename: file.filename,
    path: `${protocol}://${host}/${file.path}`,
    mimetype: file.mimetype,
    size: file.size,
    fieldname: file.fieldname,
    encoding: file.encoding,
  });
});

app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
