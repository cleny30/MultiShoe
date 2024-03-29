using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RKShoesAPI.Models.Entities
{
    [Table("Order")]
    public class Order
    {
        /// <summary>
        /// OrderId
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "OrderId")]
        [MaxLength(10)]
        [Key]
        [Required]
        public string OrderId { get; set; } = string.Empty;

        /// <summary>
        /// ManagerId
        /// </summary>
        [Display(Name = "ManagerId")]
        [Required]
        public int ManagerId { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [Display(Name = "UserName")]
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// TotalPrice
        /// </summary>
        [Display(Name = "TotalPrice")]
        [Required]
        public double TotalPrice { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        [Display(Name = "StartDate")]
        [Required]
        public DateTime StartDate { get; set; } = DateTime.Now;

        /// <summary>
        /// EndDate
        /// </summary>
        [Display(Name = "EndDate")]
        public DateTime? EndDate { get; set; }

        /// <summary>
        /// OrderDescription
        /// </summary>
        [Display(Name = "OrderDes")]
        [MaxLength(500)]
        public string? OrderDes { get; set; } = string.Empty;

        /// <summary>
        /// Status
        /// </summary>
        [Display(Name = "Status")]
        [Required]
        public int Status { get; set; } = 0;

        /// <summary>
        /// Address
        /// </summary>
        [Display(Name = "Address")]
        [MaxLength(500)]
        [Required]
        public string Address { get; set; } = string.Empty;


        /// <summary>
        /// PhoneNumber
        /// </summary>
        [Display(Name = "PhoneNumber")]
        [MaxLength(11)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// FullName
        /// </summary>
        [Display(Name = "FullName")]
        [MaxLength(500)]
        [Required]
        public string FullName { get; set; } = string.Empty;
    }
}
