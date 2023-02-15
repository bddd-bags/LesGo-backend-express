const router = require("express").Router();
const { verifyTokenAndRole } = require("../middleware/auth");
const { UserCourseController } = require("../controllers");

router.get(
	"/",
	verifyTokenAndRole(["ADMIN", "PARTNER", "USER"]),
	UserCourseController.index,
);
router.post(
	"/",
	verifyTokenAndRole(["PARTNER", "ADMIN", "USER"]),
	UserCourseController.store,
);
router.put(
	"/:userCourseId",
	verifyTokenAndRole(["PARTNER"]),
	UserCourseController.update,
);
router.delete(
	"/:userCourseId",
	verifyTokenAndRole(["USER", "PARTNER", "ADMIN"]),
	UserCourseController.delete,
);
router.get(
	"/:userCourseId",
	verifyTokenAndRole(["USER", "ADMIN", "PARTNER"]),
	UserCourseController.findOne,
);

module.exports = router;
