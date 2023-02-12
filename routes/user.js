const router = require("express").Router();
const { UserController } = require("../controllers");
const { verifyTokenAndRole } = require("../middleware/auth");
const { singleUpload } = require("../utils/multer");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/users", verifyTokenAndRole(["ADMIN"]), UserController.index);
router.get(
	"/users/:id",
	verifyTokenAndRole(["ADMIN", "USER", "PARTNER"]),
	UserController.findOne,
);
router.put(
	"/users",
	verifyTokenAndRole(["ADMIN", "USER", "PARTNER"]),
	singleUpload("img", "profile"),
	UserController.update,
);

module.exports = router;
