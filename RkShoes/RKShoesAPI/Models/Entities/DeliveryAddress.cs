using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Entities
{
    [Table("DeliveryAddress")]
    public class DeliveryAddress
    {

        /// <summary>
        /// Id
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Display(Name = "Id")]
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [Display(Name = "UserName")]
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// Fullname
        /// </summary>
        [Display(Name = "Fullname")]
        [MaxLength(500)]
        [Required]
        public string Fullname { get; set; } = string.Empty;

        /// <summary>
        /// PhoneNumber
        /// </summary>
        [Display(Name = "PhoneNumber")]
        [MaxLength(11)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Address
        /// </summary>
        [Display(Name = "Address")]
        [MaxLength(500)]
        [Required]
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// SpecificAddress
        /// </summary>
        [Display(Name = "SpecificAddress")]
        [MaxLength(500)]
        [Required]
        public string SpecificAddress { get; set; } = string.Empty;

        /// <summary>
        /// Address
        /// </summary>
        [Display(Name = "isDefault")]
        [Required]
        public bool isDefault { get; set; }
    }
}
