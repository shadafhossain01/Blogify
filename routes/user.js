const express = require("express");
const multer = require("multer");
const { handleSingIn, handleSingUp, handleLogout } = require("../controllers/user");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => res.render("home"));
router.get("/signin", (req, res) => res.render("signIn"));
router.get("/signup", (req, res) => res.render("signUp"));

router.post("/signup", upload.single("image"), handleSingUp);
router.post("/signin", handleSingIn);
router.post("/logout", handleLogout);

module.exports = router;

