const Review = require("../models/Review");
const Products = require("../models/Products");

class ReviewService {
  static async addReview(reviewData) {
    try {
      const { id_product, comments, starts } = reviewData;
      const review = await Review.create({
        productId: id_product,
        comments: comments,
        starts: starts,
      });
      return review;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getAllReviewsByProductId(productId) {
    try {
      const reviews = await Review.findAll({
        where: {
          productId: parseInt(productId),
        },
        include: {
          model: Products,
          as: "product",
        },
      });
      return reviews;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = ReviewService;
