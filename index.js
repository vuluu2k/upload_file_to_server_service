const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const upload = require("./utils/upload");

app.use('/contents', express.static(path.join(__dirname, "contents")));

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json({
    success: true,
    message: "File uploaded successfully!",
    filename: file.filename,
    path: file.path,
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
