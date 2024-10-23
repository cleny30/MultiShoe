using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Category
{

    public class CategoryModel
    {
        /// <summary>
        /// CateId
        /// </summary>
        [Required]
        public int CateId { get; set; }

        /// <summary>
        /// CateName
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string CateName { get; set; } = string.Empty;

        /// <summary>
        /// KeyWord
        /// </summary>
        [MaxLength(10)]
        [Required]
        public string KeyWord { get; set; } = string.Empty;

        /// <summary>
        /// IsAvailable
        /// </summary>
        [Required]
        public bool IsAvailable { get; set; } = true;

        /// <summary>
        /// AmountProduct
        /// </summary>
        [Required]
        public int AmountProduct { get; set; }
    }
}
