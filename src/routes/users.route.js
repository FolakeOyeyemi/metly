const express = require("express");
const router = express.Router();
const multer = require("multer");
const Pet = require("../models/pets.model");
const upload = multer({ dest: 'uploads/' });
// const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const { userSignup, userLogin } = require("../controllers/users.controller");
const { createPet, editPet } = require("../controllers/admin.controller");
const { isAuth, authorize} = require("../middlewares/isAuth");



router.post("/signup", userSignup);
router.post("/login", userLogin);

// Admin

router.post("/create-pet", upload.single("image"), isAuth, authorize("admin"), createPet);
router.put("/edit-pet/:_id", upload.single("image"), isAuth, authorize("admin"), editPet);




module.exports = router;