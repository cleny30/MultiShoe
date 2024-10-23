using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RKShoesAPI.Models.Entities
{
    [Table("Product")]
    public class Product
    {
        /// <summary>
        /// ProId
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "ProId")]
        [MaxLength(10)]
        [Key]
        [Required]
        public string ProId { get; set; } = string.Empty;

        /// <summary>
        /// BrandId
        /// </summary>
        [Display(Name = "BrandId")]
        [Required]
        public int BrandId { get; set; }

        /// <summary>
        /// CateId
        /// </summary>
        [Display(Name = "CateId")]
        [Required]
        public int CateId { get; set; }

        /// <summary>
        /// Origin
        /// </summary>
        [Display(Name = "Origin")]
        [MaxLength(50)]
        [Required]
        public string Origin { get; set; } = string.Empty;

        /// <summary>
        /// ProName
        /// </summary>
        [Display(Name = "ProName")]
        [MaxLength(50)]
        [Required]
        public string ProName { get; set; } = string.Empty;

        /// <summary>
        /// Quantity
        /// </summary>
        [Display(Name = "Quantity")]
        [Required]
        public int Quantity { get; set; }

        /// <summary>
        /// Price
        /// </summary>
        [Display(Name = "Price")]
        [Required]
        public double Price { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        [Display(Name = "Description")]
        [MaxLength(500)]
        [Required]
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Discount
        /// </summary>
        [Display(Name = "Discount")]
        [Required]
        public double Discount { get; set; }

        /// <summary>
        /// RatingAverage
        /// </summary>
        [Display(Name = "RatingAverage")]
        [Required]
        public float RatingAverage { get; set; }

        /// <summary>
        /// BrandLogo
        /// </summary>
        [Display(Name = "IsAvailable")]
        [Required]
        public bool IsAvailable { get; set; } = true;
    }
}
