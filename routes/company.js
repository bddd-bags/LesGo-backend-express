const router = require("express").Router();
const { CompanyController } = require("../controllers");
const { verifyTokenAndRole } = require("../middleware/auth");
const { singleUpload } = require("../utils/multer");

router.get("/", CompanyController.index);
router.get(
	"/partners",
	verifyTokenAndRole(["USER", "PARTNER"]),
	CompanyController.indexByUserId,
);
router.get("/:companyId", CompanyController.findOne);
router.post(
	"/",
	verifyTokenAndRole(["USER", "PARTNER", "ADMIN"]),
	singleUpload("img", "company"),
	CompanyController.store,
);
router.put(
	"/:companyId",
	verifyTokenAndRole(["PARTNER", "ADMIN"]),
	singleUpload("img", "company"),
	CompanyController.update,
);
router.delete(
	"/:companyId",
	verifyTokenAndRole(["ADMIN"]),
	CompanyController.delete,
);

module.exports = router;
