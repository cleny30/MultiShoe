using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.IReviewRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Review;
using RKShoesAPI.Repository.ReviewRepository;

namespace RKShoesAPI.Services.Review
{
    public class ReviewService
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewService()
        {
            _reviewRepository = new ReviewRepository();
        }

        /// <summary>
        /// Get all Reviews from product's detail
        /// </summary>
        /// <returns></returns>
        public List<ReviewModel> GetReviews()
        {
            List<ReviewModel> reviews = _reviewRepository.GetReviews();
            return reviews;
        }
        /// <summary>
        /// Get reviews from customer by product ID
        /// </summary>
        /// <param name="proId"></param>
        /// <returns></returns>
        public List<ReviewModel> GetReviewsByProId(string proId)
        {
            List<ReviewModel> reviews = _reviewRepository.GetReviewsByProId(proId);
            return reviews;
        }

        /// <summary>
        /// Count reviews from Product
        /// </summary>
        public int GetReviewCountByProductID(string proId)
        {
            return GetReviewsByProId(proId).Count;
        }

        /// <summary>
        /// Get rating star for each number in review
        /// </summary>
        public List<RatingDistribution> GetRatingDistribution(string proId)
        {
            var ratingDistributionList = new List<RatingDistribution>();
            var reviewCount = GetReviewCountByProductID(proId);

            // Query to calculate rating distribution
            var ratingDistributionQuery = GetReviewsByProId(proId).GroupBy(r => r.Rating)
                .Select(g => new
                {
                    Rating = g.Key,
                    Count = g.Count(),
                    Percentage = Math.Round((double)g.Count() * 100 / reviewCount, 2)
                })
                .OrderBy(rd => rd.Rating)
                .ToList();
            // Loop to ensure rating numbers are present in the result 
            for (int i = 1; i <= 5; i++)
            {
                var existingRating = ratingDistributionQuery.FirstOrDefault(rd => rd.Rating == i);
                if (existingRating == null)
                {
                    ratingDistributionQuery.Add(new { Rating = i, Count = 0, Percentage = 0.0 });
                }
            }
            // Sort the result by rating
            ratingDistributionQuery = ratingDistributionQuery.OrderBy(rd => rd.Rating).ToList();

            // Create object ratingdistribute from result
            foreach (var item in ratingDistributionQuery)
            {
                var ratingDistribution = new RatingDistribution
                {
                    Rating = item.Rating,
                    Count = item.Count,
                    Percentage = (decimal)item.Percentage
                };
                ratingDistributionList.Add(ratingDistribution);
            }
            return ratingDistributionList;
        }
        public void AddReview(ReviewModel review)
        {
          _reviewRepository.AddNewReview(review);
        }
        public ReviewModel GetReviewById(int id)
        {
            return _reviewRepository.GetReviewById(id);
        }
        public void UpdateReview(ReviewModel review)
        {
            _reviewRepository.UpdateReview(review);
        }
        public void DeleteReview(int reviewId)
        {
            _reviewRepository.DeleteReview(reviewId);
        }
    }
}
