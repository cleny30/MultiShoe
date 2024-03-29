using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RKShoesAPI.Models.Pages.Review
{
    public class ReviewModel
    {
        /// <summary>
        /// ReviewId
        /// </summary>

        [Required]
        public int ReviewId { get; set; }

        /// <summary>
        /// ProId
        /// </summary>

        [Required]
        public string ProId { get; set; } = string.Empty;

        /// <summary>
        /// UserName
        /// </summary>

        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// Content
        /// </summary>


        [Required]
        public string Content { get; set; } = string.Empty;

        /// <summary>
        /// Rating
        /// </summary>

        [Required]
        public int Rating { get; set; }

        /// <summary>
        /// Date
        /// </summary>

        [Required]
        public DateTime Date { get; set; } = DateTime.Now;

        /// <summary>
        /// img1
        /// </summary>

        [MaxLength(50)]
        public string? img1 { get; set; } = string.Empty;

        /// <summary>
        /// img2
        /// </summary>

        [MaxLength(50)]
        public string? img2 { get; set; } = string.Empty;

        /// <summary>
        /// img3
        /// </summary>
        [MaxLength(50)]
        public string? img3 { get; set; } = string.Empty;

    }
    public class RatingDistribution
    {
        /// <summary>
        /// Rating
        /// </summary>

        [Required]
        public int Rating { get; set; }

        /// <summary>
        /// Count
        /// </summary>

        [Required]
        public int Count { get; set; }

        /// <summary>
        /// Rating
        /// </summary>

        [Required]
        public decimal Percentage { get; set; }
    }

}
