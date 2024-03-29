using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RKShoesAPI.Models.Entities
{
    [Table("Brand")]
    public class Brand
    {
        /// <summary>
        /// BrandId
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "BrandId")]
        [Key]
        [Required]
        public int BrandId { get; set; }

        /// <summary>
        /// BrandName
        /// </summary>
        [Display(Name = "BrandName")]
        [MaxLength(50)]
        [Required]
        public string BrandName { get; set; } = string.Empty;

        /// <summary>
        /// BrandLogo
        /// </summary>
        [Display(Name = "BrandLogo")]
        [MaxLength(500)]
        [Required]
        public string BrandLogo { get; set; } = string.Empty;

        /// <summary>
        /// BrandLogo
        /// </summary>
        [Display(Name = "IsAvailable")]
        [Required]
        public bool IsAvailable { get; set; } = true;

    }
}
