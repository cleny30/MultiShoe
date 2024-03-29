using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Entities
{
    [Table("Category")]
    public class Category
    {
        /// <summary>
        /// CateId
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "CateId")]
        [Key]
        [Required]
        public int CateId { get; set; }

        /// <summary>
        /// CateName
        /// </summary>
        [Display(Name = "CateName")]
        [MaxLength(50)]
        [Required]
        public string CateName { get; set; } = string.Empty;

        /// <summary>
        /// KeyWord
        /// </summary>
        [Display(Name = "KeyWord")]
        [MaxLength(10)]
        [Required]
        public string KeyWord { get; set; } = string.Empty;

        /// <summary>
        /// BrandLogo
        /// </summary>
        [Display(Name = "IsAvailable")]
        [Required]
        public bool IsAvailable { get; set; } = true;
    }
}
