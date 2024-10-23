using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Entities
{
    [Table("OrderDetail")]
    public class OrderDetail
    {
        /// <summary>
        /// Id
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Name = "Id")]
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// OrderId
        /// </summary>
        [Display(Name = "OrderId")]
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
        [Display(Name = "UserName")]
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

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
