import express from 'express';
import reviewController from '../controllers/ReviewController.js';

const router = express.Router();
// Create a new review
router.post('/', reviewController.createReview);

// Get reviews for a specific product
router.get('/:productId/reviews', reviewController.getProductReviews);

// Get review details by ID
router.get('/:reviewId', reviewController.getReviewDetail);

export default router;
