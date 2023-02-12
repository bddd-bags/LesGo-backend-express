const router = require("express").Router();
const { verifyTokenAndRole } = require("../middleware/auth");
const { PaymentController } = require("../controllers");

router.get(
	"/:companyId/companies",
	verifyTokenAndRole(["PARTNER", "ADMIN", "USER"]),
	PaymentController.index,
);

router.post("/", verifyTokenAndRole(["PARTNER"]), PaymentController.store);

router.get(
	"/:paymentId",
	verifyTokenAndRole(["PARTNER", "ADMIN", "USER"]),
	PaymentController.findOne,
);

router.put(
	"/:paymentId",
	verifyTokenAndRole(["PARTNER"]),
	PaymentController.update,
);

router.delete(
	"/:paymentId",
	verifyTokenAndRole(["PARTNER"]),
	PaymentController.delete,
);

module.exports = router;
