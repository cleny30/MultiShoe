using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Brand
{
    public class BrandModel
    {
        /// <summary>
        /// BrandId
        /// </summary>
        [Required]
        public int BrandId { get; set; }

        /// <summary>
        /// BrandName
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string BrandName { get; set; } = string.Empty;

        /// <summary>
        /// BrandLogo
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string BrandLogo { get; set; } = string.Empty;

        /// <summary>
        /// AmountProduct
        /// </summary>
        [Required]
        public int AmountProduct { get; set; }

        /// <summary>
        /// BrandLogo
        /// </summary>
        [Required]
        public bool IsAvailable { get; set; } = true;
    }
}
