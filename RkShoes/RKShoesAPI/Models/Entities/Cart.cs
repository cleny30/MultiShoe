using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RKShoesAPI.Models.Entities
{
    [Table("Cart")]
    public class Cart
    {
        /// <summary>
        /// CartId
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Name = "CartId")]
        [Key]
        [Required]
        public int CartId { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [Display(Name = "UserName")]
        [MaxLength(50)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// ProId
        /// </summary>
        [Display(Name = "ProId")]
        [MaxLength(10)]
        [Required]
        public string ProId { get; set; } = string.Empty;

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
        /// Size
        /// </summary>
        [Display(Name = "Size")]
        [Required]
        public int Size { get; set; }
    }
}
