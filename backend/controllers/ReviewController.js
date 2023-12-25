import Review from '../models/ReviewsModel.js';
// Controller to create a new review
const createReview = async (req, res) => {
    try {
        const { rating, comment, user, product } = req.body;

        const newReview = new Review({
            rating,
            comment,
            user,
            product,
            dateCreated: new Date(),
        });

        const savedReview = await newReview.save();

        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get reviews for a specific product
const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ product: productId }).populate('user');

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get review details by ID
const getReviewDetail = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const review = await Review.findById(reviewId).populate('user');

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error fetching review details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default {
    createReview,
    getProductReviews,
    getReviewDetail,
};

