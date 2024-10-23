using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Entities
{
    [Table("Review")]
    public class Review
    {

        /// <summary>
        /// ReviewId
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "ReviewId")]
        [Key]
        [Required]
        public int ReviewId { get; set; }

        /// <summary>
        /// ProId
        /// </summary>
        [Display(Name = "ProId")]
        [MaxLength(10)]
        [Required]
        public string ProId { get; set; } = string.Empty;

        /// <summary>
        /// UserName
        /// </summary>
        [Display(Name = "UserName")]
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// Content
        /// </summary>
        [Display(Name = "Content")]
        [MaxLength(500)]
        [Required]
        public string Content { get; set; } = string.Empty;

        /// <summary>
        /// Rating
        /// </summary>
        [Display(Name = "Rating")]
        [Required]
        public int Rating { get; set; }

        /// <summary>
        /// Date
        /// </summary>
        [Display(Name = "Date")]
        [Required]
        public DateTime Date { get; set; } = DateTime.Now;

        /// <summary>
        /// img1
        /// </summary>
        [Display(Name = "img1")]
        [MaxLength(500)]
        public string? img1 { get; set; } = string.Empty;

        /// <summary>
        /// img2
        /// </summary>
        [Display(Name = "img2")]
        [MaxLength(500)]
        public string? img2 { get; set; } = string.Empty;

        /// <summary>
        /// img3
        /// </summary>
        [Display(Name = "img3")]
        [MaxLength(500)]
        public string? img3 { get; set; } = string.Empty;


    }
}
