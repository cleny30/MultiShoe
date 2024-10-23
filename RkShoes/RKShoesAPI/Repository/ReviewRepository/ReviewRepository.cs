using ISUZU_NEXT.Server.Core.Extentions;
using Microsoft.EntityFrameworkCore;
using RKShoesAPI.IRepository.IReviewRepository;
using RKShoesAPI.Models.Entities;
using RKShoesAPI.Models.Pages.Review;
using System;


namespace RKShoesAPI.Repository.ReviewRepository
{
    public class ReviewRepository : IReviewRepository
    { 

        public List<ReviewModel> GetReviews()
        {
            List<Review> reviews = AppDbContext.Instance.Reviews.ToList();
            List<ReviewModel> reviewModels = new List<ReviewModel>();
            foreach (var review in reviews)
            {
                ReviewModel reviewModel = new ReviewModel();
                reviewModel.CopyProperties(review);
                reviewModels.Add(reviewModel);
            }
            return reviewModels;
        }
        public List<ReviewModel> GetReviewsByProId(string proId)
        {
            var reviews = AppDbContext.Instance.Reviews.Where(r => r.ProId == proId).ToList();
            List<ReviewModel> reviewModels = new List<ReviewModel>();
            foreach (var review in reviews)
            {
                if (review != null)
                {
                    ReviewModel reviewModel = new ReviewModel();
                    reviewModel.CopyProperties(review);
                    reviewModels.Add(reviewModel);
                }
            }
            return reviewModels;
        }

        /// <summary>
        /// Add new review for product
        /// </summary>
        /// <param name="newReview"></param>
        public void AddNewReview(ReviewModel newReview)
        {
            using (var dbContext = new AppDbContext())
            {
                Review review = new Review();
                review.CopyProperties(newReview);
                if (newReview.ReviewId != null && newReview.ReviewId > 0)
                {
                    review.ReviewId = newReview.ReviewId;
                }
                else
                {
                    // find newest Id in table then +1 to auto gerenate new Id
                    int latestReviewId = dbContext.Reviews.Max(r => (int?)r.ReviewId) ?? 0;
                    review.ReviewId = latestReviewId + 1;
                }
                dbContext.Reviews.Add(review);
                dbContext.SaveChanges();
            }
        }

        public ReviewModel GetReviewById(int id)
        {
            var review = AppDbContext.Instance.Reviews.FirstOrDefault(r => r.ReviewId == id);
            var reviewModel = new ReviewModel();
            reviewModel.CopyProperties(review);
            return reviewModel;
        }

        public void UpdateReview(ReviewModel updatedReview)
        {
            using (var dbContext = new AppDbContext())
            {
                Review existingReview = dbContext.Reviews.FirstOrDefault(r => r.ReviewId == updatedReview.ReviewId);
                if (existingReview != null)
                {
                    existingReview.ProId = updatedReview.ProId;
                    existingReview.UserName = updatedReview.UserName;
                    existingReview.Content = updatedReview.Content;
                    existingReview.Rating = updatedReview.Rating;
                    existingReview.Date = updatedReview.Date;
                    existingReview.img1 = updatedReview.img1;
                    existingReview.img2 = updatedReview.img2;
                    existingReview.img3 = updatedReview.img3;
                    dbContext.SaveChanges();
                }
            }
        }
        public void DeleteReview(int deleteReviewId)
        {
            var review = GetReviewById(deleteReviewId);
            if(deleteReviewId != null)
            {
                using (var dbContext = new AppDbContext())
                {
                    var existingReview = dbContext.Reviews.FirstOrDefault(r => r.ReviewId == deleteReviewId);
                    if (existingReview != null)
                    {
                        dbContext.Reviews.Remove(existingReview);
                        dbContext.SaveChanges();
                    }
                }
            }
        }
    }
}

