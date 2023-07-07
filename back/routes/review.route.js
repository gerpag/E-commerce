const ReviewController = require("../controllers/review.controller");
const router = require("express").Router();

router.post("/", ReviewController.addReview);
router.get("/:productId", ReviewController.getAllReviewsByProductId);

module.exports = router;
