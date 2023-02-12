const router = require("express").Router();
const { CourseController } = require("../controllers");
const { verifyTokenAndRole } = require("../middleware/auth");
const { singleUpload } = require("../utils/multer");

router.get("/", CourseController.indexUser);
router.get("/users", verifyTokenAndRole(["USER"]), CourseController.indexUser);
router.get(
	"/partners",
	verifyTokenAndRole(["PARTNER"]),
	CourseController.indexPartner,
);
router.get(
	"/partners/:courseId",
	verifyTokenAndRole(["PARTNER"]),
	CourseController.getUserCourses,
);
router.get("/:courseId", CourseController.findOne);
router.post(
	"/",
	verifyTokenAndRole(["PARTNER"]),
	singleUpload("img", "course"),
	CourseController.store,
);
router.put(
	"/:courseId",
	verifyTokenAndRole(["PARTNER"]),
	singleUpload("img", "course"),
	CourseController.update,
);
router.delete(
	"/:courseId",
	verifyTokenAndRole(["PARTNER"]),
	CourseController.delete,
);

module.exports = router;
