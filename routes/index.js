const router = require("express").Router();
const { verifyTokenAndRole } = require("../middleware/auth");
const userRouter = require("./user");
const companyRouter = require("./company");
const paymentRouter = require("./payment");
// const courseTagRouter = require("./courseTag");
const courseRouter = require("./course");
const userCourseRouter = require("./userCourse");

// test midleware
router.get("/", verifyTokenAndRole(["USER", "ADMIN"]), (req, res) =>
	res.send(req.locals),
);

router.use("/api/users/courses", userCourseRouter);
router.use("/api", userRouter);
router.use("/api/companies", companyRouter);
router.use("/api/payments", paymentRouter);
// router.use("/api/tags", courseTagRouter);
router.use("/api/courses", courseRouter);

module.exports = router;
