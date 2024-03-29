using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Entities
{
    [Table("ImportProduct")]
    public class ImportProduct
    {
        /// <summary>
        /// RecieptId
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "RecieptId")]
        [Key]
        [Required]
        public int RecieptId { get; set; }

        /// <summary>
        /// DateImport
        /// </summary>
        [Display(Name = "DateImport")]
        [Required]
        public DateTime DateImport { get; set; } = DateTime.Now;

        /// <summary>
        /// PersonChange
        /// </summary>
        [Display(Name = "PersonChange")]
        [MaxLength(50)]
        [Required]
        public string PersonChange { get; set; } = string.Empty;

        /// <summary>
        /// Payment
        /// </summary>
        [Display(Name = "Payment")]
        [Required]
        public double Payment { get; set; }
    }
}
