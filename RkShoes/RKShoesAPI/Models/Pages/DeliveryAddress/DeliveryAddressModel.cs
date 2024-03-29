using System.ComponentModel.DataAnnotations;

namespace RKShoesAPI.Models.Pages.DeliveryAddress
{
    public class DeliveryAddressModel
    {  
        /// <summary>
        /// Id
        /// </summary>
        
        public int Id { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [MaxLength(250)]
        [Required]
        public string UserName { get; set; } = string.Empty;

        /// <summary>
        /// Fullname
        /// </summary>
        [MaxLength(500)]
        [Required]
        public string Fullname { get; set; } = string.Empty;

        /// <summary>
        /// PhoneNumber
        /// </summary>
        [MaxLength(11)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Address
        /// </summary>
        [MaxLength(500)]
        [Required]
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// SpecificAddress
        /// </summary>
        [MaxLength(500)]
        [Required]
        public string SpecificAddress { get; set; } = string.Empty;

        /// <summary>
        /// Address
        /// </summary>
        [Required]
        public bool isDefault { get; set; }
    }
}
