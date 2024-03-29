using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.Cart
{
    public class CartModel
    {
        [Key]
        [Required]
        public int CartId { get; set; }
        /// <summary>
        /// UserName
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// ProId
        /// </summary>
        [MaxLength(10)]
        [Required]
        public string ProId { get; set; } = string.Empty;

        /// <summary>
        /// ProName
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string ProName { get; set; } = string.Empty;

        /// <summary>
        /// ProImg
        /// </summary>
        [MaxLength(50)]
        [Required]
        public string ProImg { get; set; } = string.Empty;

        /// <summary>
        /// Quantity
        /// </summary>
        [Required]
        public int Quantity { get; set; }

        /// <summary>
        /// QuantityInStock
        /// </summary>
        [Required]
        public int QuantityInStock { get; set; }

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
