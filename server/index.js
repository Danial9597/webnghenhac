require("dotenv").config();
const express = require("express");
const upload = require("./middleware/multer");
const cloudinary = require("./utils/cloudinary");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Send post request to /upload to upload image");
});

app.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  (req, res) => {
    const imageFile = req.files.image?.[0];
    const audioFile = req.files.audio?.[0];

    if (!imageFile || !audioFile) {
      return res.status(400).json({
        success: false,
        message: "Missing image or audio file",
      });
    }

    cloudinary.uploader.upload(
      imageFile.path,
      { resource_type: "image" },
      (err, imageResult) => {
        if (err) return res.status(500).json({ message: "Image upload failed" });
        
        cloudinary.uploader.upload(
          audioFile.path,
          { resource_type: "video" },
          (err, audioResult) => {
            if (err) return res.status(500).json({ message: "Audio upload failed" });

            res.json({
              success: true,
              imageUrl: imageResult.secure_url,
              audioUrl: audioResult.secure_url,
            });
          }
        );
      }
    );
  }
);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));