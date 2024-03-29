using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Review;

namespace RKShoesAPI.IRepository.IReviewRepository
{
    public interface IReviewRepository
    {
        public List<ReviewModel> GetReviews();
        public List<ReviewModel> GetReviewsByProId(string proId);
        public void AddNewReview(ReviewModel newReview);
        public void UpdateReview(ReviewModel review);
        public ReviewModel GetReviewById(int id);
        public void DeleteReview(int reviewId);
    }
}
