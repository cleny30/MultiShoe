using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKShoesAPI.Models;
using RKShoesAPI.Models.Pages.Product;
using RKShoesAPI.Models.Pages.Review;
using RKShoesAPI.Services.Review;

namespace RKShoesAPI.Controllers.ProductDetail
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewService _reviewService;
        public ReviewController()
        {
            _reviewService = new ReviewService();
        }
        [HttpGet("GetReviewById")]
        public ReviewModel GetReview(int id)
        {
            return _reviewService.GetReviewById(id);
        }
        [HttpPost("AddReview")]
        public void AddReview([FromBody] ReviewModel review)
        {
            _reviewService.AddReview(review);
        }
        [HttpPost("UpdateReview")]
        public void UpdateReview([FromBody] ReviewModel review)
        {
            _reviewService.UpdateReview(review);
        }

        [HttpDelete("DeleteReview")]
        public APIResult DeleteReview(int reviewId)
        {
            APIResult aPIResult = new APIResult();
            _reviewService.DeleteReview(reviewId);
            return aPIResult;


        }

    }
}
