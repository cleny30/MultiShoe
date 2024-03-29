using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Order
{
    public class OrderDetailModel
    {
        /// <summary>
        /// Id
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// OrderId
        /// </summary>
        [MaxLength(10)]
        [Required]
        public string OrderId { get; set; } = string.Empty;

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
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// ProName
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string ProName { get; set; } = string.Empty;

        /// <summary>
        /// Quantity
        /// </summary>
        [Required]
        public int Quantity { get; set; }

        /// <summary>
        /// Price
        /// </summary>
        [Required]
        public double Price { get; set; }

        /// <summary>
        /// Size
        /// </summary>
        [Required]
        public int Size { get; set; }
    }
}
