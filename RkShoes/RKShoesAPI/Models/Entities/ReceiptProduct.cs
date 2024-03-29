using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Entities
{
    [Table("ReceiptProduct")]
    public class ReceiptProduct
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
        /// RecieptId
        /// </summary>
        [Display(Name = "RecieptId")]
        [Required]
        public int RecieptId { get; set; }

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
    }
}
