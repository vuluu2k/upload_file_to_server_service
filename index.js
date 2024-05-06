require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
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

app.get('/files', (req, res) => {
  fs.readdir(path.join(__dirname, "contents"), (err, files) => {
    if (err) {
      res.status(500, { error: err.message });
      return;
    }
  
    return res.status(200).json({
      success: true,
      files: files.map(file => ({
        filename: file,
        path: `${protocol}://${req.get("host")}/contents/${file}`
      }))
    })
  });
})

app.delete('/file/:filename', (req, res) => {
  const filename = req.params.filename

  fs.unlink(path.join(__dirname, "contents", filename), (err) => {
    if (err) {
      res.status(500, { error: err.message });
      return;
    }
    
    return res.status(200).json({
      success: true,
      message: 'File deleted successfully!'
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
