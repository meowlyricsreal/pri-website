const express = require("express")
const multer = require("multer")
const cors = require("cors")
const path = require("path")
const fs = require("fs")

const app = express()

app.use(cors())
app.use(express.json())

const uploadPath = path.join(__dirname, "uploads")

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },

  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname
    cb(null, unique)
  },
})

const upload = multer({ storage })

app.use(
  "/music",
  express.static(uploadPath)
)

app.post(
  "/upload-music",
  upload.single("music"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        error: "No file",
      })
    }

    const url = `/music/${req.file.filename}`

    res.json({
      success: true,
      url,
    })
  }
)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`)
})