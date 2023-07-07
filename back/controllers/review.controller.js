const ReviewService = require("../services/review.services");

class ReviewController {
  static async addReview(req, res) {
    try {
      const review = await ReviewService.addReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllReviewsByProductId(req, res) {
    try {
      const reviews = await ReviewService.getAllReviewsByProductId(
        req.params.productId
      );
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReviewController;
