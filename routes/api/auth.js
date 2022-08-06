const express = require("express");

const ctrl = require("../../controllers/auth");

const {auth, upload} = require("../../middlewares");

const {ctrlWrapper} = require("../../helpers");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

// router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.setAvatar));

module.exports = router;